<template>
  <div id="App" ref="app">
    <router-view @change_img="change_img"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    change_img (catgory) {
      let img = new Image()
      if (catgory === 'comic') {
        img.src = '../static/images/back6.jpg'
        img.onload = () => this.$refs.app.style.background = "url(" + img.src + ") 0 / cover fixed no-repeat"
      } else if (catgory === 'animal') {
        img.src = '../static/images/back3.jpg'
        img.onload = () => this.$refs.app.style.background = "url(" + img.src + ") 0 / cover fixed no-repeat"
      } else if (catgory === 'game') {
        img.src = '../static/images/back8.jpg'
        img.onload = () => this.$refs.app.style.background = "url(" + img.src + ") 0 / cover fixed no-repeat"
      } else if (catgory === 'scenery') {
        img.src = '../static/images/back7.jpg'
        img.onload = () => this.$refs.app.style.background = "url(" + img.src + ") 0 / cover fixed no-repeat"
      } else {
        img.src = '../static/images/back5.jpg'
        img.onload = () => this.$refs.app.style.background = "url(" + img.src + ") 0 / cover fixed no-repeat"
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #App {
    min-width: 1380px
    position fixed
    width: 100%
    height: 100%
    background: url('../static/images/back5.jpg') 0 / cover fixed no-repeat
    transition: all .5s
  }
</style>
