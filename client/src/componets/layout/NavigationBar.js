import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";

const NavigationBar = ({
  logout,
  auth: { isAuthenticated, loading, user },
}) => {
  return (
    <Navbar
      collapseOnSelect
      expand='sm'
      bg='dark'
      variant='dark'
      sticky='top'
      className='sticky-top'
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <Navbar.Brand style={{ color: "#0275d8" }} className='mr-0 pt-2 pb-2'>
        <Link to='/'>
          <h3
            style={{ fontWeight: "bolder" }}
            className='align-text-top mb-0 pt-1'
          >
            OffCampus: Gonzaga
          </h3>
        </Link>
      </Navbar.Brand>
      {!loading && (
        <Fragment>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='float-right' style={{ marginLeft: "auto" }}>
              <Nav.Item style={{ padding: "10px" }}>
                <Link to='/search'>
                  <i class='fas fa-search fa-2x'></i>
                </Link>
              </Nav.Item>
              <Nav.Item style={{ padding: "10px" }}>
                <Link to='/search'>
                  <i class='fas fa-stream fa-2x'></i>
                </Link>
              </Nav.Item>
              <Nav.Item style={{ padding: "10px" }}>
                <Link to='/property/add/'>
                  <sup className='mt-0'>
                    <i class='fas fa-plus'></i>
                  </sup>
                  <i class='fas fa-home fa-2x'></i>
                </Link>
              </Nav.Item>
              {!isAuthenticated && (
                <Nav.Item
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.8em",
                    padding: "5px",
                  }}
                >
                  <Link to='/auth/login'>Login</Link>
                </Nav.Item>
              )}

              {isAuthenticated && user && (
                <Fragment>
                  <Nav.Item className='my-auto align-text-top pt-0'>
                    <Link to='/me' className='align-text-top'>
                      <h3 className='align-text-top mb-0 font-weight-bold'>
                        {user.first_name ? user.first_name : "Me"}
                      </h3>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className='my-auto align-text-top pt-0'>
                    <Button
                      variant='link'
                      onClick={logout}
                      className='font-weight-bold'
                    >
                      <i class='fas fa-sign-out-alt fa-2x'></i>
                    </Button>
                  </Nav.Item>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Fragment>
      )}
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
