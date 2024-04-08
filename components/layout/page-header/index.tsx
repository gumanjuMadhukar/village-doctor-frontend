import { LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';

import RoleLayout from '../role-layout';

const PageHeaderNaviagtion = styled.div`
  background: #fff;
  padding: 5px 20px;
  padding-bottom: 0px !important;
`;

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    text-transform: Capitalize;
  }
`;

const SecondBtn = styled(Button)`
  background: ${Colors.COLOR_PRIMARY_BG};
  boxshadow: none;
  color: ${Colors.WHITE};
  &:hover {
    border-color: ${Colors.COLOR_PRIMARY_BG} !important;
    color: ${Colors.WHITE} !important;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const InitialBtn = styled(Button)`
  background: ${Colors.COLOR_PRIMARY_BG};
  boxshadow: 'none';
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
  color: gray;
  &:hover {
    color: #333; /* Darker color */
  }
`;

interface BreadcrumbItem {
  name: string;
  link: string;
}

interface Props {
  items?: BreadcrumbItem[];
  titleContent: string;
  buttonLabel?: string;
  buttonCb?: () => void;
  icon?: ReactNode;
  secondButtonLabel?: string;
  secondButtonCb?: () => void;
  secondButtonIcon?: ReactNode;
  buttonRoleConstraint?: boolean;
  role?: string;
  goBack?: boolean;
  link?: string;
}

const PageHeader = ({
  items,
  buttonLabel,
  titleContent,
  buttonCb,
  icon,
  secondButtonCb,
  secondButtonIcon,
  secondButtonLabel,
  buttonRoleConstraint,
  role,
  goBack,
  link
}: Props) => {
  const router = useRouter();

  const onButtonClick = () => {
    if (link) router.push(link);
    else if (buttonCb) buttonCb();
  };

  const getButton = () => (
    <InitialBtn
      style={{
        background: Colors.COLOR_PRIMARY_BG,
        boxShadow: 'none',
        marginBottom: '20px'
      }}
      type="primary"
      icon={icon || ''}
      onClick={onButtonClick}
    >
      {buttonLabel}
    </InitialBtn>
  );
  return (
    <PageHeaderNaviagtion>
      {items && items.length > 0 && (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard">Home</Link>
          </Breadcrumb.Item>
          {items.map((item: BreadcrumbItem, index: number) => {
            return (
              <Breadcrumb.Item key={item.name}>
                <span
                  style={{
                    color: index + 1 === items?.length ? Colors.BLACK : 'inherit'
                  }}
                >
                  {item?.link ? <Link href={item?.link}>{item.name}</Link> : item.name}
                </span>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}

      <TitleContent>
        <h2>
          {goBack && (
            <StyledLeftCircleOutlined
              onClick={() => {
                router.back();
              }}
            />
          )}{' '}
          {titleContent}
        </h2>
        <Space>
          {buttonLabel && (buttonRoleConstraint ? <RoleLayout role={role}>{getButton()}</RoleLayout> : getButton())}
          {secondButtonLabel && (
            <SecondBtn icon={secondButtonIcon || ''} onClick={() => secondButtonCb && secondButtonCb()}>
              {secondButtonLabel}
            </SecondBtn>
          )}
        </Space>
      </TitleContent>
    </PageHeaderNaviagtion>
  );
};

PageHeader.defaultProps = {
  buttonLabel: '',
  buttonCb: () => null,
  icon: null,
  secondButtonLabel: '',
  secondButtonCb: () => null,
  secondButtonIcon: null,
  buttonRoleConstraint: false,
  role: '',
  goBack: false
};

export default PageHeader;
