import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://desafio.liberfly.com.br/api/'

Vue.use({

	install(Vue) {
		Vue.prototype.$http = axios.create({
			baseURL: 'https://desafio.liberfly.com.br/api/',
			header: 'Access-Control-Allow-Origin = *'
		})

		Vue.prototype.$http.interceptors.request.use(config => {
			console.log(config.method)
			return config
		})
	}

})
