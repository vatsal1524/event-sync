# EventSync

EventSync offers a convenient platform for users to explore and book nearby events. By leveraging location-based services, users can quickly discover various events and access comprehensive details, streamlining the booking process and enhancing their social and cultural experiences. This web application aims to provide a user-friendly platform that connects individuals with nearby events and simplifies the booking process. By integrating features such as event listings, search capabilities, and detailed information, our aim is to enhance the overall event experience, making it convenient and hassle-free for users to discover and participate in local events, and fostering community engagement and cultural enrichment.

-   _Date Created_: 20 Jun 2023
-   _Last Modification Date_: 20 Jun 2023
-   _Git URL_: https://git.cs.dal.ca/dankhara/csci_5709_grp-06
-   _Live Project URL_: https://main--monumental-salmiakki-3549db.netlify.app/

## Authors

-   [Preetha Kachhadiya](pr966330@dal.ca) - _(Full Stack Developer)_
-   [Faizal Maulvi](mh795616@dal.ca) - _(Full Stack Developer)_
-   [Dhruvin Dankhara](dh793203@dal.ca) - _(Full Stack Developer)_
-   [Mehul Bhunsadiya](mh207556@dal.ca) - _(Full Stack Developer)_
-   [Vatsal Jain](vt9815576@dal.ca) - _(Full Stack Developer)_

## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

```
Node.js
```

### Installing

To install Node.js, head to the following website: https://nodejs.org/en/ to download and install the Node.js runtime. Once you are done installing, validate the install by running the following command.

```
node --version
```

You should see the Node.js version you installed.

Once you have verified your Node.js setup, simply run the following command in the respository directory:

```
npm i
```

To start the development server and check out the website locally, run:

```
npm start
```

To create a production-ready build, run:

```
npm run build
```

## Deployment

To deploy this application, Netlify was used. You can follow the Tutorial 2 Netlify guide for deployment steps.

## Built With

-   [React.js](https://reactjs.org/) - JavaScript library to create interactive UIs
-   [Netlify](https://www.netlify.com/) - Used for Deployment
-   [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Used for styling the application

*   [React-router-dom Package](https://reactrouter.com/en/main/start/tutorial) - Package used for routing
*   [React-bootstrap Package](https://react-bootstrap.netlify.app/) - Styling package used for ReactJS

## Sources Used

-   https://react-bootstrap.netlify.app/docs/components/header/#responsive-behaviors

### File Name - /src/components/header/header.js

_Lines 15 - 39_

```
<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
<Container>
<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
<Nav className="me-auto">
<Nav.Link href="#features">Features</Nav.Link>
<Nav.Link href="#pricing">Pricing</Nav.Link>
<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">
                Another action
</NavDropdown.Item>
<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action/3.4">
                Separated link
</NavDropdown.Item>
</NavDropdown>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
```

The code above was created by adapting the code in [React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) as shown below:

```
<Navbar
  collapseOnSelect
  expand="md"
  bg="dark"
  data-bs-theme="dark"
  className="mb-4"
  id="header"
>
  <Navbar.Brand className="ms-3">
    <span onClick={handleGetHome}>
      <img
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
        style={{ width: "7%" }}
      />
    </span>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="me-3">
    <Nav className="ms-3 ms-md-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/">Features</Nav.Link>
      <Nav.Link href="/">Pricing</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
```

-   The code in [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) was implemented by React Bootstrap developers
-   [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)'s Code was used because I was not able to redirect to another page from my current page
-   [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)'s Code was modified by me to implement the routings for my website.

-   view-source:https://getbootstrap.com/docs/5.2/examples/footers/#

### File Name - /src/components/footer/footer.js

_Lines 45 - 100_

```
<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
  <p class="col-md-4 mb-0 text-muted">&copy; 2022 Company, Inc</p>

  <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
  </a>

  <ul class="nav col-md-4 justify-content-end">
    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
  </ul>
</footer>
```

The code above was created by adapting the code in [Bootstrap](https://getbootstrap.com/docs/5.2/examples/footers/#) as shown below:

```
<Navbar
  id="footer"
  expand="lg"
  bg="dark"
  data-bs-theme="dark"
  className="mt-3"
  {...additionalProps}
>
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 px-3 w-100">
    <p className="col-md-4 mb-0">© 2023 Company, Inc</p>

    <span
      onClick={handleGetHome}
      className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <img
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
        style={{ width: "15%" }}
      ></img>
    </span>

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item">
        <span onClick={handleGetHome} className="nav-link px-2">
          Home
        </span>
      </li>
      <li className="nav-item">
        <span onClick={handleGetHome} className="nav-link px-2">
          Features
        </span>
      </li>
      <li className="nav-item">
        <span onClick={handleGetHome} className="nav-link px-2">
          Pricing
        </span>
      </li>
      <li className="nav-item">
        <span onClick={handleGetFaqs} className="nav-link px-2">
          FAQs
        </span>
      </li>
      <li className="nav-item">
        <span onClick={handleGetHome} className="nav-link px-2">
          About
        </span>
      </li>
    </ul>
  </footer>
</Navbar>
```

-   The code in [Bootstrap](https://getbootstrap.com/docs/5.2/examples/footers/#) was implemented by Bootstrap developers
-   [Bootstrap](https://getbootstrap.com/docs/5.2/examples/footers/#)'s Code was used because I was not able to design a good footer
-   [Bootstrap](https://getbootstrap.com/docs/5.2/examples/footers/#)'s Code was modified by me to implement the footer for my website.

## References

-   [React JS Official Documentation](https://react.dev/learn)
-   [Bootstrap 5 Official Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
-   [React-router-dom Package](https://reactrouter.com/en/main/start/tutorial)
-   [React-bootstrap Package](https://react-bootstrap.netlify.app/) - Styling package used for ReactJS
