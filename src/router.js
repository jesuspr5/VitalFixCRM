import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function AuthorizationFunction(to, from, next) {
  let acction = false
  if (localStorage.getItem('token')) {
    // let menu = JSON.parse(localStorage.getItem("modulesAsig"));
    // console.log(to.name);
    // for (let mud of menu) {
    //   console.log(mud.text);
    //   if (mud.text == to.name || mud.text == from.name) {
    //     acction = true;
    //     // next()
    //     break;
    //   }
    // }

    acction = true
    if (acction) {
      next()
    } else {
      // alert("Not authorized");
      next({ name: '404 Error' })
    }
  } else {
    // alert("Debe iniciar sesion");
    next({ name: 'Login' })
  }
}

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
      // beforeEnter: AuthorizationFunction,
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'dashboard',
          // beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Dashboard'),
        },
        // Users
        {
          name: 'Users',
          path: 'users/users',
          // beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Users/Users'),
        },
        {
          name: 'UsersFrom',
          path: 'users/form',
          // beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Users/UsersFrom'),
        },
        // Roles
        {
          name: 'Roles',
          path: 'roles/roles',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Roles/Roles'),
        },
        {
          name: 'RolesFrom',
          path: 'roles/form',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Roles/RolesForm'),
        },
        // BLogs
        {
          name: 'Blogs',
          path: 'blogs/blogs',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Blogs/Blogs'),
        },
        {
          name: 'BlogsForm',
          path: 'blogs/form',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Blogs/BlogsForm'),
        },
        {
          name: 'Publications',
          path: 'publications/publications',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Publications/Publications'),
        },
        {
          name: 'PublicationsForm',
          path: 'publications/form',
          //  beforeEnter: AuthorizationFunction,
          component: () =>
            import('@/views/container/Publications/PublicationsForm'),
        },
        {
          name: 'Investigation',
          path: 'investigation/investigation',
          //  beforeEnter: AuthorizationFunction,
          component: () =>
            import('@/views/container/Investigation/Investigation'),
        },
        {
          name: 'InvestigationForm',
          path: 'investigation/form',
          //  beforeEnter: AuthorizationFunction,
          component: () =>
            import('@/views/container/Investigation/InvestigationForm'),
        },
        {
          name: 'Contact',
          path: 'contact/contact',
          //  beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Contact/Contact'),
        },
        {
          name: 'ContactForm',
          path: 'contact/form',
          //   beforeEnter: AuthorizationFunction,
          component: () => import('@/views/container/Contact/ContactForm'),
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
          component: () =>
            import('@/views/container/Kitchens/Kitchen-Edit/Kitchen-Edit'),
        },
        {
          name: 'Kitchens-Show',
          path: 'kitchens/kitchens-show',
          component: () =>
            import('@/views/container/Kitchens/Kitchen-Show/Kitchen-Show'),
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
