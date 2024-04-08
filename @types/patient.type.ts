import { Gender, Status } from 'utils/enums';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  reference: string;
  status: Status;
}

export interface Patients {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: Gender;
  age: number;
  blood_group: string;
  citizenship_no: string;
  contact_number: string;
  address: string;
  uuid: string;
  medical_records: number;
  latest_visit: Date;
}

export interface Doctor {
  id: string;
  salutation: string;
  first_name: string;
  last_name: string;
  Specialization: string;
  date_of_birth: string;
  nmc_number: string;
  contact_number: string;
  emergency_contact_number: string;
  gender: Gender;
  address: string;
  email: string;
}

export interface MedicalRecords {
  id: string;
  record_date: Date;
  notes: string;
  diagnosis: string;
  hopi: string;
}

export interface Vitals {
  id: string;
  blood_pressure: string;
  pulse: string;
  temperature: string;
  respiration: string;
  saturation: string;
}

export interface Appointment {
  id: string;
}

export interface OPDDepFormCheck1 {
  dob:string;
  gender:string;
  selectedOption:any;
}