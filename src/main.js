import './assets/styles.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEdit, faTrash)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
app.use(Toast)
