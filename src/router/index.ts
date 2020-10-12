import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import CoachDetail from '@/pages/coaches/CoachDetail.vue'
import CoachesList from '@/pages/coaches/CoachesList.vue'
import CoachRegistration from '@/pages/coaches/CoachRegistration.vue'
import ContactCoach from '@/pages/requests/ContactCoach.vue'
import RequestsReceived from '@/pages/requests/RequestsReceived.vue'
import UserAuth from '@/pages/auth/UserAuth.vue'
import NotFound from '@/pages/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/coaches'
  },
  {
    path: '/coaches',
    component: CoachesList,
    meta: { title: 'Home Page - List of Coaches' }
  },
  {
    path: '/coaches/:id',
    component: CoachDetail,
    props: true,
    meta: { title: 'Coach Detail' },
    children: [
      {
        path: 'contact',
        component: ContactCoach,
      }
    ]
  },
  {
    path: '/register',
    component: CoachRegistration,
    meta: { title: 'Coach Registration' }
  },
  {
    path: '/requests',
    component: RequestsReceived,
    meta: { title: 'Requests' }
  },
  {
    path: '/auth',
    component: UserAuth,
    meta: { title: 'Auth' }
  },
  {
    path: '/:notFound(.*)',
    component: NotFound,
    meta: { title: 'Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
