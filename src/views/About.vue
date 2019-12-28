<template>
    <div class="home clear-float">
        <div class="left-content float-left">
            <LeftLists></LeftLists>
            <PageNumber></PageNumber>
        </div>
        <div class="right-content float-right">
            <Sponsor></Sponsor>
            <ChannelTop10></ChannelTop10>
            <RightAdvertising></RightAdvertising>
        </div>
  </div>
</template>

<script>
import LeftLists from '../components/LeftLists'
import PageNumber from '../components/PageNumber'
import Sponsor from '../components/Sponsor'
import ChannelTop10 from '../components/ChannelTop10'
import RightAdvertising from '../components/RightAdvertising'
export default {
    components: {
        LeftLists,
        Sponsor,
        ChannelTop10,
        RightAdvertising,
        PageNumber
    }
}
</script>

<style>

</style>
