import axios from 'axios';
import http from 'utils/http';

/**
 * Simple REST resource class
 */

const { CancelToken } = axios;
let cancel: any;

class Resource {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  list(query?: any) {
    if (cancel) {
      cancel(); // cancel request
    }
    return http({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    });
  }

  get(id: any) {
    return http({
      url: `/${this.uri}/${id}`,
      method: 'get'
    });
  }

  store(resource: any, headers?: any) {
    return http({
      url: `/${this.uri}`,
      method: 'post',
      data: resource,
      headers
    });
  }

  update(id: any, resource: any) {
    return http({
      url: `/${this.uri}/${id}`,
      method: 'put',
      data: resource
    });
  }

  destroy(id: any) {
    return http({
      url: `/${this.uri}/${id}`,
      method: 'delete'
    });
  }
}

export default Resource;
