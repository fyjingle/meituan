<template>
    <div class="main">
        <router-view></router-view>
        <bottom></bottom>
    </div>
</template>
<script>
import bottom from "../components/bottom.vue"
export default{
    name:"main",
    components:{
        bottom
    },
    created(){
        this.$router.push({name:"index"});
    }
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    height: 100%;
}
</style>