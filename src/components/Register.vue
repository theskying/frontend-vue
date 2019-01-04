<template>
  <div>
    <div style="text-align: center;width: 100%; margin: 15px -35px ;">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%;text-align: center" v-loading="loading">
        <el-form-item label="邮箱" prop="name"  style="width: 350px;margin: 10px auto">
          <el-input v-model="email" placeholder="邮箱地址"></el-input>
        </el-form-item >
        <br>
        <el-form-item label="密码" prop="name"  style="width: 350px;margin: 0 auto">
          <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="确认密码" prop="name"  style="width: 350px;margin: 0 auto">
          <el-input v-model="checkPwd" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="用户名" prop="name"  style="width: 350px;margin: 0 auto">
          <el-input v-model="userName" placeholder="您的名字"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="验证码" prop="name" style="width: 36.2%;margin: 0px 37%">
          <!--这里使用回车监听事件-->
          <el-input v-model="code" placeholder="邮箱验证码" style="width: 65%;float: left;" @keyup.enter.native="register"></el-input>
          <!--获得验证码按钮-->
          <el-button type="primary" v-bind:disabled="show" @click="getCode" style="font-size: 5px; width: 25%">{{getcode}}</el-button>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="register" style="width: 20%;" >注册</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      getcode: '获取验证码',
      show: false,
      email: '',
      pwd: '',
      checkPwd: '',
      userName: '',
      code: '',
      loading: false,
      timer: null,
      count: ''
    }
  },
  methods: {
    // 获得验证码
    getCode: function () {
      if (this.email === '') {
        this.$message.error('请输入邮箱地址')
        return
      }
      // 设置按钮时间
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            // 如果倒计时为 0，重新渲染为"获取验证码"
            if (this.count === 0) {
              this.getcode = '获取验证码'
            } else {
              this.getcode = this.count
            }
          } else {
            this.show = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      var params = new URLSearchParams()
      params.append('email', this.email)
      this.axios.post('/openapi/user/sendHtmlEmail', params).then(resp => {
        if (resp && resp.data.code === 1) {
          alert('已成功发送邮件！')
          console.log(resp.data.msg)
        } else if (resp.data.code === -2) {
          this.$message.error('邮箱地址错误!')
        } else if (resp.data.code === -1) {
          this.$message.error('此账户已注册!')
        }
      })
    },
    // 注册
    register: function () {
      // 启动加载动画
      this.loading = true
      // 封装post请求信息
      var params = new URLSearchParams()
      params.append('email', this.email)
      params.append('password', this.pwd)
      params.append('checkPassword', this.checkPwd)
      params.append('userName', this.userName)
      params.append('code', this.code)
      // 向注册接口发送请求
      this.axios.post('/openapi/user/userRegister', params).then(resp => {
        // 请求回调，停止加载动画
        this.loading = false
        // 根据返回的值，向用户反馈信息
        if (resp && resp.data.code === 1) {
          this.$router.push('login')
        } else if (resp.data.code === -1) {
          this.$message.error('验证码失效!')
        } else if (resp.data.code === -2) {
          this.$message.error('两次密码不一致!')
        } else if (resp.data.code === -3) {
          this.$message.error('该用户已经注册!')
        } else if (resp.data.code === -5) {
          this.$message.error('验证码错误!')
        } else {
          this.$message.error('请输入正确信息!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
