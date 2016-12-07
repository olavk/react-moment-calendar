import React, {PropTypes} from 'react';
import moment from 'utils/moment';

const Day = props => {
  const {date, ...other} = props;
  return (
    <span className="react-moment-day" {...other}>
      {date.format('DD')}
    </span>
  );
};
Day.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export default Day;
