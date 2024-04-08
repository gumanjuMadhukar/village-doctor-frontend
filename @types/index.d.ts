import { PaymentMethod } from 'utils/enums';

export type LoginPayload = {
  email: string;
  password: string;
};

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ResetPasswordPayload {
  userId: number;
  newPassword: string;
  confirmPassword: string;
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export interface ModalProps {
  handleCancel: () => void;
  isModalOpen: boolean;
  medical_record_id?: string;
}
export interface OPDDepFormCheck {
  dob:string;
  gender:string;
  selectedOption:any;
}

export interface ChartData 
{
  chartType?: string;
  chartTitle?: string;
  categories?: object;
  xAxisTitle?: string;
  yAxisTitle?: string;
  seriesData?:object;
  subTitle?: string;
  xAxis?: { };
}