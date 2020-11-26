import Axios from 'axios';
import join from "url-join";
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { apiUrl_training, OK, server } from '../../../constants';
import _ from "lodash";

class CreateModels extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modelsName: "",
      labelTag: "",
      listLabelTag: [],
      data: [],
      modelsNameList: [],
      change: false,
    }
  }

  async componentDidMount() {
    this.debounceSearch = _.debounce(this.getLabelTag, 500);
    let modelsNameList = await Axios.get(join(apiUrl_training, server.MODELS_LABEL_TAG_URL))
    this.setState({ modelsNameList: modelsNameList.data.modelsName })
  }

  getLabelTag = (event) => {
    var modelsName = event.target.value;
    if (modelsName != null && modelsName !== "") {
      this.doGetTrainingModels(modelsName)
    }
  }

  doDeboundSearch = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  doCreateTrainingModels = async () => {
    if (this.state.modelsName === '' && this.state.modelsName == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter model name',
      })

    } else if (this.state.listLabelTag.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add some Label tags',
      })
    } else {
      try {
        let result = await Axios.patch(join(apiUrl_training, server.MODELS_LABEL_TAG_URL),
          { modelsName: this.state.modelsName, listLabelTag: this.state.listLabelTag })
        console.log(result.data);
        let labelResult = await Axios.get(join(apiUrl_training, server.LIST_LABEL_TAG_URL, `/modelsName=${this.state.modelsName}`))
        this.setState({ listLabelTag: labelResult.data.labelTagList })
        this.doGetTrainingModels(this.state.modelsName)
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Update training models Label tags completed',
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  doGetTrainingModels = async (modelsName) => {
    try {
      let result = await Axios.get(join(apiUrl_training, server.LIST_LABEL_TAG_URL, `/modelsName=${modelsName}`))
      console.log(result.data);
      if (result.data.api_result === OK) {
        this.setState({ listLabelTag: result.data.labelTagList })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'get models training Label tags error : ' + result.data.error,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'get models training Label tags error : ' + error,
      })
    }
  }

  disabledSubmit = () => {
    if (this.state.modelsName === '' || !this.state.change) {
      return true
    } else {
      return false
    }
  }

  renderHomeTab = () => {
    const renderModelsNamesList = () => {
      return this.state.modelsNameList.map((item) => (
        <option value={item}>{item}</option>
      ))
    }
    const renderLabeltagList = () => {
      return this.state.listLabelTag.map((item) => (
        <option value={item}>{item}</option>
      ))
    }
    const initSelectOption = () => {
      if (this.state.modelsName === "") {
        return (
          <option style={{ color: '#999999' }} value=''>-Please select models name-</option>
        )
      }
    }

    return (
      <div className='row'>
        <div className="col-sm-6">
          <label>Models name : </label>
          <select
            value={this.state.modelsName}
            onChange={(e) => {
              e.preventDefault()
              this.setState({ modelsName: e.target.value })
              this.doDeboundSearch(e)
            }}
            class="form-control" >
            {initSelectOption()}
            {renderModelsNamesList()}
          </select>
        </div>
        <div className="col-sm-6" style={{ overflow: "auto" }}>
          <label>Label tags : </label>
          <select multiple="False" disabled
            class="form-control" >
            {renderLabeltagList()}
          </select>
        </div>

      </div>
    )
  }

  renderCreateTab = () => {
    const renderLabeltagList = () => {
      return this.state.listLabelTag.map((item) => (
        <option value={item}>{item}</option>
      ))
    }

    return (
      <div className="row">
        <div className="col-sm-6" style={{ overflow: "auto" }}>
          <label>Models name : </label>
          <input
            type="text"
            class="form-control"
            value={this.state.modelsName}
            placeholder='Enter your model name'
            onChange={(e) => {
              // e.preventDefault()
              this.setState({ modelsName: e.target.value });
              this.doDeboundSearch(e)
            }}
          />
        </div>
        <div className="col-sm-6" style={{ overflow: "auto" }}>
          <from>
            <label>Label tags : </label>
            <div className='input-group'>
              <input
                type="text"
                class="form-control"
                placeholder='Enter your Label tags'
                value={this.state.labelTag}
                onChange={(e) => {
                  this.setState({ labelTag: e.target.value });
                }}
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type='submit' onClick={async (e) => {
                  e.preventDefault()
                  let listLabelTag = this.state.listLabelTag
                  if (this.state.labelTag === '' || this.state.labelTag == null) {
                    return
                  }
                  if (this.state.listLabelTag.indexOf(this.state.labelTag) >= 0) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'You have already add this Label tags',
                    })
                    return
                  }
                  await listLabelTag.push(this.state.labelTag)
                  this.setState({ listLabelTag, labelTag: '', change: true })
                }}>Add</button>
              </div>
            </div>
          </from>
          <select
            onDoubleClick={(e) => {
              e.preventDefault()
              var selectedValue = e.target.value
              Swal.fire({
                icon: 'warning',
                title: 'Alert...!',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                text: 'Are you sure to delete Label tags "' + e.target.value + '"',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  let listLabelTag = this.state.listLabelTag
                  await listLabelTag.splice(listLabelTag.indexOf(selectedValue), 1)
                  this.setState({ listLabelTag, change: true })
                  // Swal.fire(
                  //   'Deleted!',
                  //   'Your file has been deleted.',
                  //   'success'
                  // )
                }
              })
            }}
            multiple="False"
            class="form-control" >
            {renderLabeltagList()}
          </select>

        </div>


      </div >

    )
  }

  render() {
    return <div className="content-wrapper" id="wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">
                Create training models
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-12">
        <div className="card card-primary card-tabs">
          <div className="card-header p-0 pt-1">
            <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="show-training-models-tab" data-toggle="pill" href="#show-training-models" role="tab" aria-controls="show-training-models" aria-selected="true">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="create-training-models-tab" data-toggle="pill" href="#create-training-models" role="tab" aria-controls="create-training-models" aria-selected="false">
                  Create / Edit
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div class="tab-content" id="custom-tabs-one-tabContent">
              <div class="tab-pane fade active show" id="show-training-models" role="tabpanel" aria-labelledby="show-training-models-tab">
                {this.renderHomeTab()}
              </div>
              <div class="tab-pane fade" id="create-training-models" role="tabpanel" aria-labelledby="create-training-models-tab">
                {this.renderCreateTab()}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" class="btn btn-primary" disabled={this.disabledSubmit()} onClick={(e) => {
              e.preventDefault()
              this.doCreateTrainingModels()
              this.setState({ change: false })
            }}>Submit</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default CreateModels;
