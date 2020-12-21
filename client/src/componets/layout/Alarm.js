import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeAlarm } from "../../actions/alarm";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Alarm = ({ alarms, removeAlarm }) => {
  return (
    <Fragment>
      <Container className='px-5'>
        {alarms === undefined || alarms.length < 1
          ? ""
          : alarms.map((alarm) => (
              <Alert
                variant={alarm.type}
                key={alarm.id}
                onClose={() => removeAlarm(alarm.id)}
                show={true}
                dismissible
              >
                <p>{alarm.msg}</p>
              </Alert>
            ))}
      </Container>
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
