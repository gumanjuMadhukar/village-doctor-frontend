import { PaymentMethod } from 'utils/enums';

export interface EmployeeFullDetails {
  employee: EmployeeDetails;
  salary: any;
  leaves: any;
}

export interface EmployeeDetails {
  payment_method: PaymentMethod;
  id: string;
  name: string;
  fathers_name: string;
  address: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  cit_number: string;
  citizenship_number: string;
  designation: Designation;
  dob: string;
  emergency_contact: string;
  gender: string;
  joined_date: string;
  marital_status: boolean;
  mothers_name: string;
  nationality: Nationality;
  pan_number: string;
  permanent_address: string;
  phone_number: string;
  profile_picture: string;
  user: User;
}

export interface Designation {
  id: string;
  name: string;
}

export interface Nationality {
  id: string;
  country: string;
  nationality: string;
}

export interface User {
  username: string;
  email: string;
}

export interface InsuranceDataEmployee {
  id: string;
  name: string;
  annual_total: string;
}

export interface OPDDepFormCheck {
  dob:string;
  gender:string;
  selectedOption:any;
}