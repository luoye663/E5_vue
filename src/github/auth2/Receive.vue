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
