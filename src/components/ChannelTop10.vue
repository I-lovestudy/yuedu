<template>
    <div class="channel-item channel-top10">
        <h3><span class="float-right">
            </span>{{ tabs }}频道TOP10</h3>
        <ul class="channel-list">
            <li v-for="(list, index) in lists" :key="index">
                <router-link :to="{path:'/article/'+list.id}">{{ list.title }}</router-link>
                <div><span>文：{{ list.author }}</span><span>主播：{{ list.podcast }}</span></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChannelTop10',
    data() {
        return {
            lists: null,
            tabs: ''
        }
    },
    watch: {
        "$route": {
            handler(to) {
                this.axios("http://localhost:3000/api/articles/"+to.params.type_id+"/top10").then(res=> {
                    this.lists=res.data.res.articles;
                    this.tabs=res.data.res.type
                }).catch(err=> {
                    console.log(err)
                })
            },
            immediate: true
        }
    }
}
</script>

<style>

</style>