import React, {Component, PropTypes} from 'react';
import moment from 'utils/moment';
import Day from './Day';

function getStart(date) {
  return moment(date).startOf('week');
}
function getEnd(date) {
  return moment(date).endOf('week');
}
function getDayDates(date) {
  const tempDate = getStart(date);
  const end = getEnd(date);
  const dayDates = [moment(tempDate)];
  while (tempDate.add(1, 'days') < end) {
    dayDates.push(moment(tempDate));
  }
  return dayDates;
}

export default class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayDates: getDayDates(props.date),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.date.isSame(nextProps.date, 'day')) {
      this.setState({dayDates: getDayDates(nextProps.date)});
    }
  }
  render() {
    const {DayComponent, ...other} = this.props;
    const {dayDates} = this.state;
    return (
      <div className="react-moment-week">
        {dayDates.map(date => (
          <DayComponent
            {...other}
            key={date.valueOf()}
            date={date}
          />
        ))}
      </div>
    );
  }
}
Week.defaultProps = {
  DayComponent: Day,
};
Week.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  DayComponent: PropTypes.func,
};
