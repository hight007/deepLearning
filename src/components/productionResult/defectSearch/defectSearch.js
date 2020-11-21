import React, { Component, useState } from "react";
import Swal from "sweetalert2";
import { httpClient } from "../../../utils/HttpClient";
import { apiUrl, server } from "../../../constants";
import * as moment from "moment";
import join from "url-join";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { Scrollbars } from "react-custom-scrollbars";

class DefectSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      // myValue: [new Date(), new Date()],
      startDate: this.setDate(this.addDay(new Date(), -1)),
      toDate: this.setDate(new Date()),
      startTime: "00:00",
      toTime: this.setTime(new Date()),
      machine_number: "All",
      defect: "All",
    };
  }

  componentDidMount() {
    this.searchData();
  }

  onChanges = (value) => {
    console.log(value);
    this.setState({ myValue: value });
  };

  searchData = async () => {
    if (this.state.machine_number === "") {
      await this.setState({ machine_number: "All" });
    }
    if (this.state.defect === "") {
      await this.setState({ defect: "All" });
    }
    let result = await httpClient.get(
      `${server.DEFECTS_SEARCH_URL}/StartDateTime=${this.state.startDate} ${this.state.startTime}:00&toDateTime=${this.state.toDate} ${this.state.toTime}:00&machine_number=${this.state.machine_number}&defects=${this.state.defect}`
    );
    this.setState({ data: result.data });
  };

  setDate = (myDate) => {
    var date = new Date(myDate);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;
  };

  setTime = (myTime) => {
    var date = new Date(myTime);

    var hours = date.getHours();
    var min = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (min < 10) min = "0" + min;

    return hours + ":" + min;
  };

  addDay = (myDate, days) => {
    myDate.setDate(myDate.getDate() + days);
    return myDate;
  };

  renderTableRow = () => {
    function showDefect(listDefect) {
      return listDefect.defect.map((defectItem) => <div>{defectItem}</div>);
    }

    function showConfidential(listDefect) {
      return listDefect.confidential.map((confidentialItem) => (
        <div>{confidentialItem.toFixed(2)} %</div>
      ));
    }

    try {
      if (this.state.data != null) {
        return this.state.data.result.map((item) => (
          <tr key={item.id} role="row" className="odd">
            <td>{item.id}</td>
            <td>{item.machine_number}</td>
            <td>{showDefect(JSON.parse(item.defect))}</td>
            <td>{showConfidential(JSON.parse(item.defect))}</td>
            <td>
              {moment(item.createdAt).format("ddd DD-MMM-yyyy") +
                moment(item.createdAt).format(" hh:mm:ss")}
            </td>
            <td>
              <div>
                <Zoom>
                  <img
                    style={{ maxHeight: 100, marginLeft: 5 }}
                    src={join(apiUrl, `deepLearning/defect/${item.id}`)}
                  />
                </Zoom>
                <br></br>
                <a
                  href={join(apiUrl, `deepLearning/defect/${item.id}`)}
                  target="_blank"
                  className="btn btn-block btn-primary btn-xs"
                  style={{ maxWidth: 155 }}
                >
                  Open new tab
                </a>
              </div>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">
                  Production result defect search
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Search defect</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label style={{ marginRight: 5 }}>Start date : </label>
                    {/* <DateTimeRangePicker
                    onChange={this.onChanges}
                    value={this.state.myValue}
                    className={["form-control", "form-control"]}
                    format="dd-MMM-y HH:mm:ss a"
                  /> */}
                    <input
                      type="date"
                      class="form-control"
                      value={this.state.startDate}
                      onChange={(e) => {
                        this.setState({ startDate: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label style={{ marginRight: 5 }}>To date : </label>
                    <input
                      type="date"
                      class="form-control"
                      value={this.state.toDate}
                      onChange={(e) => {
                        this.setState({ toDate: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label style={{ marginRight: 5 }}>Start time : </label>
                    <input
                      type="time"
                      class="form-control"
                      value={this.state.startTime}
                      onChange={(e) => {
                        this.setState({ startTime: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label style={{ marginRight: 5 }}>To time : </label>
                    <input
                      type="time"
                      class="form-control"
                      value={this.state.toTime}
                      onChange={(e) => {
                        this.setState({ toTime: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label style={{ marginRight: 5 }}>Machine number : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Machine number"
                      value={this.state.machine_number}
                      onChange={(e) => {
                        this.setState({ machine_number: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div className="col-sm-6">
                    <label style={{ marginRight: 5 }}>Defect : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Defect"
                      value={this.state.defect}
                      onChange={(e) => {
                        this.setState({ defect: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div className="col-sm-12" style={{ marginTop: 10 }}>
                    <button
                      type="submit"
                      className="btn btn-block btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.searchData();
                      }}
                    >
                      <img
                        style={{ width: 15, marginRight: 5 }}
                        src="/images/Search.gif"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-body">
              <div>
                <div
                  className="card-body table-responsive p-0"
                  style={{ maxHeight: 400 }}
                >
                  <Scrollbars
                    onScroll={this.handleScroll}
                    onScrollFrame={this.handleScrollFrame}
                    onScrollStart={this.handleScrollStart}
                    onScrollStop={this.handleScrollStop}
                    onUpdate={this.handleUpdate}
                    renderView={this.renderView}
                    renderTrackHorizontal={this.renderTrackHorizontal}
                    renderTrackVertical={this.renderTrackVertical}
                    renderThumbHorizontal={this.renderThumbHorizontal}
                    renderThumbVertical={this.renderThumbVertical}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={400}
                    thumbMinSize={50}
                    universal={true}
                  >
                    <table
                      id="DivTable"
                      className="table table-head-fixed table-hover text-nowrap"
                      role="grid"
                      style={{ zIndex: 0 }}
                    >
                      <thead style={{ zIndex: 0 }}>
                        <tr role="row" style={{ zIndex: 0 }}>
                          <th style={{ zIndex: 0 }}>id</th>
                          <th style={{ zIndex: 0 }}>Machine number</th>
                          <th style={{ zIndex: 0 }}>Defect</th>
                          <th style={{ zIndex: 0 }}>Confidential</th>
                          <th style={{ zIndex: 0 }}>Created At</th>
                          <th style={{ zIndex: 1 }}>Image</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTableRow()}</tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DefectSearch;
