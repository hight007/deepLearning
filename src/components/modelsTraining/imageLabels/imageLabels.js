import React, { Component } from 'react';
import { Annotator } from 'image-labeler-react';
import { apiUrl_training, OK, server } from '../../../constants';
import join from "url-join";
import Swal from 'sweetalert2';
import Axios from 'axios';

class ImageLabels extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: null,
      modelsName: '',
      listLabelTag: [],
      clientHeight: 0,
      clientWidth: 0,
      defaultBoxes: [],
    }
  }

  async componentDidMount() {
    let { clientHeight, clientWidth } = this.refs.myImgContainer;
    let { id, modelsName } = this.props.match.params
    let labelResult = await Axios.get(join(apiUrl_training, server.LIST_LABEL_TAG_URL, `/modelsName=${modelsName}`))
    let defaultBoxes = await Axios.get(join(apiUrl_training, server.LABELED_URL, `/id=${id}`))
    this.setState({
      id,
      modelsName,
      listLabelTag: labelResult.data.labelTagList,
      clientHeight,
      clientWidth,
      defaultBoxes: defaultBoxes.data.defaultBoxes
    })
  }

  imageLabeler = () => {
    return (
      <Annotator
        height={this.state.clientWidth * 0.535}
        width={this.state.clientWidth * 0.8}
        imageUrl={join(apiUrl_training, `${server.MODELS_TRAINING_URL}/${this.state.id}`)}
        defaultBoxes={this.state.defaultBoxes}
        asyncUpload={async (labeledData) => {
          try {
            console.log(labeledData);
            if (labeledData.boxes.length > 0) {
              //save labeled result
              let result = await Axios.post(join(apiUrl_training, server.LABELED_URL),
                {
                  labeledData,
                  id: this.state.id,
                })
              if (result.data.api_result === OK) {
                Swal.fire({
                  title: 'Next image?',
                  text: "You have aleready labeled image,Go next image?",
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Next'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    let nextID = await Axios.get(join(apiUrl_training, server.NEXT_LABEL_URL, `/${this.state.id}`))
                    if (nextID.data.api_result === OK) {
                      let defaultBoxes = await Axios.get(join(apiUrl_training, server.LABELED_URL, `/id=${nextID.data.id}`))
                      if (defaultBoxes.data.api_result === OK) {
                        this.setState({ id: nextID.data.id, defaultBoxes: defaultBoxes.data.defaultBoxes })
                        this.props.history.push(`/deeplearning/imagesLabels/${nextID.data.id}&${this.state.modelsName}`)
                        // window.location.replace(`/deeplearning/imagesLabels/${nextID.data.id}`);
                      } else {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Oops...',
                          text: 'default labels box not found',
                        })
                      }
                    } else {
                      Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'This is last labels image',
                      })
                      this.props.history.push('/deeplearning/modelTraining')
                    }
                  } else {
                    this.props.history.push('/deeplearning/modelTraining')
                  }
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Save error please try again'
                })
                window.location.reload();
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please labels on image',
              })
              window.location.reload();

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
        types={this.state.listLabelTag}
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
            <div className="card-header p-0 pt-1">

            </div>
            <div className="card-body" ref="myImgContainer">
              {this.imageLabeler()}
            </div>
            <div className="card-footer">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  Swal.fire({
                    title: 'Previous image?',
                    text: "You have aleready labeled image,Go previous image?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Previous'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      let previousID = await Axios.get(join(apiUrl_training, server.PREVIOUS_LABEL_URL, `/${this.state.id}`))
                      if (previousID.data.api_result === OK) {
                        let defaultBoxes = await Axios.get(join(apiUrl_training, server.LABELED_URL, `/id=${previousID.data.id}`))
                        if (defaultBoxes.data.api_result === OK) {
                          this.setState({ id: previousID.data.id, defaultBoxes: defaultBoxes.data.defaultBoxes })
                          this.props.history.push(`/deeplearning/imagesLabels/${previousID.data.id}&${this.state.modelsName}`)
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'default labels box not found',
                          })
                        }
                      } else {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Oops...',
                          text: 'This is first labels image',
                        })
                      }
                    }
                  })
                }}>
                Previous img
              </button>
              <button
                type="submit"
                class="btn btn-primary float-right"
                onClick={(e) => {
                  e.preventDefault()
                  Swal.fire({
                    title: 'Next image?',
                    text: "You have aleready labeled image,Go next image?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Next'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      let nextID = await Axios.get(join(apiUrl_training, server.NEXT_LABEL_URL, `/${this.state.id}`))
                      if (nextID.data.api_result === OK) {
                        let defaultBoxes = await Axios.get(join(apiUrl_training, server.LABELED_URL, `/id=${nextID.data.id}`))
                        console.log(defaultBoxes.data);
                        if (defaultBoxes.data.api_result === OK) {
                          this.setState({ id: nextID.data.id, defaultBoxes: defaultBoxes.data.defaultBoxes })
                          this.props.history.push(`/deeplearning/imagesLabels/${nextID.data.id}&${this.state.modelsName}`)
                        } else {
                          Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'default labels box not found',
                          })
                        }
                      } else {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Oops...',
                          text: 'This is last labels image',
                        })
                      }
                    }
                  })
                }}>
                Next img
              </button>
            </div>
          </div>
        </div>


      </div>
    );
  }

}

export default ImageLabels;
