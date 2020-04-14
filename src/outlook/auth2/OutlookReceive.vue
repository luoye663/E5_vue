<template>
    <div>
        <p size="80" style="margin: 10% auto;width:100%">{{msg}}</p>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=32 class="demo-spin-icon-load"></Icon>
            <div>正在获取授权状态......</div>
        </Spin>
        <div>
            <!--对话框-->
            <Modal
                    v-model="modal1"
                    title="Common Modal dialog box title"
                    @on-ok="ok"
                    @on-cancel="cancel">
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </Modal>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Receive',
  data () {
    return {
      msg: '',
      spinShow: false,
      modal1: false
    }
  },
  mounted () {
    let _this = this
    _this.spinShow = true
    setTimeout(() => {
      // adsa

      if (_this.$utils.getUrlKey('code') === null || _this.$utils.getUrlKey('state') === null || _this.$utils.getUrlKey('session_state') === null) {
        _this.msg = '缺少参数!'
        return
      }
      _this.$axios.get('/outlook/auth2/receive', {
        params: {
          code: _this.$utils.getUrlKey('code'),
          state: _this.$utils.getUrlKey('state'),
          session_state: _this.$utils.getUrlKey('session_state')
        }
      })
        .then(function (res) {
        // 关闭加载框
          _this.spinShow = false
          _this.modal1 = true
          if (res.data.code !== 0) {
            _this.msg = res.data.msg
            return
          }
          _this.msg = '授权成功!'
        }).catch(function (error) {
          if (!error.response) {

          }
        })
    }, 2000)
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

<style scoped>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
