<template>
  <div>
    <div id="search_header">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="showallcars">所有</button>
      </div>
      <input type="text" placeholder="输入组件号或者类型查询" v-model="search">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="searchcar(1)">订单号搜索</button>
        <button type="button" class="btn btn-default" @click="searchcar(2)">已完成订单</button>
        <button type="button" class="btn btn-default" @click="searchcar(3)">未完成订单</button>
      </div>
    </div>
    <label for="result">库存：{{length}} 个单子</label>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>订单号</td>
            <td>订单类型</td>
            <td>订单商品</td>
            <td>商品数量</td>
            <td>订单支出或收益</td>
            <td>订单状态</td>
            <td>订单操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{order.id}}</td>
            <td>{{order.type}}</td>
            <td>{{order.good}}</td>
            <td>{{order.goodNum}}</td>
            <td>{{order.price}}</td>
            <td>{{order.state}}</td>
            <td>
              <button v-show="order.state=='未完成'" class="btn btn-success btn-sm" @click="confim(order)">确认订单</button>
              <button v-show="order.state=='已完成'" class="btn btn-danger btn-sm" @click="del(order, index)">删除订单</button>
            </td>
          </tr>
        </tbody>    
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination">
            <li>
              <a aria-label="Previous" @click="prevpage">
              <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="(val,index) in indexstr" :key="index"><a @click="indexpage(index)">{{index+1}}</a></li>
            <li>
              <a aria-label="Next" @click="nextpage">
              <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
        </ul>
      </nav>
  </div>
</template>

<script>
import {reqDelOrder,reqConfirmOrder} from '../../api'
export default {
  data () {
    return {
      allorders: [],
      searchorders: [],
      orders:[],
      pageindex: 0,
      length: 0,
      indexstr: [],
      search: '',
    }
  },
  async mounted () {
    await this.$store.dispatch('getAllOrders')
    this.allorders = this.$store.state.orders
    this.allorders.forEach(item=>item.state==1?item.state='已完成':item.state='未完成')
    this.length = this.allorders.length
    this.searchorders = this.allorders
    this.orders = this.searchorders.slice(0,10)
    for(let i = 0; i<this.length/10; i++){
      this.indexstr[i] = i;
    }
  },
  methods: {
    nextpage(){
      this.pageindex++
      if(this.pageindex>=this.length/10)this.pageindex--
      this.orders = this.searchorders.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    prevpage(){
      this.pageindex--
      if(this.pageindex<0)this.pageindex++
      this.orders = this.searchorders.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    indexpage(index){
      this.pageindex = index
      this.orders = this.searchorders.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    showallcars(){
      this.search = ''
      this.searchorders = this.allorders
      this.length = this.searchorders.length
      this.orders = this.searchorders.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    searchcar(type=1,text=this.search){
      if(type==1)this.searchorders = this.allorders.filter((item)=>item.id == text)
      if(type==2)this.searchorders = this.allorders.filter((item)=>item.state == '已完成')
      if(type==3)this.searchorders = this.allorders.filter((item)=>item.state == '未完成')
      this.length = this.searchorders.length
      this.orders = this.searchorders.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    async confim(o){
      let r = confirm("确认"+o.id+"号订单已完成吗？")
      if(r==false)return
      const data = 
        {
          id: o.id
        }
      const result = await reqConfirmOrder(data)
      if(result.code==1)
      {
        alert(result.message)
        o.state = '已完成'
      }
      else alert(result.message)
    },
    async del(o,index){
      let r = confirm("确认删除 "+o.id+" 号订单吗？")
      if(r==false)return
      const data = 
        {
          id: o.id
        }
      const result = await reqDelOrder(data)
      if(result.code==1)
      {
        alert('删除订单成功')
        o.state = '已被删除'
      }
      else alert('服务器错误，删除失败')
    }
  }
}
</script>

<style>

</style>