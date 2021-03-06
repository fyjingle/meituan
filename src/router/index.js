import Vue from 'vue'
import Router from 'vue-router'
import main from "../view/main.vue"
import index from "../view/index.vue"
import order from "../view/order.vue"
import home from "../view/home.vue"
import shop from "../view/shop.vue"
import orderDishes from "../view/orderDishes.vue"
import evaluation from "../view/evaluation.vue"

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
      path:"/shop",
      component:shop,
      component:shop,
      children:[{
        path:"orderDishes",
        name:"orderDishes",
        component:orderDishes
      },
      {
        path:"evaluation",
        name:"evaluation",
        component:evaluation
      }
      ]
    },
    {
      path: '/',
      redirect:"/main"
    }
  ]
})
