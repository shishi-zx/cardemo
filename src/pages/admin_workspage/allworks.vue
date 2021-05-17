<template>
  <div>
    <div id="search_header">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="showallworks">所有</button>
      </div>
      <input type="text" placeholder="输入工号或者姓名查询" v-model="search">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="searchwork(1)">工号搜索</button>
        <button type="button" class="btn btn-default" @click="searchwork(2)">姓名搜索</button>
        <button type="button" class="btn btn-default" @click="searchwork(3)">职务搜索</button>
      </div>
       <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="sortworks(2)">年龄排序</button>
        <button type="button" class="btn btn-default" @click="sortworks(1)">薪水排序</button>
      </div>
    </div>
    <label for="result">结果：{{length}} 人</label>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>工号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>职务</td>
            <td>薪水</td>
            <td>入职时间</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(work, index) in works" :key="index">
            <td>{{work.id}}</td>
            <td>{{work.name}}</td>
            <td>{{work.sex}}</td>
            <td>{{work.age}}</td>
            <td>{{work.position}}</td>
            <td>{{work.salary}}</td>
            <td>{{work.join_time}}</td>
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
      allworks: [],
      searchworks: [],
      works:[],
      pageindex: 0,
      length: 0,
      indexstr: [],
      search: '',
      isReverse: false
    }
  },
  async mounted () {
    await this.$store.dispatch('getAllWorks')
    this.allworks = this.$store.state.works
    this.allworks.forEach(item=>
    {
      item.sex==1?item.sex='女':item.sex='男'
      item.join_time = item.join_time.slice(0,10)
    })
    this.length = this.allworks.length
    this.searchworks = this.allworks
    this.works = this.searchworks.slice(0,10)
    for(let i = 0; i<this.length/10; i++){
      this.indexstr[i] = i;
    }
  },
  methods: {
    nextpage(){
      this.pageindex++
      if(this.pageindex>=this.length/10)this.pageindex--
      this.works = this.searchworks.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    prevpage(){
      this.pageindex--
      if(this.pageindex<0)this.pageindex++
      this.works = this.searchworks.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    indexpage(index){
      this.pageindex = index
      this.works = this.searchworks.slice(this.pageindex*10,(this.pageindex+1)*10)
    },
    showallworks(){
      this.search = ''
      this.searchworks = this.allworks
      this.length = this.searchworks.length
      this.works = this.searchworks.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    searchwork(type=1,text=this.search){
      if(type==1)this.searchworks = this.allworks.filter((item)=>item.id == text)
      else  if(type==2)this.searchworks = this.allworks.filter((item)=>item.name == text)
      else  if(type==3)this.searchworks = this.allworks.filter((item)=>item.position == text)
      this.length = this.searchworks.length
      this.works = this.searchworks.slice(0,10)
      this.indexstr = []
      for(let i = 0; i<this.length/10; i++){
        this.indexstr[i] = i;
      }
    },
    sortworks(type=1){
      if(type == 1)this.searchworks = this.allworks.sort((a,b)=>a.salary-b.salary)
      if(type == 2)this.searchworks = this.allworks.sort((a,b)=>a.age-b.age)
      this.isReverse = !this.isReverse
      if(this.isReverse)this.searchworks = this.searchworks.reverse()
      this.works = this.searchworks.slice(0,10)
    }
  }
}
</script>

<style lang="less">
#search_header{
  margin:0 20px;
  input{
    height: 30px;
  }
}
</style>