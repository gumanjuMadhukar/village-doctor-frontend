import http from 'utils/http';

export const createNewAppointment = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'appointment',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getAllAppointment = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  {
    const queryParams: any = {
      page: data.filterParams.currentPage,
      limit: data.filterParams.pageSize
    };

    if (data.filterParams.created_by) queryParams.created_by = data.filterParams.created_by;
    const response = await http({
      url: 'appointment',
      method: 'get',
      params: queryParams
    });

    return response.data;
  }
};

export const getUniqueUserAppointment = async (): Promise<any[]> => {
  const response = await http({
    url: 'getAppointmentUniqueUser',
    method: 'get'
  });

  return response?.data;
};

export const updateBulkAppointment = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'updateBulkAppointment',
    method: 'put',
    data
  });

  return response?.data?.data;
};
