import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import {router} from './router'
import './permission'

import pinia from './store'
import 'animate.css'
import i18n from './utils/i18n'



import * as ElementPlusIconsVue from '@element-plus/icons-vue'






const app=createApp(App)



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  
app.use(pinia)

app.use(i18n)




app.use(router)



app.mount('#app')