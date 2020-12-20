import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

import { removeAlarm } from "../../actions/alarm";

const Alarm = ({ alarms, removeAlarm }) => {
  console.log(alarms);
  return (
    <Fragment>
      {alarms == null || alarms.length === 0
        ? ""
        : alarms.map((alarm) => (
            <Alert
              variant={alarm.type}
              key={alarm.id}
              onClose={() => removeAlarm(alarm.id)}
              show={true}
            >
              <p>{alarm.msg}</p>
            </Alert>
          ))}
    </Fragment>
  );
};

Alarm.propTypes = {
  alarms: PropTypes.array.isRequired,
  removeAlarm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alarms: state.alarm,
});

export default connect(mapStateToProps, { removeAlarm })(Alarm);
