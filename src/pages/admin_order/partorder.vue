<template>
  <div class="clearfix">
      <div id="part_orderpage">
         <div id="goods_container">
           <div id="goods_left">
             <select class="form-control" v-model="type">
                <option value="">品牌</option>
                <option v-for="(item, index) in types" :key="index" :value="item">{{item}}</option>
              </select>
           </div>
           <div id="goods_center">
             <input type="number" class="form-control" placeholder='选择数量' v-model="nums">
           </div>
           <div id="goods_right">
              <button class="btn btn-success" @click="setorder">确认</button>
              <button class="btn btn-warning" @click="type='',nums=''">重置</button>
           </div>
         </div>
         <br><br>
         <h4>订单详情</h4>
         <div id="msg_container">
            <h5 v-html="msg" style="white-space: pre-wrap"></h5>
          </div>
          <br>
          <div>
            <button class="btn btn-success" @click="submitOrder">提交所有订单请求</button>
            <button class="btn btn-danger" @click="orders=[],msg=''">取消所有订单</button>
          </div>
      </div>
  </div>
</template>

<script>
import {reqAddPartOrder} from '../../api'
export default {
  data () {
    return {
      types: ['发动机配件','传动系配件','制动系配件','电器仪表系配件','汽车灯具','安全防盗','汽车外饰','影音电器','化工护理','车身及附件'],
      prices: [30000,10000,5000,3000,4000,2000,500,2000,4000,2000,4000],
      type: '',
      nums:'',
      price: 0,
      msg: '',
      orders: []
    }
  },
  methods: {
    setorder(){
      if(this.nums=='0'||this.nums==''||this.type=='')return
      let index = this.types.indexOf(this.type)
      this.price = this.prices[index]
      let order = {
            type: '买进组件',
            good: this.type,
            goodNum: this.nums,
            price: this.price*this.nums,
            state: 0,
      }
      this.orders.unshift(order)
      let line = this.nums + '个 '+this.type+' 组件 '+"花费"+this.price*this.nums+'\n'
      this.msg+=line
      this.price =0;
    },
    async submitOrder(){
      const result = await reqAddPartOrder(
        this.orders
      )
      if(result.code!=1)return alert(result.message)
      alert(result.message)
      this.type='',this.msg='',this.price=0,this.orders=[],this.nums=''
    },
  }
}
</script>

<style lang="less">
#part_orderpage{
  width: 75%;
  height: 45%;
  margin: 100px auto;
  padding: 40px;
  border-radius: 15px;
  background: rgb(174, 238, 238);
  #goods_container{
    display: flex;
    justify-content: space-around;

    div{
      width: 25%;
    }
  }

  #msg_container{
      overflow: auto;
      height: 100px;
      background: seashell;
    }
}
</style>