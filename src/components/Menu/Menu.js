import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { key } from "../../constants";

class Menu extends Component {
  renderAdminTools() {
    const { pathname } = this.props.location;

    if (
      localStorage.getItem(key.USER_LV) === "power" ||
      localStorage.getItem(key.USER_LV) === "admin"
    ) {
      return (
        <li className="nav-item has-treeview">
          <div
            className={
              pathname === "/adminTools/userManage" ||
                pathname.includes("/adminTools/editUser/")
                ? "nav-link active"
                : "nav-link"
            }
          >
            <i className="nav-icon iconify" data-icon="bx-bxs-user-detail" />
            <p>
              Admin tools
              <i className="fas fa-angle-left right" />
            </p>
          </div>
          <ul className="nav nav-treeview" style={{ display: "none" }}>
            <li className="nav-item">
              <Link
                to="/adminTools/userManage"
                className={
                  pathname === "/adminTools/userManage"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>User manage</p>
              </Link>
            </li>
          </ul>
        </li>
      );
    }
  }

  renderManageMaster() {
    const { pathname } = this.props.location;

    if (
      localStorage.getItem(key.USER_LV) === "power" ||
      localStorage.getItem(key.USER_LV) === "admin"
    ) {
      return (
        <li className="nav-item has-treeview">
          <div
            className={
              pathname === "/master/divisionCode" ||
                pathname === "/master/create/divisionCode" ||
                pathname.includes("/master/edit/webboard_category/category=")
                ? "nav-link active"
                : "nav-link"
            }
          >
            <i className="nav-icon iconify" data-icon="cil:list-numbered" />
            <p>
              Manage master
              <i className="fas fa-angle-left right" />
            </p>
          </div>
          <ul className="nav nav-treeview" style={{ display: "none" }}>
            <li className="nav-item">
              <Link
                to="/master/divisionCode"
                className={
                  pathname === "/master/divisionCode" ||
                    pathname === "/master/create/divisionCode"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>Division code</p>
              </Link>
            </li>
          </ul>
        </li>
      );
    }
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}

        <Link className="brand-link bg-primary" to="/home">
          <img
            src="/images/DeepLearningLogo.png"
            alt="MIC Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            NMB deep learning
          </span>
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/images/MIC_Logo.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="http://10.121.1.95:2000/" target="_blank" className="d-block">
                Produce by MIC Division
              </a>
            </div>
          </div>

          <nav className="mt-2" style={{ overflow: "auto" }}>
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Deep learning */}
              <li className="nav-item has-treeview">
                <div
                  className={
                    pathname === "/deeplearning/modelTraining" ||
                      pathname.includes("/deeplearning")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon iconify" data-icon="vs:whiteboard" />
                  <p>
                    Deep learning
                      <i className="fas fa-angle-left right" />
                  </p>
                </div>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link
                      to="/deeplearning/meaning"
                      className={
                        pathname === "/deeplearning/meaning"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>What is deep learning</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/deeplearning/modelTraining"
                      className={
                        pathname === "/deeplearning/modelTraining"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Model training</p>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Production result */}
              <li className="nav-item has-treeview">
                <div
                  className={
                    pathname === "/productionResult/productionReport" ||
                      pathname === "/productionResult/defectSearch"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i
                    className="nav-icon iconify"
                    data-icon="ion-document-attach-outline"
                  />
                  <p>
                    Production result
                      <i className="fas fa-angle-left right" />
                  </p>
                </div>
                <ul className="nav nav-treeview" style={{ display: "none" }}>
                  <li className="nav-item">
                    <Link
                      to="/productionResult/productionReport"
                      className={
                        pathname === "/productionResult/productionReport"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Production report</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/productionResult/defectSearch"
                      className={
                        pathname === "/productionResult/defectSearch"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Defect search</p>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Manage master */}
              {this.renderManageMaster()}
              {/* admin tools */}
              {this.renderAdminTools()}
            </ul>
          </nav>
          {/* </OverlayScrollbarsComponent> */}
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default withRouter(Menu);
