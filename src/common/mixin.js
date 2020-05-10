import {
  debounce
} from './utils'
import BackTop from '../components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 监听图片加载完成
    let newRefresh = debounce(this.$refs.scroll.scroll.refresh(), 50)
    this.itemImgListener = () => {
      newRefresh
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)

    },
    listenShowBackTop(position) {
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}