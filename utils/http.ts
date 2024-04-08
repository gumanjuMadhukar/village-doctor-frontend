import axios, { AxiosInstance } from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
// import jwt from 'jwt-decode';
/**
 * Http Utility.
 */
export const setTokenInHeader = (ax: AxiosInstance, token: any) => {
  // eslint-disable-next-line no-param-reassign
  ax.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const labUrl = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_LAB_URL,
  // headers:{
  //   'Content-Type': 'application/json'
  // },
  withCredentials: true,
})
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // withCredentials: true
  }
});

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('role');
  Cookies.remove('refresh-token');
  if (window) {
    window.location.reload();
  }
};
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      logout();
      return null;
    }
    return Promise.reject(error);
  }
);

setTokenInHeader(http, getCookie('token'));
export default http;
