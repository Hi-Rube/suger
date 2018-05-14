<template>
<div class="sui-short-message-list">
  <div class="item" v-for="shortMessage in shortMessages" :key="shortMessage.id">
      <div v-html="transformArtical2Html(shortMessage.artical)" @click="clickImages"></div>
      <a>#{{shortMessage.tag}}</a>
      <div v-if="shortMessage.createdAt === shortMessage.updatedAt">ca: {{transformServerTime2Client(shortMessage.createdAt)}}</div>
      <div v-else>ua: {{transformServerTime2Client(shortMessage.updatedAt)}}</div>
  </div>
</div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ShortMessageList',
  props: {
    shortMessages: Array
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    transformArtical2Html (artical) {
      return marked(artical, { sanitize: true })
    },
    transformServerTime2Client (stime) {
      return new Date(stime).toLocaleString()
    },
    clickImages (e) {
      if (e.target.nodeName.toLowerCase() === 'img') {
        alert('image')
      }
    }
  }
}
</script>

<style>
.sui-short-message-list .item{
  width: 400px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.sui-short-message-list .item img{
  max-width: 400px
}
</style>
