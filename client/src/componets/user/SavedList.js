import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// react bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import {
  getSavedProperties,
  saveProperty,
  deleteSavedProperty,
} from "../../actions/property";

const SavedList = ({
  getSavedProperties,
  deleteSavedProperty,
  properties,
  loading,
}) => {
  return (
    <Fragment>
      <ListGroup>
        <ListGroup.Item>Header Here</ListGroup.Item>
        <ListGroup.Item>Header Here</ListGroup.Item>
        <ListGroup.Item>Header Here</ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  properties: state.saved.properties,
  loading: state.saved.loading,
});

export default connect(mapStateToProps, {
  getSavedProperties,
  saveProperty,
  deleteSavedProperty,
})(SavedList);
