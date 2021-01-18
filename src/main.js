import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSocialSharing from 'vue-social-sharing'
 
Vue.config.productionTip = false

Vue.use(VueSocialSharing);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
