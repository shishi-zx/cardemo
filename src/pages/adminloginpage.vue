<template>
  <form id="login_form" @submit.prevent="submitForm" method="post" @click.stop=";">
      <div class="form-group">
        <label>{{usertype}}账号</label>
        <input
          type='text'
          class="form-control"
          placeholder="账号"
          v-model="admin"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">密码</label>
        <input
          type="password"
          class="form-control"
          placeholder="密码"
          v-model="password"
          required
        />
      </div>
      <div id="button_container" class="clearfix">
        <button id="submit" type="submit" class="btn btn-default">登录</button>
      </div>
    </form>
</template>

<script>
import {reqAdminLogin,reqWorkerLogin} from '../api'
export default {
  props:{
    usertype:{
      type:String,
      required:true
    }
  },
    data () {
        return {
            admin: '',
            password: '',
        }
    },
    methods: {
        async submitForm(){
          let result = {}
          if(this.usertype == "管理员"){
            result = await reqAdminLogin({
                admin:this.admin,
                password:this.password
            })
          }else{
            //职工登录
            result = await reqWorkerLogin({
                name:this.admin,
                password:this.password
            })
          }
          if(result.code!=1||result.data==null)return alert(result.message)
          if(this.usertype=="管理员"){
            await this.$store.dispatch('setAdminUser',result.data)
            this.$router.push('admin')
          }
          else{
            await this.$store.dispatch('setWorkerUser',result.data)
            this.$router.push('worker')
          }          
        }
    },
}
</script>

<style>
#login_form {
  color: rgb(180, 226, 72);
  width: 600px;
  padding: 20px;
  background: rgb(231, 99, 231, .4);
  margin: 150px auto;
  border-radius: 30px;
  box-shadow: 0 0 100px 30px wheat;
  animation: login 3s infinite linear alternate running;
}
#login_form input {
  background-color: rgb(125, 196, 224, 0.5);
}
#login_form input:focus {
  background-color: rgb(125, 196, 224);
  color: yellow;
}
#button_container {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
}
#btn_exit,
#submit {
  width: 200px;
  background: rgba(196, 241, 111, 0.5);
  border-radius: 15px;
}
#btn_exit:hover,
#submit:hover {
  width: 200px;
  background: rgba(214, 68, 124, 0.8);
  box-shadow: 0 0 100px 10px violet;
}
#btn_exit {
  right: 0;
}
@keyframes login {
    from{
        opacity: 1;
        box-shadow: 0 0 30px 10px wheat;
    }
    to{
        opacity: 0.8;
        box-shadow: 0 0 90px 50px rgb(240, 203, 135);
    }
}
</style>