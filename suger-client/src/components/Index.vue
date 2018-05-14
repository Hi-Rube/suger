<template>
  <div v-if="loadingFlag">
    <Spin fix size="large"/>
  </div>
  <div v-else id="page-index">
    <TopBar id="top-bar"/>
    <div id="page-index-content">
      <ShortMessageEditor id="short-message-editor" v-bind:onSend="onSend"/>
      <ShortMessageList id="short-message-list" v-bind:shortMessages="shortMessages"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Spin} from 'iview'
import ShortMessageEditor from '@/components/ShortMessageEditor'
import ShortMessageList from '@/components/ShortMessageList'
import TopBar from '@/components/TopBar'

export default {
  name: 'Index',
  data () {
    return {
      loadingFlag: true,
      /* typeof self, newGuest, oldGuest */
      userType: 'self',
      shortMessages: []
    }
  },
  components: {
    Spin,
    ShortMessageEditor,
    ShortMessageList,
    TopBar
  },
  mounted () {
    axios.get('/sm/get').then(response => {
      if (response.status === 200) {
        this.loadingFlag = false
        this.shortMessages = response.data.data
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    onSend (input, tag) {
      axios.post('/sm/post', {
        artical: input,
        tag: tag
      }).then((response) => {
        if (response.status === 200) {
          this.shortMessages.unshift({
            id: response.data.data.id,
            tag: tag,
            artical: input,
            createdAt: response.data.data.time,
            updatedAt: response.data.data.time
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#top-bar{
  position: absolute;
  left: -80px;
  z-index: 1000;
}

#page-index{
  position: relative;
  height: 100%;
}
#page-index-content{
  height: 100%;
  overflow: scroll;
}

#short-message-editor{
  padding: 20px;
  border-bottom: 1px dashed #2196f3;
}

#short-message-list{
  padding: 20px;
}
</style>
