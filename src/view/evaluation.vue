<template>
    <div class="evaluation">
      <div class="score">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="right"></div>
      </div>
    </div>
</template>
<script>
export default {
  name:"evaluation"
}
</script>
<style lang="scss" scoped>
.evaluation{
  .score{
    display: flex;
    .left{
      flex: 1;
    }
    .middle{
      flex: 2.5;
    }
    .right{
      flex: 1;
    }
  }
}
</style>


