import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { key, YES } from "../../constants/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

class home extends Component {
  async componentDidMount() {
    this.isMember();
    window.scrollTo(0, 0);
  }

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  loadingScreen(data) {
    if (data === null) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    }
  }

  showImgSlider(listImg) {
    return listImg.map((item) => (
      <div className="each-slide">
        <img src={item}/>
      </div>
    ));
  }

  render() {
    const slideImages = [
      "/images/Deep_learning_history.png",
      "/images/DeepLearning_meaning.png",
    ];
 
    return (
      <div className="content-wrapper " id="wrapper">
        <div
          className="col-sm-12"
          style={{ textAlign: "center", minHeight: 500 }}
        >
          <Animated animationIn="bounceIn">
            <div style={{ fontSize: 40 }}>
              <img
                src="/images/DeepLearning.png"
                alt="MIC Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: 50 }}
              />
              <b> Defect detection</b>
              <small>(Deep learning)</small>
            </div>
          </Animated>

          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6" style={{ textAlign: "left" }}></div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right"></ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          <div className="content">
            <div className="row"></div>
            <div>
              <div className="overlay-wrapper">
                {this.loadingScreen(1)}
                <div className="container-fluid">
                  <div className="card card-primary card-tabs">
                    <div className="card-header"></div>
                    <div className="card-body">
                      <div className="slide-container">
                        <Slide>{this.showImgSlider(slideImages)}</Slide>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Info */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(home);
