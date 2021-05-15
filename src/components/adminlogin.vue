<template>
<div>
    <div id="loginWeb" class="clearfix" ref="WebPage">
    <form id="login_form" @submit.prevent="submitForm" method="post">
      <div class="form-group">
        <label>账号</label>
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
    <div id="littlecuter" ref="littlecuter" :style="styleData">
    </div>
  </div>
</div>
</template>

<script>
import {reqAdminLogin} from '../api'
export default {
    data () {
        return {
            admin: '',
            password: '',
            styleData:{
              top: '100px',
              left: '100px',
              transform: 'rotateY(0deg) rotateZ(45deg)',
            }
        }
    },
    methods: {
        async submitForm(){
            const result = await reqAdminLogin({
                admin:this.admin,
                password:this.password
            })
            if(result.code!=1)return alert('服务器错误请稍后重试')
            if(result.data==null)return alert('密码错误或者用户不存在')
            await this.$store.dispatch('setAdminUser',result.data)
            this.$router.push('admin')
        }
    },
    mounted() {
      let Car = this.$refs.littlecuter
      let Page = this.$refs.WebPage
      let Style = this.styleData
      let x, y, direction,deg,dx,dy
      Page.addEventListener('mousemove', (e) => {
        //计算位置
        x = e.clientX
        y = e.clientY
        //计算方向
        dx = x - Car.offsetLeft
        dy = y - Car.offsetTop
        dx>0?direction = 180:direction = 0
        dx>0?dx=dx:dx=-dx
        deg=Math.atan(-dy/dx)
        deg=deg*180/Math.PI
        Style.transform = `rotateY(${direction}deg) rotateZ(${deg}deg)`
        
      })
      Page.addEventListener('click', (e) => {
        Style.top = '' + (y+5) + 'px'
        Style.left = ''+ (x+5) + 'px'
      })
    }
}
</script>

<style>
#littlecuter{
  position: fixed;
  height: 35px;
  width: 80px;
  top: 200px;
  left: 200px;
  transition: all .1s,top 2s,left 2s ;
  background-image: url('../../static/img/car.png');
  background-size: contain;
}
#loginWeb {
  height: 100vh;
  background-image: url('../../static/img/1.jpg');
  background-attachment: fixed;
  background-size: cover;
}
#login_form {
  width: 600px;
  padding: 20px;
  background: rgb(231, 99, 231, 0.4);
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
        box-shadow: 0 0 100px 90px rgb(240, 203, 135);
    }
}
</style>