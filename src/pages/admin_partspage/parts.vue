<template>
  <div>
    <div id="search_header">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="showallcarparts">所有</button>
      </div>
      <input type="text" placeholder="输入组件号或者类型查询" v-model="search">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="searchpart(1)">组件id搜索</button>
        <button type="button" class="btn btn-default" @click="searchpart(2)">组件类型搜索</button>
      </div>
    </div>
    <label for="result">库存：{{length}} 件</label>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>组件号</td>
            <td>组件类别</td>
            <td>组件型号</td>
            <td>组件价格</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(part, index) in parts" :key="index">
            <td>{{part.id}}</td>
            <td>{{part.type}}</td>
            <td>{{part.modelString}}</td>
            <td>{{part.price}}</td>
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
      allcarparts: [],
      searchparts: [],
      parts:[],
      pageindex: 0,
      length: 0,
      indexstr: [],
      search: '',
    }
  },
  async mounted () {
    await this.$store.dispatch('getAllCarParts')
    this.allcarparts = this.$store.state.carparts
    this.length = this.allcarparts.length
    this.searchparts = this.allcarparts
    this.parts = this.searchparts.slice(0,10)
    for(let i = 0; i<this.length/10; i++){
      this.indexstr[i] = i;
    }
  },
  methods: {
    nextpage(){
      this.pageindex++
      if(this.pageindex>=this.length/10)this.pageindex--
      this.parts = this.searchparts.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    prevpage(){
      this.pageindex--
      if(this.pageindex<0)this.pageindex++
      this.parts = this.searchparts.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    indexpage(index){
      this.pageindex = index
      this.parts = this.searchparts.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    showallcarparts(){
      this.search = ''
      this.searchparts = this.allcarparts
      this.length = this.searchparts.length
      this.parts = this.searchparts.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    searchpart(type=1,text=this.search){
      if(type==1)this.searchparts = this.allcarparts.filter((item)=>item.id == text)
      else  if(type==2)this.searchparts = this.allcarparts.filter((item)=>item.type == text)
      this.length = this.searchparts.length
      this.parts = this.searchparts.slice(0,10)
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