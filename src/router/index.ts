import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import CoachesList from '@/pages/coaches/CoachesList.vue'
import store from '@/store/index'

const CoachDetail = defineAsyncComponent(() => {
  return import('@/pages/coaches/CoachDetail.vue')
})
const CoachRegistration = defineAsyncComponent(() => {
  return import('@/pages/coaches/CoachRegistration.vue')
})
const ContactCoach = defineAsyncComponent(() => {
  return import('@/pages/requests/ContactCoach.vue')
})
const RequestsReceived = defineAsyncComponent(() => {
  return import('@/pages/requests/RequestsReceived.vue')
})
const UserAuth = defineAsyncComponent(() => {
  return import('@/pages/auth/UserAuth.vue')
})
const NotFound = defineAsyncComponent(() => {
  return import('@/pages/NotFound.vue')
})

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
    meta: {
      title: 'Coach Registration',
      requiresAuth: true,
      requiresNotCoach: true
    }
  },
  {
    path: '/requests',
    component: RequestsReceived,
    meta: {
      title: 'Requests',
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    component: UserAuth,
    meta: {
      title: 'Auth',
      requiresNotAuth: true
    }
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

  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth')
  } else if (to.meta.requiresNotAuth && store.getters['auth/isAuthenticated']) {
    next('/coaches')
  } else if (to.meta.requiresNotCoach && store.getters['coaches/isCoach']) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
