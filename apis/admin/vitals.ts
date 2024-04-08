import http from 'utils/http';

export const addVitals = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'vital',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getVitalDataOfToday = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;

  const response = await http({
    url: `/patient/vitals/${data.selectedOption}`,
    method: 'GET'
  });

  return response?.data;
};
