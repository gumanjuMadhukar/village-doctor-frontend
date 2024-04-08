import http from 'utils/http';

export const addAllergies = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'allergies',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getAllergiesOfPatient = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;

  const response = await http({
    url: `/allergies/${data.selectedOption}`,
    method: 'GET'
  });

  return response?.data;
};
