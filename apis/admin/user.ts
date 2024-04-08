import http from 'utils/http';

export const createNewUser = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'user',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getAllUser = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  {
    const queryParams: any = {
      page: data.filterParams.currentPage,
      limit: data.filterParams.pageSize
    };

    const response = await http({
      url: '/user',
      method: 'get',
      params: queryParams
    });

    return response.data;
  }
};

export const getAllRoles = async (): Promise<any> => {
  {
    const response = await http({
      url: '/role',
      method: 'get'
    });

    return response.data;
  }
};
