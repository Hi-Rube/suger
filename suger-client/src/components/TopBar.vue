<template>
  <div class="sui-top-bar">
    <div v-for="(item, index) in items" :key="index" class="item">
        {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
      items: [
        {name: '日杂', path: '/daily'},
        {name: '图记', path: '/photo'},
        {name: '关于我', path: '/about'}
      ]
    }
  },
  methods: {
    router2page (idx) {
      let item = this.items[idx]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sui-top-bar{
  width: 80px;
  text-align: center;
  background: #fff;
}
.sui-top-bar .item{
  padding: 10px;
}
.sui-top-bar .item:not(:last-child){
  border-bottom: 1px solid #f0f0f0;
}
.sui-top-bar .item-now, .sui-top-bar .item:hover{
  color: #fff;
  background: #2196f3;
  cursor: pointer;
}
</style>
