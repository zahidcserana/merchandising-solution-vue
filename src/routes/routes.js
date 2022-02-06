import DashboardLayout from '../layout/DashboardLayout.vue'
import Login from '@/pages/Auth/Login'
import UserList from '@/pages/Users/UserList'
import UserCreate from '@/pages/Users/UserCreate'
import UserEdit from '@/pages/Users/UserEdit'

import ColorList from '@/pages/Colors/ColorList'
import ColorCreate from '@/pages/Colors/ColorCreate'
import ColorEdit from '@/pages/Colors/ColorEdit'

import SizeList from '@/pages/Sizes/SizeList'
import SizeCreate from '@/pages/Sizes/SizeCreate'
import SizeEdit from '@/pages/Sizes/SizeEdit'

import CategoryList from '@/pages/Categories/CategoryList'
import CategoryCreate from '@/pages/Categories/CategoryCreate'
import CategoryEdit from '@/pages/Categories/CategoryEdit'

import ProductList from '@/pages/Products/ProductList'
import ProductCreate from '@/pages/Products/ProductCreate'
import ProductEdit from '@/pages/Products/ProductEdit'

import VariantProductList from '@/pages/VariantProducts/VariantProductList'
import VariantProductCreate from '@/pages/VariantProducts/VariantProductCreate'
import VariantProductEdit from '@/pages/VariantProducts/VariantProductEdit'

// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/settings',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'colors',
        name: 'colors',
        component: ColorList
      },
      {
        path: 'colors/create',
        name: 'Color Create',
        component: ColorCreate
      },
      {
        path: 'colors/:id(\\d+)',
        name: 'Color Edit',
        component: ColorEdit
      },
      {
        path: 'sizes',
        name: 'sizes',
        component: SizeList
      },
      {
        path: 'sizes/create',
        name: 'Size Create',
        component: SizeCreate
      },
      {
        path: 'sizes/:id(\\d+)',
        name: 'Size Edit',
        component: SizeEdit
      },
      {
        path: 'categories',
        name: 'Categories',
        component: CategoryList
      },
      {
        path: 'categories/create',
        name: 'Category Create',
        component: CategoryCreate
      },
      {
        path: 'categories/:id(\\d+)',
        name: 'Category Edit',
        component: CategoryEdit
      }
    ]
  },
  {
    path: '/users',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: '',
        name: 'Users',
        component: UserList
      },
      {
        path: 'create',
        name: 'User Create',
        component: UserCreate
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'User Edit',
        component: UserEdit
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  {
    path: '/products',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: '',
        name: 'Products',
        component: ProductList
      },
      {
        path: 'create',
        name: 'Product Create',
        component: ProductCreate
      },
      {
        path: ':id(\\d+)',
        name: 'Product Edit',
        component: ProductEdit
      }
    ]
  },
  {
    path: '/variants',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: '',
        name: 'Variants',
        component: VariantProductList
      },
      {
        path: 'create',
        name: 'Variant Create',
        component: VariantProductCreate
      },
      {
        path: ':id(\\d+)',
        name: 'Variant Edit',
        component: VariantProductEdit
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
