import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { formatDecimalPoint } from 'utils';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateTotalDuration = (inAt: string, outAt: string) => {
  return dayjs(inAt).from(outAt).split('ago');
};
// Add two times in hh:mm format
export function addTimes(durations: string[]) {
  //   let durations = ['00:08:07', '01:05:32', '00:15:19'];
  let totalSeconds = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < durations.length; i++) {
    const [h, m, s] = durations[i].split(':').map(x => parseInt(x, 10));
    totalSeconds += h * 3600 + m * 60 + s;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
  return result;
}

export const calculateDifferenceBetweenTwoDates = (endDate: Date, startDate: Date, shift: string) => {
  const shiftToDays = shift.includes('HALF_') ? 0.5 : 1;
  const daysDiff = dayjs(endDate).diff(startDate, 'days') + 1;
  const fullWeeks = Math.floor(daysDiff / 7);
  const remainingDays = daysDiff % 7;
  const weekendDays = remainingDays > 0 ? Math.min(remainingDays, 1) : 0; // exclude up to 2 weekend days
  const totalDays = fullWeeks * 5 + (remainingDays - weekendDays);
  return totalDays === 0 ? shiftToDays : totalDays * shiftToDays;
};

export const fetchAllMonths = () => [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 }
];

export const fetchAllMonthBasedOnValue = (id: number) => {
  switch (id) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'January';
  }
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 4; i++) {
    years.push({ label: currentYear - i, value: currentYear - i });
  }
  return years;
};

export const getLeaveDates = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  while (start <= end) {
    dates.push(start.getDate());
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

export const getWeekendsInMonth = (year: number, month: number) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, -1);
  const weekends = [];

  while (start <= end) {
    if (start.getDay() === 6) {
      weekends.push(start.getDate());
    }
    start.setDate(start.getDate() + 1);
  }

  return weekends;
};

export const remainingDaysInCurrentMonth = (m: number, year: number) => {
  const currentDate = new Date();
  if (m !== currentDate.getMonth() + 1 || year !== currentDate.getFullYear()) {
    return [];
  }

  const daysInMonth = new Date(year, m, 0).getDate();
  const days = [];
  // eslint-disable-next-line no-plusplus
  for (let i = currentDate.getDate(); i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

export const getDaysFromAttendance = (arr: [{ check_in: string }]) => {
  const days: any = [];
  arr.forEach(obj => {
    const checkIn = new Date(obj.check_in);
    const day = checkIn.getUTCDate();
    days.push(day);
  });
  return days;
};

export function calculateLogs(logs: any) {
  let totalSeconds = 0;
  logs.forEach((log: any) => {
    if (log.duration) {
      const [h, m, s] = log.duration.split(':').map((x: any) => parseInt(x, 10));
      totalSeconds += h * 3600 + m * 60 + s;
    }
  });

  const hours = totalSeconds / 3600;

  return `${formatDecimalPoint(hours)} hours`;
}

export const getNameOfTheDayOfMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const dayName = date.toLocaleString('en-US', { weekday: 'short' });
    days.push(dayName);
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const isCurrentDay = (year: number, month: number, day: number) => {
  const inputDate = new Date(year, month - 1, day); // month is zero-indexed in Date constructor
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set time to midnight

  if (inputDate.getTime() === currentDate.getTime()) {
    return true;
  }
  return false;
};

export const getUserTimezone = () => {
  const userTimezone = dayjs().tz(dayjs.tz.guess()).format('Z');
  return userTimezone?.replace(':', '.');
};

export const getUserTimezonePlace = () => {
  return dayjs.tz.guess();
};

export const calculateAvaiableDay = (allLeaves: any, allocatedLeaves: any) => {
  const remainingDays = allLeaves - allocatedLeaves;
  return remainingDays;
};

export const formatDateISOString = (dateString: string): string => {
  const date = dayjs(dateString, 'YYYY-MM-DD');
  const isoString = date.toISOString();
  const zeroOffsetISOString = isoString.replace('Z', '+00:00');
  return zeroOffsetISOString;
};

export const disabledPastTime = () => {
  const currentDayJs = dayjs();
  const currentHour = currentDayJs.hour();
  const currentMinute = currentDayJs.minute();

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < currentHour; i++) {
      hours.push(i);
    }
    return hours;
  };

  const disabledMinutes = (selectedHour: any) => {
    if (selectedHour === currentHour) {
      const minutes = [];
      for (let i = 0; i < currentMinute; i++) {
        minutes.push(i);
      }
      return minutes;
    }
    return [];
  };

  return {
    disabledHours,
    disabledMinutes
  };
};
