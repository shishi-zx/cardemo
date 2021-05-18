<template>
  <div>
    <div id="search_header">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="showallcars">所有</button>
      </div>
      <input type="text" placeholder="输入组件号或者类型查询" v-model="search">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="searchcar(1)">车辆注册号搜索</button>
        <button type="button" class="btn btn-default" @click="searchcar(2)">车辆款式搜索</button>
      </div>
    </div>
    <label for="result">库存：{{length}} 辆</label>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>注册号</td>
            <td>车辆品牌</td>
            <td>车辆型号</td>
            <td>车辆大小</td>
            <td>车辆价格</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" :key="index">
            <td>{{car.id}}</td>
            <td>{{car.type}}</td>
            <td>{{car.modelString}}</td>
            <td>{{car.size}}</td>
            <td>{{car.price}}</td>
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
export default {
  data () {
    return {
      allcars: [],
      searchcars: [],
      cars:[],
      pageindex: 0,
      length: 0,
      indexstr: [],
      search: '',
    }
  },
  async mounted () {
    await this.$store.dispatch('getAllCars')
    this.allcars = this.$store.state.cars
    this.length = this.allcars.length
    this.searchcars = this.allcars
    this.cars = this.searchcars.slice(0,10)
    for(let i = 0; i<this.length/10; i++){
      this.indexstr[i] = i;
    }
  },
  methods: {
    nextpage(){
      this.pageindex++
      if(this.pageindex>=this.length/10)this.pageindex--
      this.cars = this.searchcars.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    prevpage(){
      this.pageindex--
      if(this.pageindex<0)this.pageindex++
      this.cars = this.searchcars.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    indexpage(index){
      this.pageindex = index
      this.cars = this.searchcars.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    async showallcars(){
      await this.$store.dispatch('getAllCars')
      this.allcars = this.$store.state.cars
      this.search = ''
      this.searchcars = this.allcars
      this.length = this.searchcars.length
      this.cars = this.searchcars.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    searchcar(type=1,text=this.search){
      if(type==1)this.searchcars = this.allcars.filter((item)=>item.id == text)
      else  if(type==2)this.searchcars = this.allcars.filter((item)=>item.type == text)
      this.length = this.searchcars.length
      this.cars = this.searchcars.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
  }
}
</script>

<style>

</style>