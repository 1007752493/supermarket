<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked='isSelectAll'
                    @click.native='checkClick'
                    class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate"
         @click='calcClick'>
      去结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
import checkButton from '../../../components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if (this.cartList.length === 0) return false

      // return !this.cartList.filter(item => !item.checked).length

      return !this.cartList.find(item => !item.checked)

      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      //   return true
      // }

    }
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) {
        // 全部选中情况
        this.cartList.forEach(item => item.checked = false)
      } else {
        // 部分或全部不选择情况
        this.cartList.forEach(item => item.checked = true)
      }

      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 44px;
  background-color: #eee;
  position: relative;
  bottom: 130px;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  width: 55px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin: 0 40px 0;
  flex: 1;
  width: 50px;
}

.calculate {
  width: 90px;
  background-color: var(--color-tint);
  text-align: center;
}
</style>