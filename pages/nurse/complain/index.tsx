import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllComplain, getComplaintCategory } from 'apis/admin/complain';
import PageHeader from 'components/layout/page-header';
import AddComplainModal from 'components/opd/Modal/AddComplainModal';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';

const HeaderItems = [
  {
    name: 'Complain',
    link: ''
  }
];

interface FilterParams {
  currentPage: number;
  pageSize: number;
  name: string;
  category: [];
}

const complainListColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <div>{text}</div>,
    align: 'center'
  },
  {
    title: 'Category',
    key: 'id',
    render: (_text, record) => (
      <div className="center">
        {record?.category?.map((complain: any) => {
          return (
            <Tag color="blue" key={complain?.id}>
              {complain?.name}
            </Tag>
          );
        })}
      </div>
    ),
    align: 'center'
  }
];

const Complain = () => {
  const [createDoctorModalOpen, setCreateDoctorModalOpen] = useState(false);
  const [form] = Form.useForm();

  const openCloseModal = () => {
    setCreateDoctorModalOpen(!createDoctorModalOpen);
  };

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    name: '',
    category: []
  });

  const { data: categoryList } = useQuery(['complainCategory'], getComplaintCategory);

  const categoryOption = categoryList?.map((category: any) => {
    return {
      label: category.name,
      value: category.id
    };
  });
  const onFinish = (data: any) => {
    setFilterParams({
      ...filterParams,
      name: data?.name,
      category: data?.category_id
    });
  };

  const handleReset = () => {
    setFilterParams({
      ...filterParams,
      name: '',
      category: []
    });
  };

  const { data: complainList } = useQuery(['complainCategory', { filterParams }], getAllComplain);
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Complain List"
          icon={<PlusOutlined />}
          buttonLabel="Add Complain"
          buttonCb={openCloseModal}
        />
      </PageHeaderWrapper>
      <SearchBar>
        <Form
          onFinish={onFinish}
          form={form}
          style={{ justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px' }}
        >
          <Row>
            <Col lg={9} xs={24} md={9}>
              <Form.Item name="name">
                <Input style={{ width: '90%' }} placeholder="Search By Name" />
              </Form.Item>
            </Col>
            <Col lg={9} xs={24} md={9}>
              <Form.Item name="category_id">
                <Select
                  mode="multiple"
                  style={{ width: '90%' }}
                  placeholder="Select Category"
                  optionLabelProp="label"
                  options={categoryOption}
                />
              </Form.Item>
            </Col>
            <Col lg={3} xs={24} md={3}>
              <Button type="primary" style={{ boxShadow: 'none', width: '90%' }} htmlType="submit">
                Search
              </Button>
            </Col>
            <Col lg={3} xs={24} md={3}>
              <Button danger style={{ boxShadow: 'none', width: '90%' }} onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </SearchBar>

      <TableBodyContainer style={{ minHeight: '100vh' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col span={24}>
            <Table
              className="complainTable"
              columns={complainListColumns}
              dataSource={complainList?.data}
              scroll={{ x: 1000 }}
              pagination={{
                ...filterParams,
                defaultPageSize: filterParams.pageSize,
                total: complainList?.meta?.total,
                hideOnSinglePage: true,
                showSizeChanger: true,
                current: +filterParams.currentPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page, pageSize) => {
                  setFilterParams({
                    ...filterParams,
                    currentPage: page,
                    pageSize
                  });
                }
              }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
      <AddComplainModal
        handleCancel={openCloseModal}
        isModalOpen={createDoctorModalOpen}
        categoryOption={categoryOption}
      />
    </div>
  );
};

export default Complain;
