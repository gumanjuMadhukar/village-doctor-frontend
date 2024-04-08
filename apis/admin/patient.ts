// import { getCurrentMonth } from 'utils/DateFormat';
import { getCurrentMonth } from 'utils/DateFormat';
import http from 'utils/http';

export const createNewPatient = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'patients',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getPatientDetailsForSelect = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const queryParams: any = {
    page: data.filterParams.currentPage,
    limit: data.filterParams.pageSize
  };

  if (data.filterParams.search) queryParams.keyword = data.filterParams.search;

  const response = await http({
    url: `/patient/select`,
    method: 'GET',
    params: queryParams
  });

  return response?.data?.data;
};

export const getAllPatient = async ({ queryKey }: { queryKey: any }): Promise<any> => {
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
      url: '/patients',
      method: 'get',
      params: queryParams
    });

    return response.data;
  }
};

export const getPatientById = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/patients/${data}`,
    method: 'get'
  });
  return response?.data?.data;
};

export const getPatientWithUUID = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/patient/QRScan/${data}`,
    method: 'get'
  });

  return response?.data?.data;
};

export const getFamilyHead = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/family-head/${data}`,
    method: 'get'
  });

  return response?.data?.data;
};

export const getAddress = async (): Promise<any> => {
  const response = await http({
    url: `/address`,
    method: 'get'
  });

  return response?.data;
};
