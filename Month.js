import React, {Component, PropTypes} from 'react';
import moment from 'utils/moment';
import Week from './Week';

function getStart(date) {
  return moment(date).startOf('month').startOf('week');
}
function getEnd(date) {
  return moment(date).endOf('month').endOf('week');
}
function getWeekDates(date) {
  const tempDate = getStart(date);
  const end = getEnd(date);
  const weekDates = [moment(tempDate)];
  while (tempDate.add(7, 'days') < end) {
    weekDates.push(moment(tempDate));
  }
  return weekDates;
}

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDates: getWeekDates(props.date),
    };
  }
  componentWillReceiveProps(nextProps) {
    // Only generate new weekDates when date prop changes
    if (!this.props.date.isSame(nextProps.date, 'day')) {
      this.setState({weekDates: getWeekDates(nextProps.date)});
    }
  }
  render() {
    const {WeekComponent, ...other} = this.props;
    const {weekDates} = this.state;
    return (
      <div className="react-moment-month">
        {weekDates.map(date => (
          <WeekComponent
            {...other}
            key={date.valueOf()}
            date={date}
          />
        ))}
      </div>
    );
  }
}
Month.defaultProps = {
  WeekComponent: Week,
};
Month.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  WeekComponent: PropTypes.func,
};
