import React, { Component } from 'react';
import { Annotator } from 'image-labeler-react';
import * as moment from "moment";
import Zoom from "react-medium-image-zoom";
import { apiUrl_training, OK, server } from '../../../constants';
import Swal from 'sweetalert2';
import join from "url-join";
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ModelTraining extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      subLabelNames: [],
      startDate: this.setDate(this.addDay(new Date(), 0)),
      toDate: this.setDate(this.addDay(new Date(), 1)),
      status: 'unTrain',
      modelsName: 'All',
      modelsNameList: []
    }
  }

  async componentDidMount() {
    if (this.state.modelsNameList.length <= 0) {

      let modelsNameList = await Axios.get(join(apiUrl_training, server.MODELS_NAME_URL))
      await this.setState({ modelsNameList: modelsNameList.data.modelsName })
      console.log(this.state.modelsNameList);
    }

  }

  trainingDataSearch = async () => {
    try {
      let resultBackend = await Axios.get(join(apiUrl_training, `${server.MODELS_TRAINING_SEARCH_URL}/startDate=${this.state.startDate}&toDate=${this.state.toDate}&status=${this.state.status}&modelsName=${this.state.modelsName}`));
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
            <td>{item.modelsName}</td>
            <td>{moment(item.createdAt).utc().format("ddd DD-MMM-Y") + ' ' + moment(item.createdAt).format("HH:mm:ss")}</td>
            <td>{moment(item.updatedAt).utc().format("ddd DD-MMM-Y") + ' ' + moment(item.updatedAt).format("HH:mm:ss")}</td>
            <td>
              <Zoom>
                <img
                  style={{ maxHeight: 100, marginLeft: 5 }}
                  src={join(apiUrl_training, `${server.MODELS_TRAINING_URL}/${item.id}`)}
                />
              </Zoom>
            </td>
            <td>
              <Link to={`/deeplearning/imagesLabels/${item.id}&${item.modelsName}`}>
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

  renderModelsNameSelect = () => {
    if (this.state.modelsNameList.length > 0) {
      return this.state.modelsNameList.map((item) => (
        <option value={item}>{item}</option>
      ))
    }
  }

  downloadArchivedModels = () => {
    if (this.state.modelsName !== 'All') {
      window.open(join(apiUrl_training, server.DOWNLOAD_ARCHIVED_MODELS_URL, `/modelsName=${this.state.modelsName}`));
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select models name',
      })
    }
  }

  render() {
    return (
      <div className="content-wrapper" id="wrapper">
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
                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label>Models : </label>
                    <select value={this.state.modelsName} class="form-control" onChange={(e) => {
                      this.setState({ modelsName: e.target.value });
                    }}>
                      <option value="All">----All----</option>
                      {this.renderModelsNameSelect()}
                    </select>
                  </div>

                  <div className="col-sm-6" style={{ overflow: "auto" }}>
                    <label>Status : </label>
                    <select value={this.state.status} class="form-control" onChange={(e) => {
                      this.setState({ status: e.target.value });
                    }}>
                      <option value="All">----All----</option>
                      <option value="unTrain">unTrain</option>
                      <option value="Trained">Trained</option>
                    </select>
                  </div>
                  <div className="col-sm-6" style={{ marginTop: 10 }}>
                    <button
                      type="submit"
                      className="btn btn-block btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.downloadArchivedModels()
                      }}
                    >
                      Download achieved XML file
                    </button>
                  </div>
                  <div className="col-sm-6" style={{ marginTop: 10 }}>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.trainingDataSearch();
                      }}
                    >
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
