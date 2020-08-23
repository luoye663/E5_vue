export default {
  getUrlKey: function (name) {
    let da = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)
    if (da === null) {
      return null
    }
    let uk = da[1].replace(/\+/g, '%20')
    return uk
  },
  getTime () {
    return Math.round(new Date().getTime() / 1000)
  }
}
