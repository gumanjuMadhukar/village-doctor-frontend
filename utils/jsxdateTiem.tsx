/* eslint-disable @next/next/no-img-element */
import { Row } from 'antd';
import React from 'react';
import { CSSProperties } from 'styled-components';
import { AttendanceDetailLabel } from 'styles/profileInformation';

import {
  getDaysFromAttendance,
  getLeaveDates,
  getNameOfTheDayOfMonth,
  getWeekendsInMonth,
  isCurrentDay,
  remainingDaysInCurrentMonth
} from './dateTime';
import { FirstHalf, FullDay, Leave, SecondHalf, UpcomingAttendance } from './icon';

const styles = () => {
  const pointerEvents = 'auto';
  // if (textToBeDisplayed.type === (<Weekend />).type) {
  //   pointerEvents = 'none';
  // }
  const styledTextToBeDisplayed = {
    cursor: 'pointer',
    textAlign: 'center',
    pointerEvents,
    display: 'flex',
    justifyContent: 'center'
  };
  return { styledTextToBeDisplayed };
};

const checkIfTodayIsHoliday = (year: number, month: number, day: number) => {
  const holidays: any[] = []; // Add your list of holidays here
  const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const isHoliday = holidays.find(holiday => holiday.date === dateString);

  if (isHoliday) {
    return true;
  }

  return false;
};

const getDaysInMonth = (m: string, year: string, handleCurrentUser: any) => {
  const month = +m;
  const daysInMonth = new Date(+year, month, 0).getDate();
  const days = [];
  const nameOfTheDayOfMonth = getNameOfTheDayOfMonth(+year, month - 1); // month starts from 0 in the function
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(daysInMonth); i++) {
    const isTodayAWeekend = getWeekendsInMonth(+year, +m || 1).includes(i);

    const isTodayAHoliday = checkIfTodayIsHoliday(+year, month, i);
    // find current day
    days.push({
      title: () => (
        <div className="attendance-table-header">
          <div
            className={
              // eslint-disable-next-line no-nested-ternary
              isCurrentDay(+year, month, i)
                ? 'current-day border-bottom attendance-header-block'
                : // eslint-disable-next-line no-nested-ternary
                isTodayAWeekend
                ? 'weekend-day border-bottom attendance-header-block'
                : isTodayAHoliday
                ? 'weekend-day border-bottom attendance-header-block'
                : 'border-bottom attendance-header-block'
            }
          >
            {i}
          </div>
          <AttendanceDetailLabel>{nameOfTheDayOfMonth[i - 1]}</AttendanceDetailLabel>
        </div>
      ),
      key: `leave${i}`,
      render: (employee: any) => {
        let hasAttendanceAndLeave = {
          attendance: false,
          holiday: false,
          weekend: false
        };
        const holidays = employee.leave[employee.leave.length - 1];

        // eslint-disable-next-line react/jsx-no-useless-fragment
        let textToBeDisplayed = <></>;

        // If there is no attendance record on the days that has already been passed: Holiday
        if (remainingDaysInCurrentMonth(+m, +year).includes(i)) {
          textToBeDisplayed = <UpcomingAttendance />;
        }
        if (!remainingDaysInCurrentMonth(+m, +year).includes(i)) {
          textToBeDisplayed = <UpcomingAttendance />;
        }
        // Find weekend of the current month and show weekend
        if (getWeekendsInMonth(+year, +m || 1).includes(i)) {
          // eslint-disable-next-line react/jsx-no-useless-fragment
          textToBeDisplayed = <div className="weekend-tr" />;
          hasAttendanceAndLeave = {
            ...hasAttendanceAndLeave,
            weekend: true
          };
        }

        holidays?.forEach((holiday: { date: string }) => {
          if (getLeaveDates(holiday.date, holiday.date).includes(i)) {
            textToBeDisplayed = <div className="holiday-tr" />;
            hasAttendanceAndLeave = {
              ...hasAttendanceAndLeave,
              holiday: true
            };
          }
        });

        getDaysFromAttendance(employee.attendance).forEach((att: number) => {
          if (att === i) {
            textToBeDisplayed = <FullDay />;
            hasAttendanceAndLeave = {
              ...hasAttendanceAndLeave,
              attendance: true
            };
          }
        });

        employee.leave.forEach((leave: any) => {
          if (Array.isArray(leave)) return;
          if (getLeaveDates(leave.start_date, leave.end_date).includes(i) && leave.leaveStatus.name === 'APPROVED') {
            switch (leave.shift) {
              case 'HALF_FIRST':
                textToBeDisplayed = <FirstHalf />;
                break;
              case 'HALF_SECOND':
                textToBeDisplayed = <SecondHalf />;
                break;
              default:
                textToBeDisplayed = <Leave />;
                hasAttendanceAndLeave = {
                  ...hasAttendanceAndLeave,
                  holiday: true
                };
                break;
            }
          }
        });

        if (hasAttendanceAndLeave.attendance && hasAttendanceAndLeave.weekend) {
          textToBeDisplayed = <div className="weekend-tr" />;
        }
        return (
          <Row
            onClick={() => handleCurrentUser(employee, i, textToBeDisplayed)}
            style={styles().styledTextToBeDisplayed as CSSProperties}
          >
            {textToBeDisplayed}
          </Row>
        );
      },
      responsive: ['sm'],
      fixed: 'top'
    });
  }
  return days;
};
export default getDaysInMonth;
