<template>
  <div>
    <form @submit.prevent="ajaxwork">
      <div class="form-group">
        <label >姓名</label>
        <input
          type="text"
          class="form-control"
          placeholder="新添加员工的名字"
          minlength="2"
          required
          v-model="name"
        />
      </div>
      <label>性别</label>
      <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" checked  ref="sex"> 男
      </label>
      <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" > 女
      </label>
      <div class="form-group">
        <label >年龄</label>
        <input
          type="number"
          class="form-control"
          placeholder="员工年龄"
          required
          v-model="age"
        />
      </div>
      <div class="form-group">
        <label >职务</label>
        <input
          type="text"
          class="form-control"
          placeholder="员工职务"
          minlength="2"
          required
          v-model="position"
        />
      </div>
      <div class="form-group">
        <label >薪水</label>
        <input
          type="number"
          class="form-control"
          placeholder="员工工资"
          required
          v-model="salary"
        />
      </div>
      <div class="col-sm-10">
        <button  type="submit" class="btn btn-success">确认添加</button>
        <button class="btn btn-warning" type="button" @click="clearcontent">清空</button>
      </div>
    </form>
  </div>
</template>

<script>
import {reqAddWork} from '../../api'
export default {
  data () {
    return {
      name: '',
      sex: '0',
      age: '',
      position: '',
      salary: ''
    }
  },
  methods: {
    async ajaxwork(){
      let {name,sex,age,position,salary,clearcontent} = this
      if(!this.$refs.sex.checked)sex='1'
      let worker = {
        name,
        sex,
        age,
        position,
        salary
      }
      //提交异步请求
      const result = await reqAddWork(worker)
      alert(result.message)

      clearcontent()
    },
    clearcontent(){
      this.name = ''
      this.sex = '0'
      this.age = ''
      this.position = ''
      this.salary = ''
    }
  }
}
</script>

<style>
</style>