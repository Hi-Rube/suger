<template>
<div class="sui-short-message-editor">
  <textarea :value="input" @input="update"></textarea>
  <div class="tool-bar">
    <Icon type="images" size="24"/>
    <Icon type="share" size="24"/>
    <div @click="send" class="content-send">
      <Icon type="paper-airplane" color="#2196f3" size="24"/>
    </div>
    <Input v-model="tag" size="small" placeholder="tag" class="content-tag"/>
  </div>
  <div class="content-preview" v-html="compiledMarkdown"></div>
</div>
</template>

<script>
import marked from 'marked'
import {Icon, Input} from 'iview'

export default {
  name: 'ShortMessageEditor',
  props: {
    onSend: Function
  },
  data () {
    return {
      input: 'input something',
      tag: ''
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update (e) {
      setTimeout(() => {
        this.input = e.target.value
      }, 300)
    },
    send () {
      this.onSend && this.onSend(this.input, this.tag)
      this.input = 'input something'
      this.tag = ''
    }
  },
  components: {
    Icon, Input
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sui-short-message-editor {
    position: relative;
    width: 440px;
}
.sui-short-message-editor textarea{
    border: 1px solid #2196f3;
    width: 400px;
    max-width: 400px;
    height: 300px;
    max-height: 100px;
    resize: none;
    outline: none;
    font-size: 14px;
    padding: 10px;
    border-radius: 6px;
}
.sui-short-message-editor .content-preview{
    border: none;
    width: 400px;
}

.sui-short-message-editor .content-send{
    float: right;
    cursor: pointer;
}
.sui-short-message-editor .content-tag{
    float: right;
    vertical-align: text-top;
    margin-right: 10px;
    width: 200px;
}
</style>
