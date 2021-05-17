<template>
<div>
    <div id="loginWeb" class="clearfix" ref="WebPage">
      <div id="select_login" @click.stop=";" :class="{scalepage: !firstPage}">
        <label>汽车总装车间管理系统</label>
        <button class="btn btn-info btn-lg" @click="firstPage=false,usertype='管理员'">管理员登陆</button>
        <button class="btn btn-info btn-lg" @click="firstPage=false,usertype='职工'">职工登录</button>
      </div>
      <div id="center_div" :class="{scalepage: firstPage}" class="clearfix">
        <AdminLogin :usertype="usertype"></AdminLogin>
      </div>  
    <div id="littlecuter" ref="littlecuter" :style="styleData">
    </div>
  </div>
  <div id="float_div" :class="{out_float: !firstPage}">
    <button class="btn btn-info btn-lg" @click="firstPage=true" >选择登录方式</button>
  </div>
</div>
</template>

<script>
import AdminLogin from '../pages/adminloginpage'
export default {
    data () {
        return {
            firstPage:true,
            usertype: "管理员",
            styleData:{
              top: '100px',
              left: '100px',
              transform: 'rotateY(0deg) rotateZ(45deg)',
            }
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
    },
    components: {
      AdminLogin
    }
}
</script>

<style lang="less">
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
#select_login{
  background-color: rgba(114, 171, 235, 0.7);
  box-shadow: -15px 15px 10px  rgba(58, 129, 126, 0.7);
  border-radius: 50px;
  width: 400px;
  height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  transition: all .5s;
  label{
    display: block;
    font-size: 30px;
    margin:50px 40px;
  }
  button{
   background-image: linear-gradient(10deg,rgb(186, 186, 245),
  rgb(87, 157, 248),
  rgb(87, 248, 135),
  rgb(219, 238, 134),
  rgb(241, 87, 229),
  rgb(241, 134, 233));
  &:hover{
    opacity: 1;
    box-shadow: 0 0 20px 1px pink;
  }
  opacity: .7;
    border:lightpink solid 1px;
    font-size: 30px;
    color: rgb(70, 70, 43);
    display: block;
    width: 200px;
    height: 100px;
    margin: 60px auto;
    border-radius: 30px;
  }
}
#center_div{
  /* transform: rotateZ(100deg); */
  // background-color: rosybrown;
  transition: width .8s ;
  transition-delay: .5s;
  height: 1000px;
  width: 900px;
  overflow: hidden;
  margin: 0 auto;
}
#float_div{
  position: fixed;
  top: 200px;
  left: -2000px;
  transition: all .8s ;
  transition-delay: .5s;
  button{
    box-shadow: 0 0 70px 30px rgb(111, 195, 235);
  }
}
.scalepage{
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  transform: rotateZ(720deg) !important;
}
.out_float{
  left: 170px !important;
  transform: rotateZ(14400deg) !important;
}
</style>