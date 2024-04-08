import { getCurrentMonth } from 'utils/DateFormat';
import http from 'utils/http';

export const createMedicalRecord = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'medical-record',
    method: 'post',
    data
  });
  return response?.data;
};

export const getAllMedicalRecord = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  {
    const queryParams: any = {
      page: data.filterParams.currentPage,
      limit: data.filterParams.pageSize
    };
    queryParams.month = data.filterParams.month ? data.filterParams.month : getCurrentMonth().toString();
    if (data.filterParams.year) queryParams.year = data.filterParams.year;
    if (data.filterParams.search) queryParams.search = data.filterParams.search;
    queryParams.sortBy = 'NAME';
    if (data.filterParams.order) queryParams.order = data.filterParams.order;
    const response = await http({
      url: '/medical-record',
      method: 'get',
      params: queryParams
    });

    return response.data;
  }
};

export const viewDetailMedicalRecord = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/medical-record/${data}`,
    method: 'get'
  });

  return response?.data?.data;
};
