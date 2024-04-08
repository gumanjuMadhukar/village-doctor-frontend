import { ExemptionValueType } from './enums';

export const officeEmailValidation = (_rule: any, value: any) => {
  if (/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@diagonal.software/.test(value)) {
    return Promise.resolve();
  }
  if (/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@nextly.solutions/.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Provide office email'));
};

export const isNumeric = (_rule: any, value: any) => {
  if (/^[0-9]*$/.test(value)) {
    // allow numeric values, an empty string, or a minus sign
    return Promise.resolve();
  }
  return Promise.reject(new Error('Input must be numeric')); // reject if input is not numeric
};

export const formatDecimalPoint = (value: number): any => {
  if (!value && value !== 0) return;
  // eslint-disable-next-line consistent-return
  return Number(value).toFixed(2);
};

export const validatePercentage = (_rule: any, value: any, selectedTaxExemption: any) => {
  if (selectedTaxExemption?.exemptionValueType === ExemptionValueType.PERCENTAGE && Number(value) > 100) {
    return Promise.reject(new Error('Value cannot be greater than 100'));
  }
  return Promise.resolve();
};
