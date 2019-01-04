<template  style="width: 300px;text-align: center">
  <div>
    <div style="text-align: center;width: 100%; margin: 15px -35px ;">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%;text-align: center" v-loading="loading">
        <el-form-item label="账户" prop="name"  style="width: 350px;margin: 10px auto">
          <el-input v-model="ruleForm2.email"></el-input>
        </el-form-item >
        <el-form-item label="密码" prop="name"  style="width: 350px;margin: 0 auto">
          <!--这里使用回车监听事件-->
          <el-input v-model="ruleForm2.pwd" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <br>
        <br>
        <el-form-item>
            <el-button type="primary" @click="skipRegister">现在注册?</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="height: 150px;">
      <p style="font-size: 10px; position: absolute; bottom: 10px; right: 40%;">网站备案许可证号：鲁ICP备18053593号</p>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      ruleForm2: {
        // 设置默认值
        email: '',
        pwd: ''
      },
      loading: false
    }
  },
  methods: {
    login: function () {
      this.loading = true
      var params = new URLSearchParams()
      params.append('email', this.ruleForm2.email)
      params.append('password', this.ruleForm2.pwd)
      this.axios.post('/openapi/user/userLogin', params).then(resp => {
        if (resp && resp.data.success === true) {
          console.log(resp.data.msg)
          sessionStorage.setItem('token', resp.data.obj.token)
          sessionStorage.setItem('userName', resp.data.obj.userName)
          // 推到下一个 test 页面
          this.$router.push('test')
          // 保存token到 sessionStorage中
        } else {
          this.$message.error('登陆错误')
        }
        this.loading = false
      })
    },
    skipRegister: function () {
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>

</style>
