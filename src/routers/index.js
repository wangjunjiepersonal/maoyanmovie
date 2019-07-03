import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/movie',
    },
    {
			//路由重定向
			path: '*',
      redirect: '/movie',
    },
    {
      path: '/movie',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Movie'),
      children:[
      	{
		      path: '/movie',
		      redirect: '/movie/nowplaying',
		    },
      	{
		      path: 'city',
		      name: 'city',
		      component: () => import(/* webpackChunkName: "about" */ '@/components/City')
		    },
		    {
		      path: 'nowplaying',
		      name: 'nowplaying',
		      component: () => import(/* webpackChunkName: "about" */ '@/components/NowPlaying')
		    },
		    {
		      path: 'comingsoon',
		      name: 'comingsoon',
		      component: () => import(/* webpackChunkName: "about" */ '@/components/ComingSoon')
		    },
		    {
		      path: 'search',
		      name: 'search',
		      component: () => import(/* webpackChunkName: "about" */ '@/components/Search')
		    },
      ]
    },
    {
      path: '/cinema',
      name: 'cinema',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Cinema')
    },
    {
      path: '/mine',
      name: 'mine',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Mine')
    }
  ]
})
