import React, { Component } from 'react';
import { Annotator } from 'image-labeler-react';
import * as moment from "moment";
import Zoom from "react-medium-image-zoom";
import { httpClient } from "../../../utils/HttpClient";
import { apiUrl, OK, server } from '../../../constants';
import Swal from 'sweetalert2';
import join from "url-join";
import { Link } from 'react-router-dom';

class ModelTraining extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      subLabelNames: [],
      startDate: this.setDate(this.addDay(new Date(), 0)),
      toDate: this.setDate(this.addDay(new Date(), 1)),
    }
  }

  async componentDidMount() {

  }

  trainingDataSearch = async () => {
    try {
      let resultBackend = await httpClient.get(`${server.MODELS_TRAINING_SEARCH_URL}/startDate=${this.state.startDate}&toDate=${this.state.toDate}`);
      console.log(resultBackend.data);
      if (resultBackend.data.api_result === OK) {
        let subLabelNames = Object.getOwnPropertyNames(
          resultBackend.data.result[0]
        );
        subLabelNames.push('images')
        subLabelNames.push('actions')
        this.setState({
          subLabelNames: subLabelNames,
          data: resultBackend.data,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Can not find training images',
      })
    }


  }

  renderTableRow = () => {
    try {
      if (this.state.data != null) {
        return this.state.data.result.map((item) => (
          <tr key={item.id} role="row" className="odd">
            <td>{item.id}</td>
            <td>{item.status}</td>
            <td>{moment(item.createdAt).utc().format("ddd DD-MMM-Y") + ' ' + moment(item.createdAt).utc().format("HH:mm:ss")}</td>
            <td>{moment(item.updatedAt).utc().format("ddd DD-MMM-Y") + ' ' + moment(item.updatedAt).utc().format("HH:mm:ss")}</td>
            <td>
              <Zoom>
                <img
                  style={{ maxHeight: 100, marginLeft: 5 }}
                  src={join(apiUrl, `${server.MODELS_TRAINING_URL}/${item.id}`)}
                />
              </Zoom>
            </td>
            <td>
              <Link to={`/deeplearning/imagesLabels/${item.id}`}>
                <button className="btn btn-block btn-primary">Label image</button>
              </Link>
            </td>
          </tr>
        ));
      }
    } catch (error) { }
  };


  renderTable = () => {
    if (this.state.data != null) {
      const renderTabelHeader = () => {
        if (this.state.subLabelNames != null) {
          return this.state.subLabelNames.map((item) => (
            <th>{item}</th>
          ))
        }
      }
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
                {renderTabelHeader()}
              </tr>
            </thead>
            <tbody>{this.renderTableRow()}</tbody>
          </table>
        </div>
      );
    }
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

  addDay = (myDate, days) => {
    myDate.setDate(myDate.getDate() + days);
    return myDate;
  };

  render() {
    return (
      <div className="content-wrapper " id="wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">
                  Training models
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12">
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1"></div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label>Start date : </label>
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
                    <label>To date : </label>
                    <input
                      type="date"
                      class="form-control"
                      value={this.state.toDate}
                      onChange={(e) => {
                        this.setState({ toDate: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-12" style={{ marginTop: 10 }}>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.trainingDataSearch();
                      }}
                    >
                      {/* <img
                        style={{ width: 15, marginRight: 5 }}
                        src="/images/Search.gif"
                      /> */}
                      Find training images
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1"></div>
            <div className="card-body">{this.renderTable()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModelTraining;
