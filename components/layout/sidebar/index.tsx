/* eslint-disable @next/next/no-img-element */

import { MenuOutlined, PhoneOutlined } from '@ant-design/icons';
import { Affix, Image, Layout, Menu, theme } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import React, { createElement, ReactElement, useState } from 'react';
import { EmergencyBtn } from 'styles/styled/PageHeader';
import Clock from 'utils/clock';
import { Roles } from 'utils/enums';
import { getDefaultOpenKeys } from 'utils/helpers';

import urls from '../../../configs/urls';
import DropdownMenu from '../dropdown-menu';

const { Header, Content, Sider } = Layout;

type Props = {
  role: string | null | undefined;
  children: React.ReactNode;
};

type routeItemProp = {
  title: string;
  path?: string | undefined;
  icon?: any;
  key?: string;
  children?: routeItemProp[];
};

type MenuItem = {
  label: string;
  key: string;
  icon?: ReactElement;
  children?: MenuItem[];
  path?: string;
  onClick?: any;
};

const items: (router: NextRouter, navItems: routeItemProp[], isChild?: boolean) => MenuItem[] = (
  router,
  navItems,
  isChild = false
) =>
  navItems.map(ni => {
    const key = ni.title;
    const isSelected = ni.path === router.pathname;
    const hasChildren = !!ni?.children;
    const className = isChild ? 'navbar-child-item' : 'navbar-parent-item';
    return {
      label: ni.title,
      ...(ni.path && { onClick: () => ni.path && router.push(ni.path) }),
      icon:
        ni.icon &&
        createElement(ni.icon, {
          style: { width: 25, fontSize: 18 }
        }),
      key,
      // eslint-disable-next-line no-nested-ternary
      className: `${className} ${isSelected ? (isChild ? 'navbar-item-selected-child' : 'navbar-item-selected') : ''}`,
      ...(hasChildren && {
        children: ni.children && items(router, ni?.children, true)
      })
    };
  });

const handleEmergencyCall = () => {
  // Replace 'YOUR_GOOGLE_MEET_LINK' with the actual Google Meet meeting link
  const googleMeetLink =
    'https://teams.microsoft.com/l/meetup-join/19:WALCM-gVl0m33Z6ZjDZlMCN1wxR_9_r9ybOQCttxXbg1@thread.tacv2/1704953954384?context=%7B%22Tid%22:%22de068237-720a-46ba-aed1-92facc6c9e7d%22,%22Oid%22:%227f8e71c5-44f6-42df-a2ca-4e2db3d7e262%22%7D';
  // Open the Google Meet meeting link in a new tab
  window.open(googleMeetLink, '_blank');
};
const SidebarLayout = ({ role, children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const router = useRouter();

  const navItems: routeItemProp[] = role
    ? [
        ...(urls?.commonNavItems || []).filter(item => item.title !== 'Holiday'), // filter out Holiday item
        ...(role === Roles.ADMIN || role === Roles.SUPERADMIN
          ? urls.nurseAdminNavItems
          : role === Roles.WARDADMIN
          ? urls.wardAdminNavItems
          : role === Roles.DOCTOR
          ? urls.doctorNavItems
          : []),
        ...(urls?.commonNavItems?.filter(item => item.title === 'Holiday') || [])
      ]
    : [];

  const defaultOpenKeys = getDefaultOpenKeys(router.pathname);

  return (
    <Layout hasSider style={{ display: 'flex', height: '100vh' }}>
      <Sider
        className="sider"
        width={246}
        // breakpoint="md"
        trigger={null}
        collapsible
        collapsed={collapsed}
        // onBreakpoint={broken => {
        //   setCollapsed(broken);
        // }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          transition: 'all 0.2s'
        }}
      >
        <div
          style={{
            display: 'grid',
            padding: '14px 20px 0px 20px'
          }}
        >
          {collapsed ? (
            ''
          ) : (
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              {' '}
              <Image src="/logo/logo.png" preview={false} alt="Village Doctor" style={{ height: '65px' }} />
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={collapsed ? { paddingRight: '10px' } : { paddingRight: '0' }}
          selectedKeys={navItems
            .filter(
              it =>
                it.path === router.pathname ||
                (router.pathname.includes('holiday') &&
                  it.path?.includes('holiday') === router.pathname.includes('holiday'))
            )
            .map(it => it.title)}
          items={items(router, navItems)}
          defaultOpenKeys={defaultOpenKeys}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={
          collapsed ? { marginLeft: 80, transition: 'margin 0.2s' } : { marginLeft: 246, transition: 'margin 0.2s' }
        }
      >
        <Affix offsetTop={0}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              top: 0,
              paddingRight: '25px',
              paddingLeft: '25px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: ' 0px 0px 4px rgba(0, 0, 0, 0.2)',
              height: '56px'
            }}
          >
            {React.createElement(MenuOutlined, {
              className: 'trigger',
              style: { cursor: 'pointer' },
              onClick: () => (window.innerWidth > 768 ? setCollapsed(!collapsed) : setCollapsed(true))
            })}

            <div style={{ right: 0, textAlign: 'right' }}>
              <EmergencyBtn icon={<PhoneOutlined />} onClick={handleEmergencyCall} style={{ marginRight: '30px' }}>
                Emergency Call
              </EmergencyBtn>
              <span
                style={{
                  marginRight: '20px',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                <Clock />
              </span>
              <DropdownMenu />
            </div>
          </Header>
        </Affix>
        <Content style={{ minHeight: '100vh' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
