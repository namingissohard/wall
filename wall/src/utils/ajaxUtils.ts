import axios from 'axios';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export function get<T>(url: string, data?: object): Promise<any>{
    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch(err => {
        console.log(err)
    })
}
export function post(url: string, data?: object): Promise<any>{
    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
    .catch(err => {
        console.log(err)
    })
}