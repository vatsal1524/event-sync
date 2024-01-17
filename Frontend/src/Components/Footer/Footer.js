//author: Faizal
import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const handleGetRoutes = (route, e) => {
    e.preventDefault();
    navigate(route);
  };
  const [isSticky, setIsSticky] = useState(false);
  const additionalProps = isSticky ? { fixed: "bottom" } : {};

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    // const scrollTop = Math.ceil(window.pageYOffset);

    // setIsSticky(bodyHeight > windowHeight && scrollTop >= windowHeight);
    setIsSticky(bodyHeight < windowHeight);
  };

  useEffect(() => {
    const app = document.getElementsByClassName("App")[0];
    console.log(app);
    window.addEventListener("scroll", handleScroll);
    let resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(app);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.unobserve(app);
    };
  }, []);
  return (
    <>
      <Navbar
        id="footer"
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="mt-3"
        {...additionalProps}
      >
        {/* <Container>
            <Navbar.Brand>Navbar</Navbar.Brand>
          </Container> */}

        {/* reference - https://getbootstrap.com/docs/5.2/examples/footers/#
          https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png*/}
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 px-3 w-100">
          <p className="col-md-4 mb-0">© 2023 Company, Inc</p>

          <span
            onClick={(e) => {
              handleGetRoutes("/", e);
            }}
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            <img
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
              style={{ width: "15%" }}
              alt="No image available"
            ></img>
          </span>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/dashboard", e);
                }}
                className="nav-link px-2"
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/faqs", e);
                }}
                className="nav-link px-2"
              >
                FAQs
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/contact", e);
                }}
                className="nav-link px-2"
              >
                ContactUs
              </span>
            </li>
          </ul>
        </footer>
      </Navbar>
    </>
  );
}

export default Footer;
