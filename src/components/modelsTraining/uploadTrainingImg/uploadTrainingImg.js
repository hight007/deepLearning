import React, { Component } from 'react';
import join from "url-join";
import { Formik } from "formik";
import Axios from 'axios';
import { apiUrl_training, OK, server } from '../../../constants';
import Swal from 'sweetalert2';

class UploadTrainingImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadFileType: "",
      modelsName: '',
      clientHeight: 0,
      clientWidth: 0,
      modelsNameList: [],
    };
  }

  async componentDidMount() {
    let { clientHeight, clientWidth } = this.refs.myImgContainer;
    this.setState({ id: this.props.match.params.id, clientHeight, clientWidth })
    let modelsNameList = await Axios.get(join(apiUrl_training, server.MODELS_LABEL_TAG_URL))
    this.setState({ modelsNameList: modelsNameList.data.modelsName })
  }

  showPreviewImage = (values) => {
    if (
      values.file_obj != null &&
      this.state.uploadFileType.includes("image/")
    ) {
      // alert(JSON.stringify(values.file_obj));
      if (values.file_obj) {
        return <img src={values.file_obj} style={{ maxWidth: this.state.clientWidth * 0.8 }} />;
      }
    }
  };

  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    const renderModelsNamesList = () => {
      return this.state.modelsNameList.map((item) => (
        <option value={item}>{item}</option>
      ))
    }

    return (
      <form className="form-primary" onSubmit={handleSubmit}>
        <div className="card-body" style={{ marginTop: 5 }}>
          <div className='row'>
            {/* Upload file */}
            <div className="col-sm-6">
              <div className="input-group" style={{ marginTop: 5 }}>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span
                      class="iconify"
                      data-icon="entypo:upload"
                      data-inline="true"
                    ></span>
                    <span style={{ color: "#000000", marginLeft: 5 }}>
                      {" "}
                  Upload file{" "}
                    </span>
                  </span>
                </div>
                {/* <label for="customFile">Custom File</label> */}

                <div className="custom-file">
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.files[0].type != null) {
                        this.setState({ uploadFileType: e.target.files[0].type });
                      } else {
                        this.setState({ uploadFileType: "" });
                      }
                      setFieldValue("file", e.target.files[0]); // for upload
                      setFieldValue(
                        "file_obj",
                        URL.createObjectURL(e.target.files[0])
                      );
                      // for preview image
                      document.getElementById("chooseFile").innerHTML =
                        e.target.files[0].name;
                    }}
                    type="file"
                    name="image"
                    multiple
                    accept=".jpg"
                    style={{ padding: "20px 0" }}
                    className="custom-file-input"
                  />
                  <label
                    className="custom-file-label"
                    id="chooseFile"
                    htmlFor="customFile"
                  >
                    Choose file...
                  </label>
                </div>
              </div>

            </div>

            {/* models name */}
            <div className="col-sm-6">
              <div className="input-group" style={{ marginTop: 5 }}>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span class="iconify" data-icon="carbon:model-alt" data-inline="true"></span>
                    <span style={{ color: "#000000", marginLeft: 5 }}>
                      {" "}Models name{" "}
                    </span>
                  </span>
                </div>
                <select
                  value={this.state.modelsName}
                  onChange={(e) => {
                    e.preventDefault()
                    this.setState({ modelsName: e.target.value })
                  }}
                  class="form-control" >
                  <option style={{ color:'#999999'}} value=''>-Please select models name-</option>
                  {renderModelsNamesList()}
                </select>
              </div>
            </div>
          </div>

          {/* preview Image */}
          <div
            className="card-body"

            style={{ marginTop: 5, textAlign: "center" }}
          >
            {this.showPreviewImage(values)}
          </div>
        </div>
        <div className="card-footer" style={{ marginTop: 5 }}>
          <button
            type="submit"
            disabled={
              !isSubmitting && this.state.uploadFileType !== "" && this.state.modelsName !== '' ? false : true
            }
            className="btn btn-primary pull-right"
          >
            Upload
          </button>{" "}
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default float-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  loadingScreen(isLoading) {
    if (isLoading) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Uploading...</div>
        </div>
      );
    }
  }

  renderUploadForm() {

    return (
      <div className="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Upload file from</h3>
        </div>

        <div className="overlay-wrapper">
          {this.loadingScreen(false)}
          <Formik
            initialValues={{ modelsName: this.state.modelsName }}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData();
              setSubmitting(true);
              formData.append("image", values.file);
              formData.append("modelsName", this.state.modelsName);

              let result = await Axios.post(join(apiUrl_training, server.MODELS_TRAINING_URL), formData);
              if (result.data.api_result === OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'Yeah...!',
                  text: 'Upload image success!',
                })
                this.state.uploadFileType = ''
                document.getElementById("chooseFile").innerHTML = 'Choose file...';

                setSubmitting(false);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Upload data error!',
                })
              }
            }}
          >
            {(props) => this.showForm(props)}
          </Formik>
        </div>
      </div>
    );

  }

  render() {
    return (<div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Upload file</h1>
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section ref="myImgContainer" className="content">{this.renderUploadForm()}</section>
    </div>)
  }
}

export default UploadTrainingImg;
