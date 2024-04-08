import { ClockCircleOutlined, FormOutlined, HomeOutlined, ScheduleOutlined, SnippetsOutlined, UsergroupAddOutlined,UserOutlined } from '@ant-design/icons';

const urls = {
  login: '/auth/login-new',
  forgotPassword: '/auth/forgot-pw',
  register: '/auth/register',
  changePassword: 'auth/change-password',
  uuid: '/patient',
  commonNavItems: [
    {
      title: 'Dashboard / ड्यासबोर्ड',
      path: '/dashboard',
      icon: HomeOutlined
    }
  ],
  nurseAdminNavItems: [
    {
      title: 'Doctors',
      path: '/nurse/doctor',
      icon: UserOutlined
    },
    {
      title: 'Patient',
      path: '/nurse/patient',
      icon: UsergroupAddOutlined
    },
    {
      title: 'Schedule',
      path: '/nurse/schedule',
      icon: ScheduleOutlined
    },
    {
      title: 'Appointment',
      path: '/nurse/appointment',
      icon: ClockCircleOutlined
    },
    {
      title: 'Complain',
      path: '/nurse/complain',
      icon: SnippetsOutlined
    },
    {
      title: 'Follow Up',
      path: '/nurse/followup',
      icon: FormOutlined,
    },
    {
      title: 'Users',
      path: '/nurse/user',
      icon: UserOutlined
    }
  ],
  wardAdminNavItems: [
    {
      title: 'OPD / ओ.पी.डी',
      path: '/ward/opd',
      icon: ClockCircleOutlined
    },
    {
      title: 'Patient / बिरामी',
      path: '/ward/patients',
      icon: UserOutlined
    },
    {
      title:'Lab Report',
      path:'/ward/lab-report',
      icon: SnippetsOutlined
    }
  ],
  doctorNavItems: [
    {
      title: 'Appointment / सूची',
      path: '/doctor/appointment',
      icon: ClockCircleOutlined
    },
    {
      title: 'Patients / सूची',
      path: '/doctor/patient',
      icon: UserOutlined
    }
  ]
};

export default urls;
