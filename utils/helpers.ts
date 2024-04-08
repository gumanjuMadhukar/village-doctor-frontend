/* eslint-disable consistent-return */
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export const showTagColor = (name: string) => {
  if (name === 'APPROVED') {
    return 'green';
  }
  if (name === 'PENDING') {
    return 'blue';
  }
  if (name === 'REJECTED') {
    return 'red';
  }
  return 'blue';
};

export const imageFullPath = (imageUrl: string | undefined, placeholderImage: string) => {
  return imageUrl ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}` : placeholderImage;
};

export const getTextCapitilize = (str: string) => {
  if (!str) return;
  const lowerCase = str.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

export const getInitials = () => {
  const fullName = Cookies.get('username');
  if (!fullName) return;
  const nameArray = fullName.split(' ');
  const firstName = nameArray[0];
  const lastName = nameArray[nameArray.length - 1];
  const initials = firstName.charAt(0) + lastName.charAt(0);
  return initials.toUpperCase();
};
export const getUserName = () => {
  const fullName = Cookies.get('username');
  return fullName;
}

export const getDefaultOpenKeys = (pathname: string) => {
  if (pathname.includes('payroll')) {
    return ['Payroll'];
  }
  return [];
};

export const truncateText = (text: string) => {
  if (text.length > 12) {
    return `${text.substring(0, 12)}...`;
  }
  return text;
};

export const capitalize = (text: string) => {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  const words = text.split(' ');

  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return capitalizedWords.join(' ');
};

export function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export const calculateAge = (dateOfBirth: string) => {
  const dob = dayjs(dateOfBirth);
  const today = dayjs();
  return today.diff(dob, 'year');
};
export const calculateAgeYM = (dateOfBirth: string) => {
  const dob= dayjs(dateOfBirth);
  const today = dayjs();
  const years = today.diff(dob, 'year');
  dob.add(years, 'year');
  const months = today.diff(dob, 'month');
  const remainingMonths = months - (years * 12);
  return remainingMonths;
}

export const handleOpenPrintWindow = () => {
  // Open a new window when the button is clicked
  const printWindow = window.open("/printInfo", "_blank");
  // Check if the window opened successfully
  if (printWindow) {
    printWindow.focus();
  }
};

