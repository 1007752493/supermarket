import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance1 = axios.create({
    //wechat search coderwhy,nine yuan for interface
    baseURL: '',
    timeout: 1000,
  })
  //axios的拦截器
  //请求拦截
  instance1.interceptors.request.use(
    (config) => {
      // console.log(config)
      return config
    },
    (err) => {
      console.log(err)
    }
  )
  //相应拦截
  instance1.interceptors.response.use(
    (res) => {
      // console.log(res)
      return res.data
    },
    (err) => {
      // console.log(err)
      return err.data
    }
  )

  // 发送真正的网络请求
  return instance1(config)
}