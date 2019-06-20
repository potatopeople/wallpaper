<template>
  <section class="list">
    <ul>
      <li class="shelter" v-show="shelter"></li>
      <li
        v-for="(item, index) of currenData"
        :key="item.id"
        v-show="img"
        @click="check_img"
        :indexs="index"
      >
        <img :indexs="index" :src="item.imgUrl">
        <span :indexs="index" class="intro" :title="item.imgIntro">
          {{item.imgIntro}}
        </span>
      </li>
    </ul>
    <div class="page">
      <div @click="search" class="search iconfont">&#xe604;</div>
      <div class="home iconfont" @click="home">&#xe7a7;</div>
      <div class="next iconfont" @click="previous">&#xe636;</div>
      <div class="page_num">{{currenPage + 1 + '/' + sumPage}}</div>
      <div class="previous iconfont" @click="next">&#xe636;</div>
      <div class="end iconfont" @click="end">&#xe7a7;</div>
      <input v-model="goPage" @keydown="down" class="input" maxlength="3" type="text" placeholder="..."/>
      <div class="go iconfont" @click="goPages">Go</div>
    </div>
  </section>
</template>

<script>
import ImgPpt from './ppt'
export default {
  name: 'ImgList',
  components: {
    ImgPpt
  },
  data () {
    return {
      currenData: [], // 当前记录页数据
      currenPage: 0, // 当前页码
      pageSize: 12, // 每页记录数,
      goPage: '', // 跳转页码
      shelter: true,
      img: false
    }
  },
  computed: {
    imgData () { // 所有数据
      return this.$store.state.imgData.allImg
    },
    start () { // 每页记录开始索引
      return this.currenPage * this.pageSize
    },
    last () { // 每页记录结束索引
      return (this.currenPage + 1) * this.pageSize
    },
    sumPage () { // 总页码
      return Math.ceil(this.sumList / 12)
    },
    sumList () { // 总记录数
      return this.imgData.length
    }
  },
  methods: {
    search () { // 搜索
      this.$emit('search', true)
    },
    check_img () {
      let index = event.target.getAttribute('indexs')
      this.$emit('check_img', parseInt(index))
    },
    showData () { // 显示数据
      this.shelter = true
      this.img = false
      setTimeout(() => {
        this.shelter = false
        this.img = true
      }, 400)
      let data = this.imgData.filter((item, index) => {
        if (index >= this.start && index < this.last) {
          return item
        }
      })
      this.currenData = data
      this.$store.dispatch('get_curren_imgs', this.currenData)
    },
    down (e) {
      if (e.keyCode === 13) {
        this.goPages()
      }
    },
    goPages () { // 页码跳转
      let go = parseInt(this.goPage)
      if (go >= 1 && go <= this.sumPage) {
        this.currenPage = go - 1
        this.showData()
      } else {
        alert('error')
      }
      this.goPage = ''
    },
    home () { // 首页
      if (this.currenPage !== 0) {
        this.currenPage = 0
        this.showData()
      }
    },
    end () { // 尾页
      if (this.currenPage !== this.sumPage - 1) {
        this.currenPage = this.sumPage - 1
        this.showData()
      }
    },
    previous () { // 上一页
      if (this.currenPage > 0) {
        this.currenPage -= 1
        this.showData()
      }
    },
    next () { // 下一页
      if (this.currenPage < this.sumPage - 1) {
        this.currenPage += 1
        this.showData()
      }
    },
    async getData (catgory) { // 获取数据
      try {
        let response = await this.$axios.getHttp('/static/json/' + catgory + '.json')
        this.$store.dispatch('get_all_imgs', response.data.data)
        this.$store.dispatch('get_all_imgs2', response.data.data)
        this.showData()
      } catch (error) {
        console.log(error)
        return 0
      }
    }
  },
  mounted () {
    this.bus.$on('search_succes', () => {
      this.showData()
    })
    this.getData(this.$route.query.catgory)
    this.$emit('list', this.$route.query.catgory)
  }
}
</script>

<style lang="stylus" scoped>
  textCenter(){
    margin-top: .4rem
    font-size: .6rem
    width: 1.5rem
    height: 1.5rem
    border-radius: 10px
    display: flex
    align-items: center
    justify-content: center
  }
  #searchs{
    position: relative
  }
  .list {
    display: flex
    position: relative
    width: 1200px
    overflow: hidden
    height: 900px
    margin: auto
    ul {
      width: 1010px
      //display: flex
      padding: 0
      position: relative
      margin-top: .4rem
      //flex-wrap: wrap
      .shelter::before{
        position:absolute
        width: 1rem
        height: 1rem
        content: ''
        top: 45%
        left: 50%
        background-image: url('../assets/images/loading.gif')
        background-repeat: no-repeat
        background-size: 1rem 1rem
        mix-blend-mode: luminosity
      }
      .shelter{
        position: absolute
        background: rgba(200,200,200,.2)
        width: 96%
        height: 100%
        z-index: 2
      }
      li {
        height: 188px
        float: left
        width: 300px
        border: 7px solid transparent
        overflow: hidden
        position: relative
        margin: .2rem
        list-style: none
        background: repeating-linear-gradient(
                    -45deg,#99CCFF 0,#99CCFF 25%,
                    #CCFF99 0, #CCFF99 50%
                  ) 0 / .3rem .3rem
        animation: 20s linear infinite run
        @keyframes run {
          to {
          background-position: 100%
          }
        }
        img {
          background: rgb(50,50,50)
          width: 100%
          height: 100%
        }
        .intro{
          font-size: .3rem
          position: absolute
          bottom: -30px
          width: 100%
          color: black
          height: 30px
          text-overflow: ellipsis
          overflow: hidden
          text-align: center
          white-space: nowrap
          background: linear-gradient(to top, rgb(20,20,20),transparent)
          transition: all .3s
        }
      }
      li:hover{
        animation-play-state: paused
        cursor: pointer
        .intro{
          color: white
          bottom: 0
        }
      }
    }
    .page{
      margin-left: 1rem
      user-select: none
      position: relative
      top: .8rem
      .search{
        border: 1px solid rgb(107,240,1)
        cursor: pointer
        textCenter()
        font-size: 1.2rem
        background-color:rgb(107,240,1)
      }
      .search:active{
        border: 1px solid rgb(107,140,1)
      }
      .home{
        border: 1px solid rgb(13,240,250)
        transform: rotate(-90deg)
        cursor: pointer
        textCenter()
        color: rgb(44,26,237)
        background-color:rgb(13,240,250)
      }
      .home:active{
        border: 1px solid rgb(13,180,250)
      }
      .next{
        border: 1px solid rgb(252,211,0)
        cursor: pointer
        transform: rotate(-90deg)
        textCenter()
        color: red
        background-color:rgb(252,211,0)
      }
      .next:active{
        border: 1px solid rgb(252,151,0)
      }
      .page_num::after{
        content: ''
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        transform: rotate(-45deg)
        background-color: rgb(200,2,159)
        z-index: -1
      }
      .page_num{
        position: relative
        z-index: 1
        textCenter()
        left: -6px
        margin-top: .8rem
        margin-bottom: .8rem
        width: 1.8rem
        height: 1.8rem
        font-size: .4rem
        font-family: '华文中宋'
        color: white
      }
      .previous{
        border: 1px solid rgb(252,211,0)
        cursor: pointer
        transform: rotate(90deg)
        textCenter()
        color: red
        background-color:rgb(252,211,0)
      }
      .previous:active{
        border: 1px solid rgb(252,151,0)
      }
      .end{
        border: 1px solid rgb(13,240,250)
        cursor: pointer
        transform: rotate(90deg)
        textCenter()
        color: red
        color: rgb(44,26,237)
        background-color:rgb(13,240,250)
      }
      .end:active{
        border: 1px solid rgb(13,180,250)
      }
      .input{
        text-align: center
        box-sizing: border-box
        font-size: .3rem
        padding-top: .25rem
        padding-bottom: .25rem
        outline: none
        border: 0px solid red
        textCenter()
        color: rgb(107,240,1)
      }
      .go{
        border: 1px solid rgb(107,240,1)
        cursor: pointer
        textCenter()
        color: black
        background-color:rgb(107,240,1)
      }
      .go:active{
        border: 1px solid rgb(107,140,1)
      }
    }
  }
  @media only screen and (max-width:1590px){
    .list{
      margin-left: 200px
    }
  }
</style>
