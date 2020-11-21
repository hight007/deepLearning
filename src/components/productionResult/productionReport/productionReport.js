import React, { Component } from "react";
// import Table from "./../../../utils/dynamicTable";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constants";
import * as moment from "moment";
import Zoom from "react-medium-image-zoom";

class ProductionReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      subLabelNames: [],
    };
  }

  async componentDidMount() {
    let resultBackend = await httpClient.get(server.PRODUCTION_RESULT_URL);
    let subLabelNames = Object.getOwnPropertyNames(
      resultBackend.data.result[0]
    );
    this.setState({
      subLabelNames: subLabelNames,
      data: resultBackend.data,
    });
  }

  renderTableRow = () => {
    function judgeBarColor(progressive) {
      if (progressive < 70) {
        return "red";
      } else if (progressive < 80) {
        return "warning";
      } else {
        return "green";
      }
    }
    try {
      if (this.state.data != null) {
        return this.state.data.result.map((item) => (
          <tr key={item.id} role="row" className="odd">
            <td>{moment(item.ProductionDate).format("ddd DD-MMM-yyyy")}</td>
            <td>{item.machine_number}</td>
            <td>{item.input}</td>
            <td>{item.NG}</td>
            <td>{item.output}</td>
            <td class="project_progress">
              <div class="progress progress-sm">
                <div
                  className={"progress-bar bg-" + judgeBarColor(item.yield)}
                  role="progressbar"
                  aria-volumenow={item.yield}
                  aria-volumemin={0}
                  aria-volumemax={100}
                  style={{ width: item.yield + "%" }}
                />
              </div>
              <small>Yield : {item.yield}%</small>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  renderTable = () => {
    if (this.state.data != null) {
      return (
        <div
          className="card-body table-responsive p-0"
          style={{ maxHeight: 400 }}
        >
          <table
            id="DivTable"
            className="table table-head-fixed table-hover text-nowrap"
            role="grid"
            aria-describedby="example2_info"
          >
            <thead>
              <tr role="row">
                <th>ProductionDate</th>
                <th>Machine number</th>
                <th>Input(pcs)</th>
                <th>Defect(pcs)</th>
                <th>Output(pcs)</th>
                <th>Yield(%)</th>
              </tr>
            </thead>
            <tbody>{this.renderTableRow()}</tbody>
          </table>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Production report</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12">
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1"></div>
            <div className="card-body">{this.renderTable()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductionReport;
