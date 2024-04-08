export enum LeaveActionMenu {
  APPROVE = 'APPROVE',
  DECLINE = 'DECLINE',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export enum LeaveStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export enum Roles {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SUPERADMIN = 'super-admin',
  WARDADMIN = 'ward-admin',
  DOCTOR = 'doctor'
}

export enum Leaves {
  SICK = 'Sick',
  CASUAL = 'Casual'
}

export enum SettingItems {
  FISCALYEAR = 'fiscal-year',
  REBATE = 'rebate',
  EXEMPTION = 'exemption',
  TAXSLAB = 'tax-slab',
  LEAVETYPE = 'leave-type',
  COMPANYDETAILS = 'company-details',
  WARD = 'ward',
  ROLESETTING = 'role',
  DESIGNATIONSETTING = 'designation'
}

export enum ButtonState {
  CREATE = 'CREATE',
  DISABLED = 'DISABLED',
  VIEW = 'VIEW'
}

export enum PaymentMethod {
  BANKTRANSFER = 'Bank Transfer',
  BANKREMITTANCE = 'Bank Remittance',
  CASH = 'Cash',
  CHEQUE = 'Cheque'
}

export enum ExemptionType {
  INSURANCE = 'INSURANCE',
  SAVING = 'SAVING',
  REBATE = 'REBATE'
}

export enum ExemptionValueType {
  AMOUNT = 'AMOUNT',
  PERCENTAGE = 'PERCENTAGE'
}

export enum SalaryType {
  MONTHLYSALARY = 'monthly_salary',
  ANNUALSALARY = 'annual_salary'
}

export enum SettingsList {
  GENERAL = 'general',
  EMPLOYEE = 'employee',
  PAYROLL = 'payroll',
  LEAVE = 'leave'
}

export enum EmployeeStatus {
  PREVIEW = 'Preview',
  ACTIVATE = 'Activate',
  DEACTIVATE = 'Deactivate'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE'
}
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'in-active'
}
