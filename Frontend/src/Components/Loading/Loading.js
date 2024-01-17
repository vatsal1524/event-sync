import classes from "./Loading.module.css";
import { Spin } from "antd";
import React from "react";

export default function Loading() {
  return (
    <div className={classes.center_container}>
      <div className={classes.center_content}>
        <Spin size="large" tip="Loading..." />
      </div>
    </div>
  );
}
