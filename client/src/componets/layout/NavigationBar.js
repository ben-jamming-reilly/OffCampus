import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const NavigationBar = ({ logout, isAuthenticated, user }) => {
  return (
    <Navbar
      collapseOnSelect
      expand='sm'
      bg='dark'
      variant='dark'
      sticky='top'
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <Navbar.Brand style={{ color: "#0275d8" }}>
        <Link to='/'>
          <h2 style={{ fontWeight: "bolder" }}>OffCampus</h2>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='float-right' style={{ marginLeft: "auto" }}>
          {isAuthenticated && user && (
            <Nav.Item style={{ padding: "10px" }}>
              <Link to='/#'>
                <h2 style={{ fontWeight: "bolder" }}>{user.user_name}</h2>
              </Link>
            </Nav.Item>
          )}
          <Nav.Item style={{ padding: "10px" }}>
            <Link to='/search'>
              <i class='fas fa-search fa-2x'></i>
            </Link>
          </Nav.Item>
          <Nav.Item style={{ padding: "10px" }}>
            <Link to='/addreview/'>
              <i class='fas fa-edit fa-2x'></i>
            </Link>
          </Nav.Item>
          <Nav.Item style={{ padding: "10px" }}>
            <Link to='/property/add/'>
              <i class='fas fa-home fa-2x'></i>
            </Link>
          </Nav.Item>
          {!isAuthenticated ? (
            <Nav.Item
              style={{
                fontWeight: "bolder",
                fontSize: "1.8em",
                padding: "5px",
              }}
            >
              <Link to='/auth'>Login</Link>
            </Nav.Item>
          ) : (
            <Nav.Item
              style={{
                fontWeight: "bolder",
                fontSize: "1.8em",
                padding: "5px",
              }}
            >
              <Button
                variant='link'
                onClick={logout}
                className='font-weight-bold'
              >
                <i class='fas fa-sign-out-alt fa-2x'></i>
              </Button>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
