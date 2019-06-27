import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'  路由懒加载
const Index = ()=> import('@/components/Index')

import BannerDetail from '@/components/banner/BannerDetail'
//import NewsList from '@/components/news/NewsList'
const NewsList = ()=> import('@/components/news/NewsList')
//import NewsDetails from '@/components/news/NewsDetails'
const NewsDetails = ()=> import('@/components/news/NewsDetails')
import PhotoList from '@/components/photoshare/PhotoList'
import WomanStar from '@/components/photoshare/WomanStar'
import ManStar from '@/components/photoshare/ManStar'
import FullView from '@/components/photoshare/FullView'
import PhotoDetails from '@/components/photoshare/PhotoDetails'

//import ShopList from '@/components/shop/ShopList'
const ShopList = ()=> import('@/components/shop/ShopList')
import ShopDetails from '@/components/shop/ShopDetails'
import My from '@/components/my/My'
import ShopCar from '@/components/shopcar/ShopCar'
import Map from '@/components/map/Map'


import HeadNav from '@/components/common/headNav'
Vue.component('HeadNav',HeadNav)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component: Index,
    },
    {
      path:'/',
      redirect:{name:'index'}
    },
    {
      path:'/my',
      name:'my',
      component:My
    },
    {
      path: '/banner/detail',
      name:'banner.details',
      component: BannerDetail,
    },
    {
      path: '/news/list',
      name:'news.list',
      component: NewsList,
    },
    {
      path: '/news/details',
      name:'news.details',
      component: NewsDetails,
    },
    {
      path: '/photo',
      name:'photo',
      component: PhotoList,
      redirect:{name:'womanStar'},
      children:[
        {
          path:'/photo/womanStar',
          name:'womanStar',
          component: WomanStar,
        },
        {
          path:'/photo/manStar',
          name:'manStar',
          component: ManStar,
        },
        {
          path:'/photo/fullView',
          name:'fullView',
          component: FullView,
        },
      ]
    },
    {
      path: '/photo/details',
      name:'photo.details',
      component: PhotoDetails,
    },
    {
      path: '/shop',
      name:'shop.list',
      component: ShopList,
    },
    {
      path: '/shop/details',
      name:'shopdetails',
      component: ShopDetails,
    },
    {
      path: '/shopcar',
      name:'shopcar',
      component: ShopCar,
    },
    {
      path: '/map',
      name:'map',
      component: Map,
    },



  ]
})
