import Vue from 'vue'
import Router from 'vue-router'
import main from "../view/main.vue"
import index from "../view/index.vue"
import order from "../view/order.vue"
import home from "../view/home.vue"

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:"/main",
      name:"main",
      component:main,
      children:[{
        path:"index",
        name:"index",
        component:index
        },
        {
          path:"order",
          name:order,
          component:order
        },
        {
          path:"home",
          name:home,
          component:home
        }
      ]
    },
    {
      path: '/',
      redirect:"/main"
    }
  ]
})
