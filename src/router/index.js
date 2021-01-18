import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/study', name: 'Study', component: () => import('../views/study/Study.vue'), meta: { title: 'Study App',
    metaTags: [
      {
        name: 'description',
        content: 'Study App without installing or account'
      },
      {
        property: 'og:description',
        content: 'Study App without installing or account'
      }
    ]
    } 
  },  
  { path: '/religion', name: 'Religion', component: () => import('../views/Religion.vue'), meta: { title: 'HEAVEN or HELL',
    metaTags: [
      {
        name: 'description',
        content: 'Will I go to heaven or hell?'
      },
      {
        property: 'og:description',
        content: 'Will I go to heaven or hell?'
      }
    ]
    } 
  },
  { path: '/religion/start', name: 'ReligionStart', component: () => import('../views/ReligionStart.vue'), meta: { title: 'HEAVEN or HELL',
    metaTags: [
      {
        name: 'description',
        content: 'Will I go to heaven or hell?'
      },
      {
        property: 'og:description',
        content: 'Will I go to heaven or hell?'
      }
    ]
    } 
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if(!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));
  next();
});


export default router
