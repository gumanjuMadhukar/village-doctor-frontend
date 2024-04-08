import http from "utils/http";


export const addNurseFollow = async (data: any): Promise<any[]> => {
    const response = await http({
      url: 'followup',
      method: 'post',
      data
    });
    return response?.data?.data;
  };