import Cookies from 'js-cookie';

import { Roles } from './enums';

export const isAdmin = () => {
  return Cookies.get('role') === Roles.ADMIN || Cookies.get('role') === Roles.SUPERADMIN;
};

export const isSuperAdmin = () => {
  return Cookies.get('role') === Roles.SUPERADMIN;
};
