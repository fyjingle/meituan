<template>
    <div>
        <img src="../img/star.png" alt="" v-for="item in whole">
        <img src="../img/star_half.png" alt="" v-for="item in half">
        <img src="../img/star_off.png" alt="" v-for="item in off">
    </div>
</template>

<style lang="scss" scoped>
img{
    width: .32rem;
    height: auto;
}
</style>

<script>
    export default{
        name:'star',
        props:["score"],
        data(){
            return {
                whole:"",
                half:"",
                off:"",
            }
        },
        created(){
            if(this.score){
                let count  = this.score / 0.5;
                this.whole = parseInt(count / 2);
                this.half = parseInt(count % 2);
                this.off = 5 - this.whole - this.half;
            }else{
                this.whole = 0;
                this.half = 0;
                this.off = 5;
            }
            

        }
    }
</script>
