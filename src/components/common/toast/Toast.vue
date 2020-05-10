<template>
  <div class="toast"
       v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (message, duration) {
      this.show = true
      this.message = message
      setTimeout(() => {
        this.show = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 18px;
  color: #fff;
  padding: 8px 10px;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  z-index: 999;

  background-color: rgba(0, 0, 0, 0.5);
}
</style>