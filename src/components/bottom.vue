<template>
  <div class="bottom"><!-- 
 --><router-link to="/main/index">
      <div :class="{active:currentRouter == 'index'}">
        <svg class="icon" aria-hidden="true" v-show="currentRouter == 'index'">
            <use xlink:href="#icon-fangzi"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="currentRouter != 'index'">
            <use xlink:href="#icon-fangzi-copy"></use>
        </svg>
        <span>首页</span>
      </div>
    </router-link><!-- 
 --><router-link to="/main/order">
      <div :class="{active:currentRouter == 'order'}">
          <svg class="icon" aria-hidden="true" v-show="currentRouter == 'order'">
              <use xlink:href="#icon-dingdan1-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="currentRouter != 'order'">
              <use xlink:href="#icon-dingdan1"></use>
          </svg>
          <span>订单</span>
        </div>
    </router-link><!-- 
 --><router-link to="/main/home">
        <div :class="{active:currentRouter == 'home'}">
          <svg class="icon" aria-hidden="true" v-show="currentRouter == 'home'">
              <use xlink:href="#icon-meituanwaimai-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="currentRouter != 'home'">
              <use xlink:href="#icon-meituanwaimai"></use>
          </svg>
          <span>我的</span>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data () {
    return {
      currentRouter:"index"
    }
  },
  watch:{
    $route:function(to,from){
      switch(to.path){
        case "/main/index":
          this.currentRouter = "index";
          break;
        case "/main/order":
          this.currentRouter = "order";
          break;
        case "/main/home":
          this.currentRouter = "home";
          break;
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bottom{
  width: 100%;
  height: 1.333333rem;
  background: white;
  font-size: 10px;
  position: fixed;
  bottom: 0;
  padding-top: .133333rem;
  border-top: .026667rem solid #dbdbdb;
  a{
    text-decoration: none;
    color: gray;
  }
  div{
    display: inline-block;
    width: 33.33%;
    text-align: center;
    .icon{
      display: block;
      margin:auto;
      width:.666667rem;
      height:.666667rem;
    }
    span{
      font-size: .266667rem;
    }
  }
  .active{
    color: #FBD356;
  }
}
</style>
