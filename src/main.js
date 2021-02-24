import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSocialSharing from 'vue-social-sharing'
import VueToastify from "vue-toastify";

Vue.config.productionTip = false

Vue.use(VueToastify);
Vue.use(VueSocialSharing);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
