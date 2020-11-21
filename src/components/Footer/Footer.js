import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer bg-light">
      <strong>
        Produce by ©{" "}
        <a href="http://10.121.1.95:2000/">
          MIC Division{" "}
          <img
            src="/images/MIC_Logo.png"
            style={{ textAlign: "center", maxHeight:20 }}
          />
        </a>
      </strong>
      &nbsp; All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <img
          src="/images/NMB_logo.png"
          style={{ textAlign: "center", maxHeight: 30 }}
        />
      </div>
    </footer>
  );
}
