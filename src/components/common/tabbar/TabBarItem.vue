<template>
  <div class="tab-bar-item"
       @click='itemClick'>
    <!-- <img src="../../assets/img/tabbar/home.svg">
    <div>首页</div> -->
    <div v-if='!isActive'>
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style='activeStyle'>
      <slot name='item-text'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      //indexOf方法：如果字符串没有此值 返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      // 如果是 如果 不是 {}
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path).catch(err => { err })
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去掉图片下面像素 */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>