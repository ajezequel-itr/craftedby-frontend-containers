import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import BoutiqueView from '@/views/BoutiqueView.vue'
import ContactView from '@/views/ContactView.vue'
import CartView from '@/components/CartContentComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import AdminPanelComponent from '@/components/AdminPanelComponent.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/boutique',
      name: 'Boutique',
      component: BoutiqueView,
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path:'/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path:'/admin',
      name: 'admin',
      component: AdminPanelComponent
    }
  ]
})

export default router
