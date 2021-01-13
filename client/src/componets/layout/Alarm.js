import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeAlarm } from "../../actions/alarm";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Alarm = ({ alarms, removeAlarm }) => {
  return (
    <Fragment>
      {alarms === undefined || alarms.length < 1 ? (
        ""
      ) : (
        <Row className='fixed-top'>
          <Col xs='12'>
            <br />
            <br />
          </Col>
          {alarms.map((alarm) => (
            <Fragment>
              <Col xs='1' sm='2' md='3' lg='3' />
              <Col xs='10' sm='8' md='6' lg='6'>
                <Alert
                  variant={alarm.type}
                  key={alarm.id}
                  onClose={() => removeAlarm(alarm.id)}
                  show={true}
                  dismissible
                >
                  <p>{alarm.msg}</p>
                </Alert>
              </Col>
              <Col xs='1' sm='2' md='3' lg='3' />
            </Fragment>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

Alarm.propTypes = {
  alarms: PropTypes.array.isRequired,
  removeAlarm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alarms: state.alarms,
});

export default connect(mapStateToProps, { removeAlarm })(Alarm);
