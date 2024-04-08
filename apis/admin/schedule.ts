import { getCurrentMonth } from 'utils/DateFormat';
import http from 'utils/http';

export const createNewDoctorSchedule = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'schedule',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getAllSchedule = async ({ queryKey }: { queryKey: any }): Promise<any> => {
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
      url: '/schedule',
      method: 'GET',
      params: queryParams  
    });

    return response.data;
  }
};

export const getDoctorScheduleById = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const response = await http({
    url: `/schedule/${data}`,
    method: 'GET'
  });

  return response?.data?.data;
};

export const editDoctorSchedule = async (scheduleId: string, updatedData: any): Promise<any> => {
  try {
    const response = await http({
      url: `/schedule/${scheduleId}`,
      method: 'put', // or 'patch' depending on your API
      data: updatedData
    });

    return response?.data?.data;
  } catch (error) {
    console.error("Error editing schedule:", error);
    throw error;
  }
};
