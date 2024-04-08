import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';
import { formatDecimalPoint } from 'utils';

const day = dayjs();
dayjs.extend(utc);
dayjs.extend(duration);

export const DateFormat = (date: any): string => {
  if (!date) return date;
  return moment(date).format('MMM DD, YYYY');
};
export const DateFormatDDMM = (date: any): string => {
  if (!date) return date;
  return moment(date).format('DD.MM');
};

export const DateTimeFormat = (date: any): string => {
  if (!date) return date;
  return moment(date).format('DD.MM.YYYY, HH:mm');
};

export const DateFormatYMD = (date: any): string => {
  if (!date) return date;
  return moment(date).format('YYYY-MM-DD');
};

export const DateFormatFromNow = (date: Date): string => {
  if (!date) return date;
  return moment(date).fromNow();
};

export const TimeFormatHMM = (date: any): string => {
  if (!date) return date;
  return moment(date).format('h:mm A');
};

export const SecondIntoHours = (second: any): any => {
  if (!second || second === null) return 0;
  const hour = day.add(second, 'second').diff(day, 'hour', true);
  return formatDecimalPoint(hour);
};

export const convertSecondIntoHMMSS = (second: any): any => {
  if (!second) return second;
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const remainingSeconds = second % 60;
  const time = `${hours}h.${minutes}m.${remainingSeconds}s`;
  return time;
};
export const getCurrentYear = (): number => {
  return dayjs().year();
};

export const getCurrentMonth = (): number => {
  return moment().month() + 1;
};

export const DateFormatMonthNameYear = (date: any): string => {
  if (!date) return date;
  return moment(date).format('MMMM YYYY');
};

export const DateFormatDayMonthHalfNameYear = (date: any): string => {
  if (!date) return date;
  return moment(date).format('D MMM YYYY');
};

export const DateFormatDay = (date: any): string => {
  if (!date) return date;
  return moment(date).format('DD');
};

export const DateFormaMonthHalfNameYear = (date: any): string => {
  if (!date) return date;
  return moment(date).format('MMM YYYY');
};

export const DateFormaMonthFullNameYear = (date: any): string => {
  if (!date) return date;
  return moment(date).format('MMMM YYYY');
};

export const TimeFormat = (time: any): string => {
  if (!time) return time;
  return moment(time).format('HH:mm:ss A');
};

export const formatTimes = (time: any): string => {
  if (!time) return time;
  return moment(time).format('HH:mm:ss');
};

export const currentTime = (): string => {
  return moment().format('HH:mm:ss');
};

export const calculateDuration = (time: any) => {
  const startTime = moment(time).utc();
  const endTime = moment();
  const durationValue = moment.duration(endTime.diff(startTime));

  const formattedDuration = moment.utc(durationValue.asMilliseconds()).format('HH:mm:ss');

  return formattedDuration;
};

export const UTCTimeFormatHMM = (date: any): string => {
  if (!date) return date;
  return dayjs.utc(date).format('h:mm A');
};

export const UTCDateFormat = (date: any): string => {
  if (!date) return date;
  return dayjs.utc(date).format('MMM DD, YYYY');
};

export const UTCDateFormatYMD = (date: any): string => {
  if (!date) return date;
  return dayjs.utc(date).format('YYYY-MM-DD');
};
