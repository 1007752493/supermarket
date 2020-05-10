<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!-- <ul>
        <li v-for="item in $store.state.cartList">{{ item }}</li>
      </ul> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="params"
                         :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment"
                           :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend"
                 :goods="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick"
              v-show="isShowBackTop"></back-top>
    <!-- <toast :message='message'
           :show='show'></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '../../components/common/scroll/Scroll'
import GoodList from '../../components/content/goods/GoodList'

import { mapActions, mapGetters } from 'vuex'

// import Toast from '../../components/common/toast/Toast'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from '../../network/Detail'
import { debounce } from '../../common/utils'
import { itemListenerMixin, backTopMixin } from '../../common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },

  created () {
    //保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid请求详情数据
    getDetail(this.iid).then(
      (res) => {
        //获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        //创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        // 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //等它们跑完 回调这个函数
        this.$nextTick(() => {
          //根据最新的数据 对应DOM已经被渲染出来
          //但是图片依然没有加载完
          //获取Y值
        })
      }, //请求推荐数据
      getRecommend().then((res) => {
        this.recommends = res.data.list
      }),
      // 给getThemeTopY赋值(防抖)
      (this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(-Number.MAX_VALUE)
      }, 25))
    )
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad () {
      this.$refs.scroll.scroll.refresh()
    },
    detailImageLoad () {
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scroll.scroll.scrollTo(0, this.themeTopYs[index], 500)
    },
    contentScroll (position) {
      //判断BackTop是否显示
      this.listenShowBackTop(position)
      // 获取Y值
      const positionY = -position.y
      //positionY和主题中的值进行对比
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= -this.themeTopYs[i] &&
          positionY < -this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

        // if (this.currentIndex !== i && (i < length - 1 && (positionY >= (-this.themeTopYs[i])) && (positionY < (-this.themeTopYs[i + 1]))) || (i === length - 1 && (positionY >= (-this.themeTopYs[i])))) {
        //   this.currentIndex = i
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // if (positionY > (-this.themeTopYs[i]) && positionY < (-this.themeTopYs[i + 1])) {
        //   console.log(i)
        // }
      }
    },
    addToCart () {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)

      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)

        this.$toast.show(res, 2000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      // console.log(this.goods)
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100%);
  overflow: hidden;
}
</style>
