import { Table } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

interface FilterParams {
  currentPage: number;
  pageSize: number;
  month?: number | string;
  year?: number | string;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

interface Props {
  columnList: any;
  data: any;
  filterParams: FilterParams;
  setFilterParams: Dispatch<SetStateAction<FilterParams>>;
  total: number;
  className?: string;
  scroll?: any;
}

export default function CustomTable({
  columnList,
  data,
  filterParams,
  setFilterParams,
  total,
  className,
  scroll
}: Props) {
  return (
    <Table
      className={className}
      columns={columnList}
      dataSource={data}
      scroll={scroll}
      pagination={{
        ...filterParams,
        defaultPageSize: filterParams.pageSize,
        total: total,
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
  );
}
