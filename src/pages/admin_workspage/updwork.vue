<template>
  <div @click="showall">
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
    </div>
    <label for="result">结果：{{length}} 人</label>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>操作</td>
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
            <td><button class="btn btn-success btn-xs" @click.stop="updata(work)">更新</button>
            </td>
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
      <div id="updata_page" :class="{showuppage:!isShowuppage}" @click.stop="">
        <form>
          <div class="form-group">
            <label >{{upwork.name}} 员工</label>
          </div>
          <div class="form-group">
            <label >年龄</label>
            <input type="number" class="form-control"  placeholder="number" v-model="upwork.age">
          </div>
          <div class="form-group">
            <label >职务</label>
            <input type="text" class="form-control"  placeholder="职务"  v-model="upwork.position">
          </div>
          <div class="form-group">
            <label >薪水</label>
            <input type="number" class="form-control"  placeholder="薪水"  v-model="upwork.salary">
          </div>
          <button type="button" class="btn btn-default" @click="upAjax">确认</button>
          <button type="button" class="btn btn-default" @click="isShowuppage=false">取消</button>
        </form>
      </div>
  </div>
</template>

<script>
import {reqUpWork} from '../../api'
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
      isShowuppage: false,
      upwork: {},
      upworkorigin:{}//指向原来更改的对象

    }
  },
  async mounted () {
    await this.$store.dispatch('getAllWorks')
    this.allworks = this.$store.state.works
    this.allworks.forEach(item=>item.sex==1?item.sex='女':item.sex='男')
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
    updata(p){
      this.isShowuppage=true
      this.upwork = {
        id:p.id,
        name:p.name,
        sex: p.sex,
        age:p.age,
        position:p.position,
        salary:p.salary,
        join_time:p.join_time
      };
      this.upworkorigin = p
    },
    showall(){
      this.isShowuppage=false
    },
    async upAjax(){
      const result = await reqUpWork(this.upwork)
      this.isShowuppage=false
      if(result.code==1)
      {
        //将数据显示更改为更新后的值
        for (const key in this.upworkorigin) {
          this.upworkorigin[key] = this.upwork[key]
        }
        return alert(result.message)
      }
      alert(result.message)
    }
  }
}
</script>

<style lang="less">
#updata_page{
  background: rgb(186, 247, 247);
  box-shadow: 0 0 10px 10px rgb(204, 241, 241);
  border-radius: 10%;
  transition: all 0.6s;
  padding: 20px;
  width: 400px;
  height: 330px;
  position:fixed;
  top:180px;
  left: 500px;
}
.showuppage{
  top:-1000px !important;
}
</style>