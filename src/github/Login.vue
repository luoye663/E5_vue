<template>
    <div>
        <div>
            <Icon v-on:click="githubLogin" type="logo-github" size="80" style="margin: 10% 50% 0 50%"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    githubLogin () {
      window.location.href = ''
    }
  }
}
</script>

<style scoped>

</style>
