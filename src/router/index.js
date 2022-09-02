import { createRouter, createWebHistory } from 'vue-router'
import PageList from "@/pages/PageList";
import PageItem from "@/pages/PageItem";


const routes = [
  {
    path:'/:catchAll(.*)',
    component:PageList
  },
  {
    path:'/task/:id',
    component: PageItem
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
