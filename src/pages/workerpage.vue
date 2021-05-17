<template>
  <div>
      <div id="worker_page">
          <div id="worker_container" :class="{scalemax:!isInitPage}">
              <div class="box" @click="isInitPage = false,showpage(0)">个人信息</div>
              <div class="box" @click="isInitPage = false,showpage(1)">组件库存</div>
              <div class="box" @click="isInitPage = false,showpage(2)">车辆库存</div>
              <div class="box" @click="isInitPage = false,showpage(3)">购买组件</div>
              <div class="box" @click="isInitPage = false,showpage(4)">组装车辆</div>
              <div class="box" @click="$router.push('/')">退出登录</div>
          </div>
          <div id="other_pages" :class="{other_pages_show:!isInitPage}">
          <InfoPage :class="{showOne:!pages[0]}"></InfoPage>
          <PartPage :class="{showOne:!pages[1]}"></PartPage>
          <CarPage :class="{showOne:!pages[2]}"></CarPage>
          <PartOrder :class="{showOne:!pages[3]}"></PartOrder>
          <InsCar :class="{showOne:!pages[4]}"></InsCar>
           <button id="quit_info" class="btn btn-info" @click="isInitPage=true">返回</button>
          </div>
      </div>
  </div>
</template>

<script>
import InfoPage from './worker_pages/info_page'
import PartPage from './admin_partspage/parts'
import CarPage from './admin_carpage/cars'
import PartOrder from './admin_order/partorder'
import InsCar from './admin_carpage/installcar'
export default {
    data () {
        return {
            isInitPage:true,
            pages: [false,false,false,false,false],
        }
    },
    methods:{
        showpage(index){
            for(let i = 0;i<this.pages.length;i++){
                this.pages[i]=false
            }
            this.pages[index]=true
        }
    },
    components: {
        InfoPage,
        PartPage,
        CarPage,
        PartOrder,
        InsCar
    }
}
</script>

<style lang="less">
#worker_page{
    height: 100vh;
    background: rgb(199, 247, 247);
    position: relative;
    text-align: center;

    #other_pages{
        position:absolute;
        left: 0;
        right: 0;
        top: -5000px;
        width: 50%;
        margin:auto auto;
    }

    #worker_container{
        height: 70vh;
        width: 70vw;
        background: rgb(236, 215, 190);
        box-shadow: 0 0 50px 50px beige;
        border-radius: 50px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto;
        display: flex;
        flex-wrap: wrap;
        perspective: 500px;
        overflow: hidden;
        transition: all .5s;

        .box{
            width: 150px;
            height: 150px;
            background: burlywood;
            margin: 50px 50px;
            border-radius: 30px;
            text-align: center;
            line-height: 150px;
            font-size: 28px;
            transition: all .3s;

            &:hover{
                transform: translateZ(20px);
                box-shadow: 0 0 10px 10px burlywood;
            }
        }
    }
}
#quit_info{
    width: 200px;
    height: 50px;
    position: relative;
    left: -160px;
    top:20px;
    font-size: 24px;
    transition: all 1s;
}
.scalemax{
    width: 0 !important;
    height: 0 !important;
    box-shadow: none  !important;
}
.other_pages_show{
    top:80px !important;
    transition: all 1s;
}
.showOne{
    display: none;
}

</style>