<template>
  <section class="ppt" @click="back">
    <transition
      enter-active-class='animated swing fadeIn'
      leave-active-class='animated shake fadeOut'
    >
      <div v-show="show" class="big_img" @click.stop="change_size('small')">
        <img :src="currenImgs.currenImg[num].imgUrl">
      </div>
    </transition>
    <div class="previous_img">
      <div @click.stop="pre_img" class="iconfont" title="上一张"></div>
    </div>
    <div class="img_box">
      <img @click.stop="change_size('big')" :src="currenImgs.currenImg[num].imgUrl">
      <div class="pages iconfont">
        {{'&#xe603;&nbsp;&nbsp;' + (num + 1) + '&nbsp;/&nbsp;' + sumImg}}
      </div>
      <!-- <a
        :href="currenImgs.currenImg[num].imgUrl"
        :download="currenImgs.currenImg[num].imgIntro"
        class="download"
        @click.stop="download_img"
      >
        <span class="iconfont">&#xe69b;</span>
        <span>下载图片</span>
      </a> -->
    </div>
    <div class="next_img">
      <div @click.stop="next_img" class="iconfont" title="下一张"></div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ImgPpt',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      img: '',
      num: 0,
      show: false
    }
  },
  computed: {
    ...mapState({
      currenImgs: 'imgData'
    }),
    sumImg () {
      return this.currenImgs.currenImg.length
    }
  },
  methods: {
    // async download_img () {
    //   let a = window.open(this.currenImgs.currenImg[this.num].imgUrl)
    //   a.document.execCommand('Save', true, '乐享图片')
    //   a.window.close()
    //   return false
    //   // let response = this.$axios.getHttp(this.currenImgs.currenImg[this.num].imgUrl)
    //   // console.log(response)
    //   // try {
    //   //   let a = document.createElement('a')
    //   //   let event = new MouseEvent('click')
    //   //   a.download = '乐享壁纸'
    //   //   a.href = this.currenImgs.currenImg[this.num].imgUrl
    //   //   a.dispatchEvent(event)
    //   // } catch (error) {
    //   //   console.log(error)
    //   //   return 0
    //   // }
    // },
    back () { // 返回
      this.$emit('back', false)
    },
    change_size (status) { // 放大缩小图片
      if (status === 'big') {
        this.show = true
      } else {
        this.show = false
      }
    },
    pre_img () { // 上一张
      if (this.num > 0) {
        this.num -= 1
      }
    },
    next_img () { // 下一张
      if (this.num < 11) {
        this.num += 1
      }
    }
  },
  created () {
    this.num = this.index
  }
}
</script>

<style lang="stylus" scoped>
  changeBtn(){
    position: relative
    width: 200px
    height: 563px
    .iconfont{
      cursor: pointer
      position: absolute
      top: calc(50% - 95px)
      width: 130px
      height: 150px
    }
  }
  .ppt{
    position: absolute
    width: 100%
    display: flex
    height: 100%
    z-index: 100
    .big_img{
      cursor: zoom-out
      position: absolute
      left: 0
      top: 0
      z-index: 999
      width: 1920px
      height: 1080px
      background: blue
      img{
        width: 100%
        height: 100%
      }
    }
    .previous_img{
      changeBtn()
      margin: calc(50% - 800px) 0 auto auto
      .iconfont{
        right: 0
        background:url('../assets/images/pre.png') no-repeat 50% / 3rem 3rem
        background-position: .1rem
      }
    }
    .next_img{
      margin: calc(50% - 800px) auto auto 0
      changeBtn()
      .iconfont{
        left: 0
        background:url('../assets/images/next.png') no-repeat 50% / 3rem 3rem
        background-position: .1rem
      }
    }
    .img_box{
      user-select none
      position: relative
      margin: calc(50% - 800px) 0 auto 0
      width: 1000px
      height: 563px
      img{
        cursor: zoom-in
        width: 100%
        height: 100%
      }
      .pages{
        position: absolute
        bottom: -30px
        font-size: .4rem
        left: calc(50% - 30px)
        color: white
      }
      .download{
        background: rgb(252,211,0) linear-gradient(
          hsla(0,0%,100%,.4), transparent
        )
        border: 1px solid rgb(252,211,0)
        cursor: pointer
        position: absolute
        bottom: -32px
        width: 100px
        height: 30px
        display: flex
        text-decoration: none
        align-items: center
        justify-content: center
        right: 0
        color: rgb(50,50,50)
        .iconfont{
          font-size: .45rem
        }
      }
      .download:active{
        border: 1px solid rgb(252,100,0)
      }
    }
  }
  .ppt::before{
    content: ''
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    background: rgba(0,0,0,.7)
  }
</style>
