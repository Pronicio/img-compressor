import { createApp } from 'vue'
import App from './App.vue'

import DropZone from 'dropzone-vue';

createApp(App)
    .use(DropZone)
    .mount('#app')
