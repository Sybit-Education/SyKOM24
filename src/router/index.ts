import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TalkView from '../views/TalkView.vue'
import { useAgendaStore } from '@/stores/agenda.store'
import { useRoomStore } from '@/stores/room.store'
import { useTalkStore } from '@/stores/talk.store'
import { useSpeakerStore } from '@/stores/speaker.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth',  top: 65  })
        }, 100)
      })
    } else if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ behavior: 'smooth', top: 0 })
        }, 50)
      })
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/talk/:talkId/:agendaId',
      name: 'talk',
      props: true,
      component: TalkView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(() => {
  useRoomStore().init()
  useSpeakerStore().init()
  useTalkStore().init()
  useAgendaStore().init()
})

export default router
