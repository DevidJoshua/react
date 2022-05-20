import React from 'react'
import { useHistory } from 'react-router-dom'
// import CreatableSelect from 'react-select/creatable'
import CanvasJSReact from '../../../assets/canvasjs.react'
// import CanvasJSReact from '../../assets/canvasjs.react'
import { injectIntl } from 'react-intl'
// import Immutable from 'seamless-immutable'
// import Select, { components } from 'react-select'
import TableCon from '../containers/TableCon'
import { setupCanvasJsChartData } from '../../../Utils/Utils'
// import PaginationNav from './PaginationNav'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

function Chart (props) {
  const {
    // loading,
    // errors,
    // data,
    // headerGroups,
    // getTableProps,
    // getTableBodyProps,
    page,
    prepareRow,
    cartTitle,
    labelMap,
    xValueTransform
    // canPreviousPage,
    // canNextPage,
    // pageIndex,
    // pageOptions,
    // gotoPage,
    // pageCount,
    // previousPage,
    // nextPage,
    // pageSize,
    // setPageSize,
    // optionColumnValue,
    // optionColumnLabel,
    // payloadValue,
    // defaultValueOriginal,
    // payloadValueOriginal,
    // inputValue,
    // placeholder,
    // onChange,
    // isCreatableSelect,
    // isMulti
  } = props
  const optionsOriginal = page.map((row, i) => {
    prepareRow(row)
    const v = row.original
    return {
      count: v.count,
      xvalue: xValueTransform(v.xvalue),
      yvalue: labelMap[v.yvalue] || v.yvalue,
      _id: v._id
    }
    // return { value: '' + v[optionColumnValue], label: v[optionColumnLabel] }
  })
  console.log('optionsOriginaloptionsOriginaloptionsOriginal=>', optionsOriginal)

  // const [datasource, setDatasource] = useState()

  // useEffect(() => {
  const options = {
    theme: 'light2',
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: cartTitle
    },
    axisY: {
      lineThickness: 1,
      suffix: '',
      title: 'volume transaksi'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e) {
        if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
          e.dataSeries.visible = false
        } else {
          e.dataSeries.visible = true
        }
        e.chart.render()
      }
    }
  }
  if (optionsOriginal) {
    const colors = {
      '/initialization': '#64b5f6',
      ddrequest: '#1976d2',
      PENDING: '#0000FF',
      VA: 'red',
      DD: 'green',
      CC: 'pink'
    }

    // let dataPoints = []
    const dataList = []
    let dataSeries = {}
    // const listOfProcess = []

    // const groupByProcessName = optionsOriginal.reduce((rv, row) => {
    //   rv[row.process_name] = (rv[row.process_name] || []).push({ label: row.transaction_id, y: row.elipse_time })
    //   return rv
    // }, {})
    // const groupByTransactionId = optionsOriginal.reduce((rv, row) => {
    //   const r = {}
    //   rv[row.transaction_id][groupByProcessName[k].process_name] = rv[row.transaction_id][groupByProcessName[k].process_name] || { label: row.transaction_id, y: row.elipse_time }

    //   rv[row.transaction_id] = rv[row.transaction_id] || (rv[row.transaction_id] || []).push({ process_name: row.process_name, elipse_time: row.elipse_time })
    //   return rv
    // }, {})

    const setupCanvasJsChartDataResp = setupCanvasJsChartData({ dataset: optionsOriginal })
    const newColl = setupCanvasJsChartDataResp.newdataset
    console.log('newColl====>', newColl)

    for (var yvalue in newColl) {
      const dataPoints = []
      dataSeries = {
        // color: colors[yvalue] || '#1976d2',
        type: 'line', // line splineArea
        showInLegend: 'true',
        name: yvalue,
        xValueType: 'number',
        // xValueType: 'dateTime',
        // xValueFormatString: 'DDMMYYHHmm',
        xValueFormatString: '#.##',
        // yValueFormatString: '#.## ms',
        legendMarkerType: 'square'
      }
      const item = newColl[yvalue]
      // console.log('item=====>', item)
      // mandatori harus di sort. pake reverse biar descending
      // const ordered = Object.keys(item).sort().reverse().reduce(
      // const ordered = Object.keys(item).sort().reduce(
      //   (obj, key) => {
      //     obj[key] = item[key]
      //     return obj
      //   },
      //   {}
      // )
      const ordered = item
      for (var j in ordered) {
        dataPoints.push({
          label: j,
          y: parseInt(ordered[j])
        })
      }

      dataSeries.dataPoints = dataPoints
      dataList.push(dataSeries)
    }
    options.data = dataList
  }
  // }, [optionsOriginal])

  // console.log('datasourcedatasourcedatasource=>payment', options)
  return (
    <CanvasJSChart options={options} />
  )
}

function ChartComp (props) {
  const {
    columns,
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
    // labelButton,
    // labelColumn,
    optionColumnLabel,
    optionColumnValue,
    inputValue,
    placeholder,
    isCreatableSelect,
    listName,
    cartTitle,
    pageSize,
    apiVersion,
    labelMap,
    xValueTransform
  } = props
  console.log('pageSizepageSizepageSizepageSize=>', pageSize)
  return (
    <>
      <TableCon
        listName={listName}
        columns={columns}
        listallServiceName={listallServiceName}
        fields={fields}
        history={history}
        whereCondition={whereCondition}
        distinct={distinct}
        pageSize={pageSize}
        apiVersion={apiVersion}
      >
        <Chart
          cartTitle={cartTitle}
          payloadValue={payloadValue}
          defaultValueOriginal={defaultValueOriginal}
          payloadValueOriginal={payloadValueOriginal}
          inputValue={inputValue}
          placeholder={placeholder}
          onChange={onChange}
          optionColumnValue={optionColumnValue}
          optionColumnLabel={optionColumnLabel}
          isCreatableSelect={isCreatableSelect}
          labelMap={labelMap}
          xValueTransform={xValueTransform}
        />
      </TableCon>
    </>
  )
}
// export default Multiselect
export default injectIntl((props) => {
  var history = useHistory()
  return <ChartComp history={history} {...props} />
})
