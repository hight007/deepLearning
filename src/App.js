import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import home from "./components/home/home";
import verifyEmail from "./components/verifyEmail/verifyEmail";
import forgetPassword from "./components/forgetPassword/forgetPassword";
import changePassword from "./components/changePassword/changePassword";
import "overlayscrollbars/css/OverlayScrollbars.css";

// productionResult
import productionReport from "./components/productionResult/productionReport/productionReport";
import defectSearch from "./components/productionResult/defectSearch/defectSearch";

// Deep learning
import meaning from "./components/deepLearning/meaning/meaning";
import modelTraining from './components/modelsTraining/modelTraining/modelTraining'
import imagesLabels from "./components/modelsTraining/imageLabels/imageLabels";
import downloadTrainingXML from "./components/modelsTraining/downloadTrainingXML/downloadTrainingXML";
import uploadTrainingImg from "./components/modelsTraining/uploadTrainingImg/uploadTrainingImg";
import createModels from './components/modelsTraining/createModels'
// master
import manage_divisionCode from "./components/manage_master/divisionCode/divisionCode";
import create_divisionCode from "./components/manage_master/create-divisionCode/create-divisionCode";

//Admin tools
import userManage from "./components/adminTools/userManage/userManage";
import editUser from "./components/adminTools/edit_user/edit_user";

import { APP_TITLE } from "./constants/index";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as moment from "moment";

const MySwal = withReactContent(Swal);

const isLoggedIn = () => {
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};

const isPowerUser = () => {
  if (
    localStorage.getItem(key.USER_LV) === "power" ||
    localStorage.getItem(key.USER_LV) === "admin"
  ) {
    return true;
  } else {
    return false;
  }
};

const isLoginTimeOut = (value, unit) => {
  const loginTime = moment(localStorage.getItem(key.TIME_LOGIN))
    .add(value, unit)
    .toDate();
  if (loginTime < moment()) {
    localStorage.removeItem(key.LOGIN_PASSED);
    localStorage.removeItem(key.API_KEY);
    localStorage.removeItem(key.USER_NAME);
    localStorage.removeItem(key.USER_LV);
    localStorage.removeItem(key.USER_EMP);
    localStorage.removeItem(key.TIME_LOGIN);

    MySwal.fire({
      icon: "info",
      title: "Login timeout",
      text: "Please re login again...",
      showCancelButton: false,
    }).then(() => {
      window.location.replace("../login");
    });
    return true;
  } else {
    return false;
  }
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(4, "h") === false ? (
        <Component {...props} />
      ) : (
          <Redirect to="/login" />
        )
    }
  />
);

const SecuredLVRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(1, "h") === false ? (
        isPowerUser() === true ? (
          <Component {...props} />
        ) : (
            <Redirect to="/home" />
          )
      ) : (
          <Redirect to="/login" />
        )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    document.title = APP_TITLE;
    return (
      <Router>
        <div>
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={home} />
            <Route path="/user/forgetPassword" component={forgetPassword} />
            <Route
              path="/verifyEmail/:username/:randomKey"
              component={verifyEmail}
            />
            <SecuredRoute
              path="/user/changePassword"
              component={changePassword}
            />
            {/* AdminTools */}
            <SecuredLVRoute
              path="/adminTools/userManage"
              component={userManage}
            />
            <SecuredLVRoute
              path="/adminTools/editUser/username=:username&levelUser=:levelUser"
              component={editUser}
            />

            {/* master */}
            <SecuredLVRoute
              path="/master/divisionCode"
              component={manage_divisionCode}
            />
            <SecuredLVRoute
              path="/master/create/divisionCode"
              component={create_divisionCode}
            />

            {/* productionResult */}
            <SecuredRoute
              path="/productionResult/productionReport"
              component={productionReport}
            />
            <SecuredRoute
              path="/productionResult/defectSearch"
              component={defectSearch}
            />

            {/* deelLearning */}
            <SecuredRoute
              path="/deeplearning/modelTraining"
              component={modelTraining}
            />
            <SecuredRoute
              path="/deeplearning/imagesLabels/:id&:modelsName"
              component={imagesLabels}
            />
            <SecuredRoute
              path="/deeplearning/downloadTrainingXML"
              component={downloadTrainingXML}
            />
            <SecuredRoute
              path="/deeplearning/uploadTrainingImg"
              component={uploadTrainingImg}
            />
            <SecuredRoute
              path="/deeplearning/createModels"
              component={createModels}
            />
            <SecuredRoute
              path="/deeplearning/meaning"
              component={meaning}
            />

            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route exact={true} path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
