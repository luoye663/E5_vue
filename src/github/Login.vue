<template>
    <div>
        <div>
            <Icon v-on:click="githubLogin" type="logo-github" size="80" style="margin: 10% auto;width:100%"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      href: ''
    }
  },
  methods: {
    githubLogin () {
      window.location.href = this.href
    }
  },
  mounted () {
    let _this = this
    _this.$axios.get('/auth2/getGithubUrl', {
    })
      .then(function (res) {
        if (res.data.code !== 0) {
          _this.msg = res.data.msg
          return
        }
        _this.href = res.data.data
      }).catch(function (error) {
        if (!error.response) {

        }
      })
  }
}
</script>

<style scoped>

</style>
