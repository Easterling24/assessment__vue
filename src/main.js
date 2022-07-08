import { createApp } from 'vue';
import App from './App.vue';
//Router
import router from './router/';

//Styles
import './styles/global.scss';

// Icons Imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

createApp(App).use(router).component('fa', FontAwesomeIcon).mount('#app');
