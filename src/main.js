import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSocialSharing from 'vue-social-sharing'
import VueToastify from "vue-toastify";

import firebase from "firebase/app";
import "firebase/firestore";
require('dotenv').config()

let firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDERID,
  appId: process.env.VUE_APP_APP_ID
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

Vue.use(VueToastify);
Vue.use(VueSocialSharing);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
