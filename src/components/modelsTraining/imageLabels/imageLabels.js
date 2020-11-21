import React, { Component } from 'react';
import { Annotator } from 'image-labeler-react';
import { apiUrl, server } from '../../../constants';
import join from "url-join";
import Swal from 'sweetalert2';
import { httpClient } from '../../../utils/HttpClient';

class ImageLabels extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: null,
      clientHeight: 0,
      clientWidth: 0,
    }
  }

  componentDidMount() {
    let { clientHeight, clientWidth } = this.refs.myImgContainer;
    this.setState({ id: this.props.match.params.id, clientHeight, clientWidth })
  }


  imageLabeler = () => {
    return (

      <Annotator
        height={this.state.clientWidth * 0.535}
        width={this.state.clientWidth * 0.8}
        imageUrl={join(apiUrl, `${server.MODELS_TRAINING_URL}/${this.state.id}`)}
        asyncUpload={async (labeledData) => {
          try {
            // console.log(labeledData);
            if (labeledData.boxes.length > 0) {
              Swal.fire({
                icon: 'success',
                title: 'Yeah...!',
                text: 'You have already labeled this image',
              }).then(async () => {
                let result = await httpClient.post(`${server.LABELED_URL}`, labeledData)
                console.log(result.data);
                // this.props.history.push('/deeplearning/modelTraining')
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please labels on image',
              }).then(() => {
                window.location.reload();
              })
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            }).then(() => {
              window.location.reload();
            })
          }


        }}
        types={['A', 'B', 'Cylinder']}
        defaultType={"Cylinder"}
      />

    )
  }

  render() {
    return (
      <div className="content-wrapper " id="wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">
                  Labeler
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12">
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1"></div>
            <div className="card-body" ref="myImgContainer">
              {this.imageLabeler()}
            </div>
            <div className="card-footer">

            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default ImageLabels;
