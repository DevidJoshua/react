import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { FormattedMessage as T } from 'react-intl'
import FilteringTableCon from "../containers/FilterTableCon";
import { CardWrapperCon } from "../containers";
import DatePicker from "react-datepicker";

const Table = (props) => {
  var history = useHistory();
  const {
    columns,
    whereCondition,
    withoutWrapper,
    distinct,
    listallServiceName,
    fields,
    children,
    widthSearchField,
    withSearchField,
    apiVersion,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <div className="d-flex justify-content-between">
        <div class="mb-3">
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Bank</option>
            <option value="1">CIMB Niaga</option>
            <option value="2">Mandiri</option>
            <option value="3">OCBC NISP</option>
          </select>
        </div>

        <div class=" mb-3">
          <select class="custom-select" id="inputGroupSelect02">
            <option selected>Status</option>
            <option value="1">Settled</option>
            <option value="2">Pending</option>
            <option value="3">Reject</option>
          </select>
        </div>

        <DatePicker
          style={{ width: "100%" }}
          className="form-control"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />

        <div>-</div>

        <DatePicker
          style={{ width: "100%" }}
          className="form-control"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />

        <div class="input-group mb-3" style={{ width: "40%" }}>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
      <CardWrapperCon
        withoutWrapper={withoutWrapper}
        serviceName={listallServiceName}
        widthSearchField={widthSearchField}
        withSearchField={withSearchField}
      >
        <FilteringTableCon
          columns={columns}
          listallServiceName={listallServiceName}
          fields={fields}
          history={history}
          whereCondition={whereCondition}
          distinct={distinct}
          apiVersion={apiVersion}
        >
          {children && children}
        </FilteringTableCon>
      </CardWrapperCon>
    </>
  );
};
export default Table;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(injectIntl(TableComp))
