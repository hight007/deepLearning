import React, { Component } from "react";
import { connect } from "react-redux";
import {
  register,
  showRegisterErrorAlerted,
} from "./../../actions/register.action";
import { APP_TITLE } from "./../../constants/index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      empNumber: "",
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " Register";
  }

  showError = () => {
    if (this.props.registerReducer.isError) {
      this.props.showRegisterErrorAlerted(
        this.props.registerReducer.errorMessage
      );
    }
  };

  render() {
    return (
      <div
        class="register-page"
        style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", height: 750 }}
      >
        <div
          className="register-box"
          style={{
            borderRadius: 8,
            backgroundColor: "WhiteSmoke",
            padding: 12,
          }}
        >
          <div className="login-logo">
            <img
              src="/images/DeepLearning.png"
              alt="MIC Logo"
              className="img-fluid mb-3"
              style={{ maxHeight: 100 }}
            />
            <br></br>
            <b>{APP_TITLE}</b>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Register your account</p>
              <form>
                {/* Username */}
                <div className="input-group mb-3">
                  <input
                    maxlength="20"
                    onChange={(e) => {
                      this.setState({ username: e.target.value });
                    }}
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="User name"
                    autoFocus
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                {/* Emp Number */}
                <div className="input-group mb-3">
                  <input
                    maxlength="6"
                    onChange={(e) => {
                      this.setState({ empNumber: e.target.value });
                    }}
                    name="empNumber"
                    type="text"
                    className="form-control"
                    placeholder="Employee Number"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                {/* password */}
                <div className="input-group mb-3">
                  <input
                    maxlength="20"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {/* confirmpassword */}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      this.setState({ confirmPassword: e.target.value });
                    }}
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>

                {/* Register */}
                <div className="row">
                  <div className="col-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.register(this.props.history, this.state);
                      }}
                      type="submit"
                      className="btn btn-block btn-primary"
                    >
                      Register
                    </button>
                  </div>
                  {this.showError()}
                  {/* back */}
                  <div className="col-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.history.goBack();
                      }}
                      type="submit"
                      className="btn btn-block btn-default"
                      style={{ marginTop: 6 }}
                    >
                      Back
                    </button>
                  </div>
                  {/* <span>
                    {JSON.stringify(this.state)}
                  </span> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerReducer: state.registerReducer,
});
const mapDispatchToProps = {
  register,
  showRegisterErrorAlerted,
};

//export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
