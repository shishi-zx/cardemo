<template>
  <div class="clearfix">
      <div id="view_container">
        <div id="installcar_container">
          <form @submit.prevent="installcar">
            <div class="form-group">
              <label for="exampleInputEmail1">选择品牌</label>
              <select class="form-control" ref="t" v-model="type">
                <option value="0">未选择</option>
                <option value="大众">大众</option>
                <option value="长安">长安</option>
                <option value="玛莎">玛莎</option>
                <option value="奥迪">奥迪</option>
                <option value="奔驰">奔驰</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">车辆型号</label>
              <input class="form-control" type="text" placeholder="点击型号自动生成" readonly :value="modelString" @click="modelString=randomString()">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">选择大小</label>
              <select class="form-control" v-model="size">
                <option value="0">未选择</option>
                <option value="S">S</option>
                <option value="L">L</option>
                <option value="M">M</option>
              </select>
            </div>
            <br><br>
            <button type="submit" class="btn btn-success">组装</button>
            <button type="button" class="btn btn-warning" @click="size=0,type=0,modelString=''">取消</button>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import {reqInsCar} from '../../api'
export default {
  data () {
    return {
      type: '0',
      modelString: '',
      size: '0'
    }
  },
  methods: {
    async installcar(){
      const {type,modelString,size} = this
      if(type == 0 || size ==0 || modelString == '')
      {
        alert('请选择车辆品牌和型号')
        return
      }
      let price = 0
      type=="大众"?price=250000:type=="玛莎"?price=550000:price=100000;
      size=='M'?price+=86500:size=='L'?price+=149500:price+=0
      let data =
        {
          type,
          modelString,
          size,
          price
        }
      const result = await reqInsCar(data)
      if(result.code==1){
        this.size=0
        this.type=0
        this.modelString=''
      }
      alert(result.message)
    },
    randomString(){
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let newstr = ''
      for(let i=0;i<6;i++){
        newstr += str.charAt(Math.floor(Math.random()*26))
      }
      return newstr
    }
  }
}
</script>

<style lang="less">
#view_container{
  perspective: 800px;
}
#installcar_container{
  width: 60%;
  height: 400px;
  border-radius: 40px;
  margin: 60px auto;
  padding: 50px;
  background: aqua;
  transition: all .5s;
  &:hover{
    transform: translateZ(20px);
    box-shadow: 0 0 10px 10px rgb(190, 219, 219); 
  }
}
</style>