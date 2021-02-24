import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, meta: { title: 'IZROOMS',
    metaTags: [
      {
        name: 'description',
        content: 'DEVELOPER ROOM'
      },
      {
        property: 'og:description',
        content: 'DEVELOPER ROOM'
      }
    ]
    }
  },
  { path: '/studytube', name: 'Study', component: () => import('../views/study/Study.vue'), meta: { title: 'STUDYTUBE',
    metaTags: [
      {
        name: 'description',
        content: 'Set and track your study time while listening to your favorite focus music youtube channel'
      },
      {
        property: 'og:description',
        content: 'Set and track your study time while listening to your favorite focus music youtube channel'
      }
    ]
    } 
  },
  { path: '/izgym', name: 'Izgym', component: () => import('../views/izgym/Izgym.vue'), meta: { title: 'IZ*GYM',
    metaTags: [
      {
        name: 'description',
        content: '아이즈원 운동법'
      },
      {
        property: 'og:description',
        content: '아이즈원 운동법'
      }
    ]
    } 
  },
  { path: '/izgym/settings', name: 'Settings', component: () => import('../views/izgym/Settings.vue'), meta: { title: 'IZ*GYM',
    metaTags: [
      {
        name: 'description',
        content: '아이즈원 운동법'
      },
      {
        property: 'og:description',
        content: '아이즈원 운동법'
      }
    ]
    } 
  },    
  { path: '/religion', name: 'Religion', component: () => import('../views/Religion.vue'), meta: { title: 'HEAVEN or HELL',
    metaTags: [
      {
        name: 'description',
        content: `What if you die tonight, will you go to HEAVEN or HELL? Let's find out how religions talk about this!`
      },
      {
        property: 'og:description',
        content: `What if you die tonight, will you go to HEAVEN or HELL? Let's find out how religions talk about this!`
      }
    ]
    } 
  },
  { path: '/religion/start', name: 'ReligionStart', component: () => import('../views/ReligionStart.vue'), meta: { title: 'HEAVEN or HELL',
    metaTags: [
      {
        name: 'description',
        content: `What if you die tonight, will you go to HEAVEN or HELL? Let's find out how religions talk about this!`
      },
      {
        property: 'og:description',
        content: `What if you die tonight, will you go to HEAVEN or HELL? Let's find out how religions talk about this!`
      }
    ]
    } 
  },
  { path: '/religion/ko', name: 'ReligionKo', component: () => import('../views/ko/ReligionKo.vue'), meta: { title: 'HEAVEN or HELL KO',
    metaTags: [
      {
        name: 'description',
        content: `오늘 밤 내가 죽는다면 나는 어디로 가게 될까? 간단한 설문으로 각 종교별 대답을 알아보자`
      },
      {
        property: 'og:description',
        content: `오늘 밤 내가 죽는다면 나는 어디로 가게 될까? 간단한 설문으로 각 종교별 대답을 알아보자`
      }
    ]
    } 
  },
  { path: '/religion/ko/start', name: 'ReligionStartKo', component: () => import('../views/ko/ReligionStartKo.vue'), meta: { title: 'HEAVEN or HELL KO',
    metaTags: [
      {
        name: 'description',
        content: `오늘 밤 내가 죽는다면 나는 어디로 가게 될까? 간단한 설문으로 각 종교별 대답을 알아보자`
      },
      {
        property: 'og:description',
        content: `오늘 밤 내가 죽는다면 나는 어디로 가게 될까? 간단한 설문으로 각 종교별 대답을 알아보자`
      }
    ]
    } 
  },
  { path: '/religion/jp', name: 'ReligionJp', component: () => import('../views/jp/ReligionJp.vue'), meta: { title: 'HEAVEN or HELL JP',
    metaTags: [
      {
        name: 'description',
        content: '今夜私が死んだら私はどこに行くことになるだろうか。 簡単な設問で各宗教の答えを調べてみよう'
      },
      {
        property: 'og:description',
        content: '今夜私が死んだら私はどこに行くことになるだろうか。 簡単な設問で各宗教の答えを調べてみよう'
      }
    ]
    } 
  },
  { path: '/religion/jp/start', name: 'ReligionStartJp', component: () => import('../views/jp/ReligionStartJp.vue'), meta: { title: 'HEAVEN or HELL JP',
    metaTags: [
      {
        name: 'description',
        content: '今夜私が死んだら私はどこに行くことになるだろうか。 簡単な設問で各宗教の答えを調べてみよう'
      },
      {
        property: 'og:description',
        content: '今夜私が死んだら私はどこに行くことになるだろうか。 簡単な設問で各宗教の答えを調べてみよう'
      }
    ]
    } 
  },
  { path: '/egg', name: 'Egg', component: () => import('../views/egg/Egg.vue'), meta: { title: 'Egg Boil Timer',
    metaTags: [
      {
        name: 'description',
        content: 'Online Timer for Boiling Egg'
      },
      {
        property: 'og:description',
        content: 'Online Timer for Boiling Egg'
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
