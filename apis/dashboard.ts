import http from "utils/http"

export const getInfoCardDetails = async ({queryKey }: {queryKey:any}) : Promise<any> => {
    const [, _data] = queryKey;

    const response = await http({
        url:'dashboard',
        method:'GET'
    });

    return response?.data;
}