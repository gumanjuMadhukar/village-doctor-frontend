import { DownOutlined, ManOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logout from 'services/auth';
import { getInitials } from 'utils/helpers';

const { useToken } = theme;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="/employee/my-profile">
        <ManOutlined /> My Profile
      </Link>
    )
  },
  {
    key: '2',
    label: (
      <Typography.Link onClick={logout}>
        <PoweroffOutlined /> Logout
      </Typography.Link>
    )
  }
];

const DropdownMenu = () => {
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: '8px'
  };

  const menuStyle = {
    boxShadow: 'none',
    fontWeight: '600',
    fontSize: '14px',
    justifyContent: 'space-between'
  };

  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    setName(getInitials());
  }, []);

  const renderMenu = (menu: React.ReactElement) => {
    return <div style={contentStyle}>{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}</div>;
  };
  return (
    <Dropdown
      menu={{ items }}
      overlayStyle={{ padding: '10px' }}
      dropdownRender={menu => renderMenu(menu as React.ReactElement)}
    >
      <Typography.Text>
        <Space>
          <Avatar
            size="large"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              boxShadow: '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
              fontWeight: '600',
              fontSize: '18px',
              marginLeft: '10px'
            }}
          >
            {name}
          </Avatar>
          <DownOutlined />
        </Space>
      </Typography.Text>
    </Dropdown>
  );
};

export default DropdownMenu;
