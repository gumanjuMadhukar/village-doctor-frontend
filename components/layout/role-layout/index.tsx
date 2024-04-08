import React, { ReactNode } from 'react';
import { Roles } from 'utils/enums';

interface Iprops {
  role: string | undefined;
  children: ReactNode;
}

const RoleLayout = ({ role, children }: Iprops) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return role === Roles.ADMIN || role === Roles.SUPERADMIN ? <>{children}</> : null;
};

export default RoleLayout;
