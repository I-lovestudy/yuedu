<template>
  <div class="home clear-float">
    <div class="left-content float-left">
      <LeftArticle></LeftArticle>
      <LeftComments></LeftComments>
    </div>
    <div class="right-content float-right">
      <RightUser></RightUser>
      <RightRelated></RightRelated>
      <RightChannel></RightChannel>
      <RightAdvertising></RightAdvertising>
    </div>
  </div>
</template>

<script>

import LeftArticle from '../components/LeftArticle'
import LeftComments from '../components/LeftComments'
import RightUser from '../components/RightUser'
import RightRelated from '../components/RightRelated'
import RightChannel from '../components/RightChannel'
import RightAdvertising from '../components/RightAdvertising'

export default {
  name: 'home',
  components: {
    LeftArticle,
    LeftComments,
    RightUser,
    RightRelated,
    RightChannel,
    RightAdvertising
  }
}
</script>
