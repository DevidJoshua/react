import React from 'react'
import { useHistory } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { injectIntl } from 'react-intl'
// import Immutable from 'seamless-immutable'
import Select, { components } from 'react-select'
import TableCon from '../containers/TableCon'
import PaginationNav from './PaginationNav'

const menuHeaderStyle = {
  padding: '8px 12px',
  background: '#0052CC',
  color: 'white'
}

const MenuList = ({ navigation, selectProps }) => {
  return (
    <components.MenuList {...selectProps}>
      <div style={menuHeaderStyle}>
        <PaginationNav {...navigation} />
      </div>
      {selectProps.children}
    </components.MenuList>
  )
}

function TableViewMultiselect (props) {
  console.log("propssss slct>>>>>>",props.stl)
  const {
    // loading,
    // errors,
    // data,
    // headerGroups,
    // getTableProps,
    // getTableBodyProps,
    stl,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageOptions,
    gotoPage,
    pageCount,
    previousPage,
    nextPage,
    pageSize,
    setPageSize,
    optionColumnValue,
    optionColumnLabel,
    payloadValue,
    defaultValueOriginal,
    payloadValueOriginal,
    inputValue,
    placeholder,
    onChange,
    isCreatableSelect,
    isMulti
  } = props
  const optionsOriginal = page.map((row, i) => {
    prepareRow(row)
    const v = row.original
    return v
    // return { value: '' + v[optionColumnValue], label: v[optionColumnLabel] }
  })
  let options = optionsOriginal.map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] }))
  console.log('optionsoptions=>', options)
  let defVal = ''
  if (isMulti) {
    defVal = (defaultValueOriginal || []).map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] }))
    console.log('optionsoptionsoptions1=>', options)
    if (typeof payloadValue !== 'undefined') {
      options = options.concat(payloadValueOriginal.map(v => ({ value: '' + v[optionColumnValue], label: v[optionColumnLabel] })))
      options = options.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.value === thing.value
        ))
      )
      defVal = options.filter(v => payloadValue.includes(v.value))
      console.log('defVal=>', defVal)
    }
  } else {
    console.log('payloadValueOriginalpayloadValueOriginalpayloadValueOriginalpayloadValueOriginal===>', payloadValueOriginal)
    if (typeof payloadValue === 'undefined') {
      defVal = ((options.filter(v => '' + v.value === '' + (defaultValueOriginal || {})[optionColumnValue]))[0] || '')
    } else defVal = payloadValueOriginal || ((options.filter(v => '' + v.value === '' + (defaultValueOriginal || {})[optionColumnValue]))[0] || {})
    console.log('defaultValueOriginal===>', defaultValueOriginal)
    console.log('defValdefValdefValdefVal===>', defVal)
    console.log('payloadValueOriginal===>', payloadValueOriginal)
    console.log('payloadValue===>', payloadValue)
    // defVal = options.filter(v => '' + v.value === '' + defaultValueOriginal[optionColumnValue])
  }

  if (isCreatableSelect) {
    return (
      <CreatableSelect
        value={defVal}
        defaultInputValue={inputValue}
        isMulti
        name='colors'
        placeholder={placeholder}
        options={options}
        className='basic-multi-select'
        classNamePrefix='selectss'
        onChange={(selectedOption) => {
          console.log('handleOnChangeeeeee', selectedOption)
          // var options = e.target.options
          // var value = []
          // for (var i = 0, l = options.length; i < l; i++) {
          //   if (options[i].selected) {
          //     value.push(options[i].value)
          //   }
          // }
          // // this.props.someCallback(value)
          // const value = selectedOption.map(v => v.value)
          // console.log('valueeee=====xxxx==>', value)
          // onChange(value)
          let val = []
          let valueOriginal = []
          if (selectedOption) {
            val = selectedOption.map(v => v.value)
            valueOriginal = selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label }))
          }
          onChange({ val: val, valueOriginal: valueOriginal })
        }}
        onInputChange={(inputValue, actionMeta) => {
          // console.log('inputValue', inputValue)
          // console.log('actionMeta', actionMeta)
          // set filter string_to_search = inputValue
          // setInputValue(inputValue)
          // tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: inputValue })
        }}
        isSearchable
      />)
  }
  if (!isMulti) {
    return (
      <>
        <Select
          value={defVal}
          // defaultInputValue={inputValue}
          isMulti={isMulti}
          isClearable
          name='colors'
          placeholder={placeholder}
          options={options}
          components={{
            MenuList: (pr) => MenuList({
              navigation: {
                canPreviousPage,
                gotoPage,
                canNextPage,
                previousPage,
                nextPage,
                pageCount,
                pageIndex,
                pageOptions,
                pageSize,
                setPageSize,
                withPageSize: false
              },
              selectProps: pr
            })
          }}
          className={ props.classNm || 'basic-single'}
          classNamePrefix='select'
          onChange={(selectedOption) => {
            console.log('handleOnChange', selectedOption)
            // var options = e.target.options
            // var value = []
            // for (var i = 0, l = options.length; i < l; i++) {
            //   if (options[i].selected) {
            //     value.push(options[i].value)
            //   }
            // }
            // // this.props.someCallback(value)
            // console.log('valueeee=======>', value)
            if (selectedOption) onChange({ optionsOriginal, val: selectedOption.value, valueOriginal: selectedOption })
            else onChange({ optionsOriginal, val: null, valueOriginal: {} })
          }}
          onInputChange={(iv, actionMeta) => {
            console.log('inputValue', iv)
          // console.log('actionMeta', actionMeta)
          // set filter string_to_search = inputValue
          // setInputValue(iv)
          // tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: iv })
          }}
          isSearchable
        />
      </>
    )
  }

  console.log('defValdefValdefValdefVal=>', defVal)
  console.log('defaultValueOriginal=>', defaultValueOriginal)
  return (
    <>
      <Select
        value={defVal}
        defaultInputValue={inputValue}
        isMulti={isMulti}
        name='colors'
        placeholder={placeholder}
        options={options}
        components={{
          MenuList: (pr) => MenuList({
            navigation: {
              canPreviousPage,
              gotoPage,
              canNextPage,
              previousPage,
              nextPage,
              pageCount,
              pageIndex,
              pageOptions,
              pageSize,
              setPageSize,
              withPageSize: false
            },
            selectProps: pr
          })
        }}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={(selectedOption) => {
          console.log('handleOnChange', selectedOption)
          // var options = e.target.options
          // var value = []
          // for (var i = 0, l = options.length; i < l; i++) {
          //   if (options[i].selected) {
          //     value.push(options[i].value)
          //   }
          // }
          // // this.props.someCallback(value)
          // console.log('valueeee=======>', value)
          if (selectedOption) onChange({ val: selectedOption.map(v => v.value), valueOriginal: selectedOption.map(v => ({ [optionColumnValue]: v.value, [optionColumnLabel]: v.label })) })
          else {
            onChange({ val: [], valueOriginal: [] })
          }
        }}
        onInputChange={(iv, actionMeta) => {
          console.log('inputValue', iv)
          // console.log('actionMeta', actionMeta)
          // set filter string_to_search = inputValue
          // setInputValue(iv)
          // tablepaginationOnChangeFilter({ serviceName: serviceName, fieldName: 'string_to_search', fieldValue: iv })
        }}
        isSearchable
      />
    </>
  )
}

function Multiselect (props) {
  const {
    className,
    getColumns,
    whereCondition,
    distinct,
    history,
    listallServiceName,
    fields,
    onChange,
    payloadValue,
    defaultValueOriginal,
    payloadValueOriginal,
    // label,
    labelButton,
    labelColumn,
    optionColumnLabel,
    optionColumnValue,
    inputValue,
    placeholder,
    isCreatableSelect,
    isMulti,
    apiVersion,
    style
  } = props
  console.log('defaultValuedefaultValuedefaultValuedefaultValue=>', payloadValue)
  return (
    <>
      <TableCon
        columns={[
          { Header: labelColumn, accessor: p => <button type='button' class='btn btn-default' data-dismiss='modal' onClick={() => { onChange({ val: p[optionColumnValue] }) }}>{labelButton}</button> },
          ...getColumns({ onChange })
        ]}
        listallServiceName={listallServiceName}
        fields={fields}
        history={history}
        whereCondition={whereCondition}
        distinct={distinct}
        apiVersion={apiVersion}
      >
        <TableViewMultiselect
          isMulti={isMulti}
          payloadValue={payloadValue}
          defaultValueOriginal={defaultValueOriginal}
          payloadValueOriginal={payloadValueOriginal}
          inputValue={inputValue}
          placeholder={placeholder}
          onChange={onChange}
          classNm={className}
          stl={style}
          optionColumnValue={optionColumnValue}
          optionColumnLabel={optionColumnLabel}
          isCreatableSelect={isCreatableSelect}
        />
      </TableCon>
    </>
  )
}
// export default Multiselect
export default injectIntl((props) => {
  var history = useHistory()
  const [payloadValueOriginal, setPayloadValueOriginal] = React.useState(props.isMulti ? [] : null)
  const onChange = (v) => {
    setPayloadValueOriginal(v.valueOriginal)
    props.onChange(v)
  }

  return <Multiselect history={history} {...props} onChange={onChange} payloadValueOriginal={payloadValueOriginal} />
})
