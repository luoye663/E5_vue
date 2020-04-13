<template>
    <div>授权结果
        <button v-on:click="login()"> 登录</button>
        <button v-on:click="show()"> 显示</button>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Spin  fix v-if="spinShow">
            <Icon type="ios-loading" size=32 class="demo-spin-icon-load"></Icon>
            <div>正在登录</div>
        </Spin>
    </div>
</template>

<script>

export default {
  name: 'Receive',
  data () {
    return {
      spinShow: false
    }
  },
  methods: {
    login () {
      let _this = this
      _this.$axios({
        method: 'get',
        url: '/auth2/receive',
        params: {
          code: _this.$utils.getUrlKey('code'),
          state: _this.$utils.getUrlKey('state')
        }
      }).then(res => {
        console.log(res.data)
        let userToken = res.data.data.token
        console.log(userToken)
        // 将用户token保存到vuex中
        _this.$store.commit('changeLogin', { token: userToken,
          username: 'test'})
        // _this.changeLogin({ token: userToken })
        // _this.$router.push('/home')
        console.log('登陆成功')
      }).catch(error => {
        console.log('账号或密码错误')
        console.log(error)
      })
      console.log(this.$utils.getUrlKey('code'))
    },
    show () {
      this.spinShow = !this.spinShow
    }
  }
}
</script>

<style scoped>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
