<template>
  <div>
    <transition
      enter-active-class='animated swing fadeIn'
      leave-active-class='animated shake fadeOut'
    >
      <img-ppt :index="index" v-if="show_ppt" @back="back"/>
    </transition>
    <transition
      enter-active-class='animated swing fadeIn'
      leave-active-class='animated shake fadeOut'
    >
      <div class="search_input" @click="disappear" v-if="show_search">
        <div class="input_box">
          <input autofocus v-focus @keydown="down" @click.stop="foucus" maxlength="14" v-model.trim="search" placeholder="Search......" type="text">
          <span @click="search_input(false)" class="iconfont">&#xe604;</span>
        </div>
      </div>
    </transition>
    <header style="transition:all .5s" :class="[headers]" :id="[chose]">
      <div class="logo" v-if="show"></div>
      <nav class="nav_list">
        <div class="comic" @click="comic">
          <div class="intro">
          <div class="iconfont" style="color:white" v-if="showComic">&#xe600;</div>
          <div class="img" v-if="show">
              <img src="../assets/images/comic.png" />
          </div>
          <div class="text" v-if="show">
              <p v-if="show">动漫</p>
              <p>Comic</p>
          </div>
          </div>
        </div>
        <div class="scenery" @click="scenery">
          <div class="intro">
          <div class="iconfont" style="color:rgb(252,150,0)" v-if="showScenery">&#xe81f;</div>
          <div class="img iconfont" v-if="show">
              <img src="../assets/images/scenery.png" alt="">
          </div>
          <div class="text" v-if="show">
              <p v-if="show">风景</p>
              <p>Scenery</p>
          </div>
          </div>
        </div>
        <div class="game" @click="game">
            <div class="intro">
              <div class="iconfont" v-if="showGame">&#xe66f;</div>
              <div class="img iconfont" v-if="show">
                &#xe66f;
              </div>
              <div class="text" v-if="show">
                <p v-if="show">游戏</p>
                <p>Game</p>
              </div>
            </div>
        </div>
        <div class="animal" @click="animal">
            <div class="intro">
              <div class="iconfont" v-if="showAnimal">&#xe60e;</div>
              <div class="img iconfont" v-if="show">
                &#xe60e;
              </div>
              <div class="text" v-if="show">
                <p v-if="show">动物</p>
                <p>Animal</p>
              </div>
            </div>
        </div>
      </nav>
    </header>
    <router-view @search="search_input" @check_img="check_img" @list="list" :class="[lis]"></router-view>
  </div>
</template>

<script>
import ImgPpt from './ppt'
export default {
  name: 'HomeIndex',
  components: {
    ImgPpt
  },
  data () {
    return {
      foucus: false,
      show_ppt: false,
      index: 0,
      headers: 'headerss',
      lis: 'liss',
      chose: '',
      tf: true,
      search: '',
      show_search: false,
      show: true,
      showComic: false,
      showScenery: false,
      showGame: false,
      showAnimal: false
    }
  },
  methods: {
    foucus () {
      console.log('搜索')
    },
    down (e) {
      if (e.keyCode === 13) {
        this.search_input()
      }
    },
    search_input (status) {
      this.show_search = status
      if (!status) {
        if (this.search !== '') {
          let rex = new RegExp(this.search)
          let newImg = this.$store.state.imgData.allImg2.filter(item => {
            return rex.test(item.imgIntro)
          })
          if (!newImg.length) {
            this.$store.dispatch('get_all_imgs', [
              {id:1 , imgUrl: '../../static/images/404.png', imgIntro:'您的搜索结果不存在'}
            ])
          } else {
            this.$store.dispatch('get_all_imgs', newImg)
          }
          this.bus.$emit('search_succes')
        } else if (this.search === '') {
          this.$store.dispatch('get_all_imgs', this.$store.state.imgData.allImg2)
          this.bus.$emit('search_succes')
        }
      }
      this.search = ''
      console.clear()
    },
    list (catgory) {
      this.chose = 'chose'
      this.show = false
      this.tf = false
      if (catgory === 'comic') {
        this.showComic = true
      } else if (catgory === 'scenery') {
        this.showScenery = true
      } else if (catgory === 'game') {
        this.showGame = true
      } else if (catgory === 'animal') {
        this.showAnimal = true
      }
    },
    disappear () {
      this.show_search = false
    },
    back (show) {
      this.show_ppt = show
      this.headers = 'headerss'
      this.lis = 'liss'
    },
    check_img (index) {
      this.show_ppt = true
      this.headers = 'headers'
      this.lis = 'lis'
      this.index = index
    },
    switch_chose (catgory) {
      if (this.tf) {
        this.chose = 'chose'
        this.show = false
        this.tf = false
        this.$emit('change_img', catgory)
        setTimeout(() => {
          this.$router.push({
            path: '/list',
            query: {
              catgory
            }
          })
        }, 400)
      } else {
        this.$emit('change_img', null)
        this.$router.push('/')
        this.showComic = false
        this.showScenery = false
        this.showGame = false
        this.showAnimal = false
        this.chose = ''
        this.tf = true
        setTimeout(() => {
          this.show = true
        }, 200)
      }
    },
    comic () {
      this.showComic = !this.showComic
      this.switch_chose('comic')
    },
    scenery () {
      this.showScenery = !this.showScenery
      this.switch_chose('scenery')
    },
    game () {
      this.showGame = !this.showGame
      this.switch_chose('game')
    },
    animal () {
      this.showAnimal = !this.showAnimal
      this.switch_chose('animal')
    }
  }
}
</script>

<style lang="stylus" scoped>
    catgory(){
        box-sizing: border-box
        padding: .2rem
        width: 50%
        display: flex
        height: 50%
        background-clip: content-box
        cursor pointer
        transition all .8s
        .intro{
        display: flex
        margin: auto
        .img{
            img{
              width: 90px
            }
        }
        .text{
            user-select none
            display: flex
            align-items center
            flex-direction column
            p{
              color: white
              font-size: 1rem
              margin: 0
            }
        }
        }
    }
    #chose{
        position: fixed
        left: 30px!important
        top: calc(40%)!important
        width: 100px!important
        height: 75px!important
        //overflow: hidden
        transition: all .5s
        div{
          border-radius: 15px
          padding: .03rem!important
        }
        .intro{
          .iconfont{
            margin: auto!important
            font-size: .5rem!important
          }
        }
        // p{
        //   color: black!important
        //   font-size: .5rem!important
        // }
    }
  #chose:hover{
    transform: scale(1.1)
  }
  .liss{
    transition: filter 1s
    filter: none
  }
  .lis{
    transition: filter 1s
    filter: blur(10px) contrast(.8) brightness(.8)
  }
  .headerss{
    transition: filter 1s
    filter: none
  }
  .headers{
    transition: filter 1s
    filter: blur(10px)
  }
  .search_input{
    position: fixed
    width: 100%
    height: 100%
    z-index: 5
    background: rgba(0,0,0,.8)
    .input_box{
      position: absolute
      left: calc(50% - 250px)
      top: 10%
      input{
        border-radius: 10px
        padding: .3rem
        border-radius: 10px
        border: 0px solid  red
        background: rgba(255,255,255,.9)
        width: 300px
        height: 45px
        outline: none
        box-sizing: border-box
        padding-right: .4rem
      }
      .iconfont{
        position: absolute
        cursor: pointer
        user-select: none
        right: .15rem
        font-size: .8rem
        top: calc(1%)
      }
      .iconfont:active{
        transform: scale(1.1)
      }
    }
  }
  header{
      position: fixed
      display: flex
      top: calc(50% - 350px)
      left: calc(50% - 600px)
      width: 1200px
      height: 600px
      transition: all .5s
      .logo{
        background: url('../assets/images/logo.png') no-repeat
        flex: 1
      }
      .nav_list{
        font-family '幼圆'
        display: flex
        flex-wrap: wrap
        margin-left: .2rem
        flex: 2
        perspective: 900px
        .comic{
          background: rgb(252,211,0) linear-gradient(
            hsla(0,0%,100%,.4), transparent
          )
          catgory()
        }
        .comic:hover{
          transform: rotateY(40deg)
        }
        .scenery{
          background: rgb(107,240,1) linear-gradient(
            hsla(0,0%,100%,.4), transparent
          )
          catgory()
          .intro{
            .img{
              img{
                width: 110px
              }
            }
          }
        }
        .scenery:hover{
          transform: rotateY(25deg)
        }
        .game{
          background: rgb(200,2,159) linear-gradient(
            hsla(0,0%,100%,.4), transparent
          )
          catgory()
          .iconfont{
            color: rgb(15,103,213)
            margin-right: .4rem
            font-size: 2rem
          }
        }
        .game:hover{
          transform: rotateY(40deg)
        }
        .animal{
          background: rgb(24,116,253) linear-gradient(
            hsla(0,0%,100%,.4), transparent
          )
          catgory()
          .iconfont{
            color: rgb(252,211,0)
            margin-top: .4rem
            font-size: 1.4rem
          }
        }
        .animal:hover{
          transform: rotateY(25deg)
        }
      }
    }
</style>
