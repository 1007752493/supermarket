<template>
  <div class="goods">
    <good-list-item v-for="item in goods"
                    :goods-item='item'></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  /* 包裹 */
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>