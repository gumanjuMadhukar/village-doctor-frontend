import http from 'utils/http';

export const addTest = async (data: any): Promise<any[]> => {
  const response = await http({
    url: 'requiredLab',
    method: 'post',
    data
  });

  return response?.data?.data;
};

export const getSelectLab = async () => {
  try {
    const response = await fetch('https://hms.bjrukin.com/items/api/item',{
      headers: {
        Accept: "application/json",
        'Authorization': 'Basic cHJvamVjdGFkbWluOnByMGozY3RwQCQkdzByZA=='
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch lab data: ${response.statusText}`);
    }

    return response.json();
  } catch (error:any) {
    throw new Error(`Failed to fetch lab data: ${error.message}`);
  }
};

export const createNewLabTest = async (data: any): Promise<any[]> => {
  const response = await http({
    url: '/lab',
    method: 'post',
    data
  });

  return response?.data?.data;
};
