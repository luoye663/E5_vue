<template>
    <div>
        <div>
            <Icon v-on:click="githubLogin" type="logo-github" size="80" style="margin: 10% auto;width:100%"/>
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=32 class="demo-spin-icon-load"></Icon>
            <div>正在获取登录地址,请稍后......</div>
        </Spin>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      href: '',
      spinShow: false
    }
  },
  methods: {
    githubLogin () {
      window.location.href = this.href
    }
  },
  mounted () {
    let _this = this
    _this.spinShow = true
    _this.$axios.get('/auth2/getGithubUrl', {
    })
      .then(function (res) {
        if (res.data.code !== 0) {
          _this.msg = res.data.msg
          return
        }
        _this.href = res.data.data
        _this.spinShow = false
      }).catch(function (error) {
        if (!error.response) {

        }
      })
  }
}
</script>

<style scoped>

</style>
