<template>
  <div>
      <div id="info_container">
          <div>工号：{{worker.id}}</div>
          <div>姓名：{{worker.name}}</div>
          <div>性别：{{worker.sex}}</div>
          <div>年龄：{{worker.age}}</div>
          <div>职位：{{worker.position}}</div>
          <div>薪水：{{worker.salary}}</div>
          <div>入职时间：{{worker.join_time}}</div>
          <button class="btn btn-warning" @click.stop="pwdShow=true">修改密码</button>
      </div>
      <div id="pwd_page" :class="{showPwdPage:!pwdShow}">
        <form @submit.prevent="submitPwd">
          <div class="form-group">
            <label >原密码</label>
            <input type="password" class="form-control"  placeholder="原密码" v-model="oldpwd" required>
          </div>
          <div class="form-group">
            <label >新密码</label>
            <input type="password" class="form-control"  placeholder="新密码" v-model="newpwd1" minlength="5" required>
          </div>
          <div class="form-group">
            <label >确认新密码</label>
            <input type="password" class="form-control"  placeholder="确认新密码" v-model="newpwd2" minlength="5" required>
          </div>
          <button type="submit" class="btn btn-default">确认</button>
          <button type="button" class="btn btn-default" @click="pwdShow=false">取消</button>
        </form>
      </div>
  </div>
</template>

<script>
import {reqWorkerUpdpwd} from '../../api'
export default {
    data () {
        return {
            pwdShow:false,
            worker: {},
            oldpwd: '',
            newpwd1:'',
            newpwd2:''
        }
    },
    async mounted () {
        this.worker = await this.$store.state.workeruser
    },
    methods: {
      async submitPwd(){
        if(this.oldpwd != this.worker.password)return alert("原密码不正确")
        if(this.newpwd1 != this.newpwd2)return alert("两次密码不一致")
        this.worker.password = this.newpwd2
        const result = await reqWorkerUpdpwd(this.worker)
        if(result.code == 0||result == null)return alert(result.message)
        alert(result.message)
        this.pwdShow = false
      }
    }
}
</script>

<style lang="less">
#info_container{
    height: 50vh;
    width: 30vw;
    background-color: rgba(250, 209, 216, 0.5);
    border-radius: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    div{
        width: 180px;
        height: 50px;
        text-align: center;
        font-size: 24px;
        margin-top: 10px;
        &:nth-child(7){
            width: 400px;
        }
    }
}
#pwd_page{
    width: 600px;
    height: 500px;
    background-color: rgb(154, 154, 250);
    border-radius: 40px;
    padding: 100px 50px;
    position: fixed;
    top: 100px;
    z-index: 500;
    transition: all .5s;
}
.showPwdPage{
    top:-1000px !important;
}
</style>