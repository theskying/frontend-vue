<template>
    <div>
      <h1>欢迎你 {{userName}}</h1>
      <router-view></router-view>
      <!--路由之间的跳转-->
      <router-link to="login" style="font-size: 20px">回到登录</router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {
      token: sessionStorage.getItem('token'),
      userName: sessionStorage.getItem('userName')
    }
  },
  methods: {
    load: function () {
      console.log('token信息:' + this.token)
    }
  }

}
</script>
<style scoped>

</style>
