import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: '',
          component: () => import('@/views/pages/Authentication/Login'),
        },

        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/home',
      component: () => import('@/views/container/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/container/Dashboard'),
        },
        // Users
        {
          name: 'Users',
          path: 'users/users',
          component: () => import('@/views/container/Users/Users'),
        },
        {
          name: 'UsersFrom',
          path: 'users/form',
          component: () => import('@/views/container/Users/UsersFrom'),
        },
         // Roles
         {
          name: 'Roles',
          path: 'roles/roles',
          component: () => import('@/views/container/Roles/Roles'),
        },
        {
          name: 'RolesFrom',
          path: 'roles/form',
          component: () => import('@/views/container/Roles/RolesForm'),
        },
        // Kitchen
        {
          name: 'Kitchens',
          path: 'kitchens/kitchens',
          component: () => import('@/views/container/Kitchens/Kitchens'),

        },
        {
          name: 'Kitchens-Edit',
          path: 'kitchens/kitchens-edit',
          component: () => import('@/views/container/Kitchens/Kitchen-Edit/Kitchen-Edit'),

        },
        {
          name: 'Kitchens-Show',
          path: 'kitchens/kitchens-show',
          component: () => import('@/views/container/Kitchens/Kitchen-Show/Kitchen-Show'),

        },
        // Kitchen
        {
          name: 'Vendors',
          path: 'vendors/vendors',
          component: () => import('@/views/container/Vendors/Vendors'),
        },

      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
