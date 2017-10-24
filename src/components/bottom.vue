<template>
  <div class="bottom"><!-- 
 --><router-link to="/main/index">
      <div :class="{active:currentRouter == 'index'}">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </div>
    </router-link><!-- 
 --><router-link to="/main/order">
      <div :class="{active:currentRouter == 'order'}">
          <i class="iconfont icon-dingdan"></i>
          <span>订单</span>
        </div>
    </router-link><!-- 
 --><router-link to="/main/home">
        <div :class="{active:currentRouter == 'home'}">
          <i class="iconfont icon-meituanwaimai"></i>
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
  font-size: 10px;
  position: fixed;
  bottom: 0;
  a{
    text-decoration: none;
    color: gray;
  }
  div{
    display: inline-block;
    width: 33.33%;
    text-align: center;
    i{
      display: block;
      font-size: .666667rem;
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
