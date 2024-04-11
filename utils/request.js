import showMsg from './showMsg.js'
//配置基础地址
const BASE_URL = 'https://www.uinav.com'

//默认请求头 
const acquiesceContenttype = 'application/x-www-form-urlencoded'

export default {
	config: {
		// 请求拦截器
		beforeRequest(options = {}) {
      uni.showLoading({
        title:"加载中……",
        mask:true
      })
			// console.log('请求拦截器', options)
			return new Promise((resolve, reject) => {
				options.url = BASE_URL + options.url;
				options.method = options.method || 'GET';
				options.data = options.data;
				options.timeout = options.timeout || 60000; //接口请求超时时间设置
				// 请求头携带参数
				options.header = {
					'Content-Type': options.responseType ? options.responseType : acquiesceContenttype,
				}
				resolve(options)
			})
		},
		// 响应拦截器
		handleResponse(data) {
			return new Promise((resolve, reject) => {
				const [err, res] = data;
				// console.log('响应拦截器', err, res)
				if (err) {
					console.log('接口请求超时', err)
					return reject(err);
				} else if (res) {
					if ( res.data.meta.status === 200) {
						//接口正常
            uni.hideLoading()
						return resolve(res.data);
					} else {
						//接口其他状态码
            showMsg()
            // uni.showToast({
            //   title:"数据请求失败！",
            //   duration:1500,
            //   icon:'none'
            // })
						return reject(res.data)
					}
				}
			})
		},
	},
	// request 请求
	request(options = {}) {
		return this.config.beforeRequest(options).then(opt => {
      return uni.request(opt)
		}).then(res => {
			return this.config.handleResponse(res)
		})
	}
}
