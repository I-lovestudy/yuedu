<template>
    <div>
        <div class="left-lists clear-float">
            <ul class="channels">
                <li class="clear-float" v-for="(list,index) in lists" :key="index">
                    <div class="channel-pic float-left">
                    <router-link :to="{path:'/article/'+list.id}">
                        <img :src="list.img_url" :alt="list.title" @click="sendId($route.params.type_id)">
                    </router-link>
                    </div>
                    <div class="channel-body">
                        <div class="channel-title">
                        <router-link :to="{path:'/article/'+list.id}" >
                            <div @click="sendId($route.params.type_id)" >{{ list.title }}</div>
                        </router-link>
                        </div>
                        <div class="channel-meta">
                            <span><i class="fa fa-pencil"></i>{{ list.author }}</span>
                            <span><i class="fa fa-microphone"></i>{{ list.podcast }}</span>
                            <span><i class="fa fa-clock-o"></i>{{ list.duration }}</span>
                            <span><i class="fa fa-headphones"></i>{{ list.play_time }}</span>
                        </div>
                        <div class="channel-desc">{{ list.content | change }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'LeftLists',
    data() {
        return {
            lists:null,
            count: null,
            page: 1
        }
    },
    methods: {
        sendId(i) {
            bus.$emit("send-id",i)
        }
    },
    filters: {
        change(val) {
            var num = Math.random()*60+20;
            return val.slice(0,num)+'...'
        }
    },
    watch: {
        "$route": {
            handler(to) {
                if(to.params.page != undefined) {
                    this.page = to.params.page
                }
                bus.$on("init-page",(data)=> {
                    this.page = data
                })
                this.axios("http://localhost:3000/api/articles/"+to.params.type_id+"/page/"+this.page).then(res=> {
                    this.lists = res.data.res.articles
                    this.count = res.data.res.count
                    bus.$emit("send-page",this.count)
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