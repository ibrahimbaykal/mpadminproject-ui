import { request } from 'umi';

export async function userList(options) {
  return request('/api/1.0/users', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function addUser(params,options) {
  return request('/api/1.0/users', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
  export async function roleList(options) {
    return request('/api/1.0/roles', {
      method: 'GET',
      ...(options || {}),
    });
}
  export async function addRole(params,options) {
  return request('/api/1.0/role', {
    method: 'POST',
    data:params,
    ...(options || {}),
  });
}
