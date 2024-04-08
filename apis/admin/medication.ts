import http from 'utils/http';

export const createNewMedication = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'medication/bulk/store',
    method: 'post',
    data
  });

  return response?.data?.data;
};
