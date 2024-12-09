import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/test'},
    {path: '/manager', component:() => import('../views/Manager.vue'),children:[
      {path: 'home', name: 'home',meta:{title:'主页'},component:() => import('../views/Home.vue')},
      {path: 'test', name: 'test', meta:{title:'测试数据页面'},component:() => import('../views/Test.vue')},
      {path: 'data', name: 'data', meta:{title:'数据展示页面'},component:() => import('../views/Data.vue')},
    ]},
    {path: '/404', name: '404', meta:{title:'404找不到页面'},component:() => import('../views/404.vue')},
    {path: '/:pathMatch(.*)', redirect:'/404'}
  ]
})

router.beforeEach((to,from,next) => {
   document.title = to.meta.title
   next()  // 必须调用这个函数才能实现跳转
})


export default router
