<template>
    <div class="channel-item">
        <h3><span class="float-right"><router-link :to="{path:'/about/1'}">查看全部 <i class="fa fa-angle-right"></i></router-link></span>悦读FM频道其他节目</h3>
        <ul class="channel-list">
            <li v-for="(list, index) in lists" :key="index">
                <router-link :to="{path:'/article/'+list.id}">{{ list.title }}</router-link>
                <div>
                    <span>文：{{ list.author }}</span>
                    <span>主播：{{ list.podcast }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'RightChannel',
    data() {
        return {
            lists: null,
            id: 1
        }
    },
    methods: {
        getData() {
            bus.$on("send-id",(data)=> {
                this.id = data
            })
            
            this.axios("http://localhost:3000/api/articles/"+this.id+"/rand").then(res=> {
                this.lists=res.data.res
            }).catch(err=> {
                console.log(err)
            })
        }
    },
    created() {
        this.getData()
    },
    watch: {
        "$route": {
            handler() {
                this.getData()
            }
        }
    }
}
</script>

<style>

</style>