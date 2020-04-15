<template>
    <div>
        <Spin  fix v-if="spinShow">
            <Icon type="ios-loading" size=32 class="demo-spin-icon-load"></Icon>
            <div>正在登录</div>
        </Spin>
      <div>
        <!--对话框-->
        <Modal
          v-model="modal1"
          title="授权结果"
          @on-ok="ok"
          @on-cancel="cancel"
          cancel-text=""
          :mask-closable="false">
          <p>{{msg}}</p>
        </Modal>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Receive',
  data () {
    return {
      spinShow: false,
      modal1: false,
      msg: ''
    }
  },
  mounted () {
    let _this = this
    _this.spinShow = true
    setTimeout(() => {
      if (_this.$utils.getUrlKey('code') === null || _this.$utils.getUrlKey('state') === null) {
        _this.msg = '缺少参数!'
        // 关闭加载框
        _this.spinShow = false
        _this.modal1 = true
        return
      }
      _this.$axios({
        method: 'get',
        url: '/auth2/receive',
        params: {
          code: _this.$utils.getUrlKey('code'),
          state: _this.$utils.getUrlKey('state')
        }
      }).then(res => {
        if (res.data.code !== 0) {
          _this.spinShow = false
          _this.modal1 = true
          _this.msg = res.data.msg
          return
        }
        let userToken = res.data.data.token
        // 将用户token保存到vuex中
        _this.$store.commit('changeLogin', { token: userToken,
          username: res.data.data.username})
        _this.$router.push('/user/home')
        console.log('登陆成功')
      }).catch(error => {
        console.log('账号或密码错误')
        console.log(error)
      })
    }, 2000)
  },
  methods: {
    ok () {
      this.$router.push('/user/login')
    }
  }
}
</script>

<style scoped>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
