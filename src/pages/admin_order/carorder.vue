<template>
  <div class="clearfix">
      <div id="carorder_page_container" :class="{rota:isrotatepage}">
        <div id="index_page">
          <h3>你将从汽车库存中售出车辆</h3>
          <button class="btn btn-success btn-lg"  @click="isrotatepage=!isrotatepage" >点击生成订单</button>
        </div>
        <div id="carorder_page">
          <h4>库存详情  (如果选择售出的商品数量超出库存，那么您将生成订单失败)</h4>
          <div id="goods_top">
            <div id="goods_left">
              <select class="form-control" v-model="type" @click="carsfilter">
                <option value="">品牌</option>
                <option v-for="(item, index) in types" :key="index" :value="item">{{item}}</option>
              </select>
            </div>
            <div id="goods_center">
              <select class="form-control" v-model="size" @click="carsfilter">
                <option value="">型号</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <div id="goods_number">
              <input type="number" class="form-control" :placeholder="'该商品库存量'+maxnums" v-model="nums">
            </div>
          </div>
          <br>
          <div id="goods_right">
              <button class="btn btn-success" @click="upmsg()">确认</button>
              <button class="btn btn-warning" @click="type='',size='', nums=''">重置</button>
            </div>
          <br>
          <label>详情：{{type}} {{size}}</label>
          <br>
           <h4>订单详情</h4>
          <div id="msg_container">
            <h5 v-html="msg" style="white-space: pre-wrap"></h5>
          </div>
          <br>
          <div>
            <button class="btn btn-success" @click="submitOrder">提交所有订单请求</button>
            <button class="btn btn-danger" @click="orders=[],msg=''">取消所有订单</button>
            <button class="btn btn-warning" @click="isrotatepage=false,type='',size='',msg='',price=0,orders=[],nums=''">返回</button>
          </div>
        </div>  
      </div>
  </div>
</template>

<script>
import {reqAddCarOrder} from '../../api'
export default {
  data () {
    return {
      allcars: [],
      searcars:[],
      isrotatepage: false,
      type:'',
      size:'',
      nums:'',
      msg:'',
      price:0,
      orders: [],
      maxnums:'0',
      types: ['大众','长安','玛莎','奥迪','奔驰'],
      prices: [250000,100000,550000,600000,800000],
    }
  },
  async mounted () {
    await this.$store.dispatch('getAllCars')
    this.allcars = this.$store.state.cars
    this.searcars = this.allcars
  },
  methods:{
    upmsg(){
      if(this.nums>this.maxnums)return alert("没有那么多的该商品")
      if(this.nums=='0'||this.nums==''||this.type==''||this.size=='')return
      let index = this.types.indexOf(this.type)
      this.price = this.prices[index]
      this.size=='M'?this.price+=86500:this.size=='L'?this.price+=149500:this.price+=0
      let order = {
            type: '卖出车辆',
            good: this.type,
            goodNum: this.nums,
            price: this.price*this.nums,
            state: 0,
      }
      this.orders.unshift(order)
      let line = this.nums + '辆 '+this.size+' 型'+this.type+' 售出 '+"收益"+this.price*this.nums+'\n'
      this.msg+=line
      this.price =0;
    },
    async submitOrder(){
      const result = await reqAddCarOrder(
        this.orders
      )
      if(result.code!=1)return alert(result.message)
      alert(result.message)
      this.isrotatepage=false,this.type='',this.size='',this.msg='',this.price=0,this.orders=[],this.nums=''
    },
    carsfilter(){
      //根据类型计算库存
      this.searcars = this.allcars.filter((car) => {
        if(this.type == '' && this.size == '')return true
        if(this.type != '' && this.size == '')return car.type == this.type
        if(this.type != '' && this.size != '')return car.type == this.type && car.size == this.size
      })
      this.maxnums = this.searcars.length
    }
  }
}
</script>

<style lang="less">
html{
  perspective: 600px;
}
#carorder_page_container{
  width: 500px;
  height: 400px;
  margin: 100px 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: all 1s;
  #index_page{
    background: rgb(134, 238, 241);
    border-radius: 20px;
    padding: 10px;
    width: 70%;
    height: 40%;
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position:absolute;
    transition: all 0.5s;
    backface-visibility: hidden;
    button{
      margin: 20px 90px;
    }
    &:hover{
        box-shadow:0 0 10px 10px aqua;
    }
  }
  #carorder_page{
    background: rgb(126, 169, 233);
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    height: 100%;
    position: absolute;
    transform:rotateY(180deg);
    backface-visibility: hidden;
  
    #goods_top{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      div{
        width:30%
      }
    }

    #msg_container{
      overflow: auto;
      height: 100px;
      background: seashell;
    }
  }
}

.rota{
  transform: rotateY(180deg);
}

</style>