import './assets/main.scss'

import { createApp } from 'vue'
import { registerPlugins } from './plugins'

import App from './App.vue'
import router from './router'

import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true });

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.mount('#app')
