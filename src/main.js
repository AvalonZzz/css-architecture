import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mui from '@/components/index'
import 'normalize.css/normalize.css'
import './style/index.scss'
import 'lib-flexible/flexible'
import '@icon-park/vue-next/styles/index.css'
import '@/mock' // mock数据

const app = createApp(App)
app.use(store).use(router).use(Mui).mount('#app')
console.log(app)
