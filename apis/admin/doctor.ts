import { getCurrentMonth } from 'utils/DateFormat';
import http from 'utils/http';

export const createNewDoctor = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'doctor',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response?.data?.data;
};

export const getAllDoctor = async ({ queryKey }: { queryKey: any }): Promise<any> => {
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
      url: '/doctor',
      method: 'get',
      params: queryParams
    });

    return response.data;
  }
};

export const getDoctorById = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/doctor/${data}`,
    method: 'get'
  });

  return response?.data?.data;
};

export const getDoctorList = async (): Promise<any[]> => {
  const response = await http({
    url: `/doctors/list`,
    method: 'get'
  });

  return response?.data?.data;
};

export const getDoctorAll = async (): Promise<any[]> => {
  const response = await http({
    url: `/doctors/all`,
    method: 'get'
  });

  return response?.data?.data;
};
