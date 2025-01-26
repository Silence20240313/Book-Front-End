import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/manager', component:() => import('../views/Manager.vue'),children:[
      {path: 'home', meta:{title:'ホームページ'},component:() => import('../views/Home.vue')},
      {path: 'test', meta:{title:'テストデータページ'},component:() => import('../views/Test.vue')},
      {path: 'data', meta:{title:'データ表示ページ'},component:() => import('../views/Data.vue')},
      {path: 'employee', meta:{title:'従業員情報'},component:() => import('../views/Employee.vue')},
      {path: 'admin', meta:{title:'管理者情報'},component:() => import('../views/Admin.vue')},
      {path: 'person', meta:{title:'個人情報'},component:() => import('../views/Person.vue')},
      {path: 'password', meta:{title:'パスワード変更'},component:() => import('../views/Password.vue')},
      {path: 'article', meta:{title:'記事情報'},component:() => import('../views/Article.vue')},
      {path: 'dept', meta:{title:'部門情報'},component:() => import('../views/Dept.vue')},
      {path: 'stu', meta:{title:'テスト'},component:() => import('../views/Stu.vue')},
    ]},
    {path: '/login', name: 'Login',meta:{title:'システムにログイン'},component:() => import('../views/Login.vue')},
    {path: '/register', name: 'Register',meta:{title:'ようこそ登録してください'},component:() => import('../views/Register.vue')},
    {path: '/404', name: '404', meta:{title:'404ページが見つかりません'},component:() => import('../views/404.vue')},
    {path: '/:pathMatch(.*)', redirect:'/404'}
  ]
})

router.beforeEach((to,from,next) => {
   document.title = to.meta.title
   next()  // 必须调用这个函数才能实现跳转
})


export default router
