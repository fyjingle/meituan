<template>
    <div class="specification">
        <div class="content">
            <div class="header">
                <!-- <span class="title">{{title}}</span> -->
                <span class="title">{{food.name}}</span>
                <svg class="icon" aria-hidden="true" @click="close">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </div>
            <ul>
                <div>规格:</div>
                <li v-for="(item,index) in food.skus" 
                    :class="{checked:checked == index}" 
                    @click="checked=index">
                    {{item.spec}}
                </li>
            </ul>
            <div class="footer">
                <span class="price">￥{{food.skus[checked].price}}</span>
                <span class="description">
                    (<span>food.skus[checked].spec</span>)
                </span>
                <span class="add">
                    <addToCar 
                        class="addToCar" 
                        @middleStation="middleStation"
                        :seller="seller"
                        :food="food.skus[checked]"
                        :car="true"
                        :add="false"
                        :name="food.skus[checked].spec"
                    ></addToCar>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    import addToCar from "./addToCar.vue"
export default{
    name:"specification",
    props:["seller","food"],
    data(){
        return {
            foodChecked:"",
            foodCheckedName:"",
            checked:0
        }
    },
    mounted(){
    },
    components:{
        addToCar
    },
    methods:{
        middleStation(rect){
            this.$emit("ball",rect);
        },
        close(){
            this.$emit("close");
        }
    }
}
</script>
<style lang="scss" scoped>
.specification{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 4;
    background: rgba(0, 0, 0, 0.45);
    .content{
        position: absolute;
        top:50%;
        left: 50%;
        width: 89%;
        background: white;        
        transform:translate(-50%,-50%);
        .header{
            text-align: center;
            padding-top: 0.35rem;
            color: black;
            .title{
                width: 65%;
                display: inline-block;
                font-size: 0.43rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .icon{
                width: 0.8rem;
                height: 0.8rem;
                position: absolute;
                right: 0.3rem;
                top: 0.3rem;
            }

        }
        ul{
            font-size: 0.37rem;
            padding-top: 0.6rem;
            padding-left: 0.3rem;
            li{
                display: inline-block;
                margin-right: 0.4rem;
                margin-top: 0.3rem;
                padding: 0.2rem;
                border: 0.4px solid #c1c1c1;
            }
            .checked{
                border: 1px solid #c3ae18;
                background: rgba(255, 255, 0, 0.15);
                color: #FFC107;
            }
        }
        .footer{
                background: whitesmoke;
                border-top: 0.4px solid #e4e4e4;
                padding: 0.1rem 0.2rem 0.5rem 0.4rem;
                margin-top: 0.8rem;
                .price{
                    color: red;
                    font-weight: bold;
                    font-size: 0.6rem;
                }
                .description{
                    color:gray;
                    display: inline-block;
                    span{
                        display: inline-block;
                        width: 1.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        vertical-align: top;
                    }
                    

                }
                .add{
                    .addToCar{
                        display: inline-block;
                        float: right;
                        margin-top:0.2rem;
                    }
                }
        }
    }
}
</style>