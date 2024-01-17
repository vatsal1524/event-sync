/* author: Mehulkumar Bhunsadiya */
import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function LayoutWithHeaderFooter() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default LayoutWithHeaderFooter;
