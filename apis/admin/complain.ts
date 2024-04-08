import http from 'utils/http';

export const createNewComplaint = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'complaint',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getAllComplain = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  {
    const queryParams: any = {
      page: data.filterParams.currentPage,
      limit: data.filterParams.pageSize
    };
    if (data.filterParams.name) queryParams.name = data.filterParams.name;
    if (data.filterParams.category.length > 0) queryParams.category = data.filterParams.category;
    const response = await http({
      url: 'complaint',
      method: 'get',
      params: queryParams
    });
    return response.data;
  }
};

export const getComplaintCategory = async (): Promise<any[]> => {
  const response = await http({
    url: 'category',
    method: 'get'
  });
  return response?.data?.data;
};

export const getSelectComplain = async (): Promise<any> => {
  {
    const response = await http({
      url: 'complaint',
      method: 'get'
    });    
    return response.data;
  }
};
