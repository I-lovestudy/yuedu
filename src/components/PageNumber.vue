<template>
    <div class="pg">
        <a href="javascript:void(0)" v-if="num<=1 || num==null"></a>
        <router-link @click.native="pre" :to="{path:'/about/'+id+'/'+ (num-1)}" v-else>上一页</router-link>
        <router-link exact-active-class="page-active" v-for="(num, index) in pages" :to="{path:'/about/'+id+'/'+ num}" :key="index" @click.native="getNum(num)">{{ num }}</router-link>
        <a href="javascript:void(0)" v-if="num==Math.ceil(count/10)"></a>
        <router-link @click.native="next" :to="{path:'/about/'+id+'/'+ (num+1)}" v-else>下一页</router-link>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    data() {
        return {
            id: 1,
            count: null,
            num: null
        }
    },
    methods: {
        getNum(num) {
            this.num = num
        },
        pre() {
            this.num--
        },
        next() {
            this.num++
        }
    },
    computed: {
        pages() {
            let arr = [];
            if(this.$route.params.page==undefined) {
                this.num=1
            }
            bus.$emit("init-page",1)
            if(this.num>=6) {
                for(let i=this.num-4; i<this.num+4; i++) {
                    arr.push(i)
                }
                if(this.count>80||this.count==null) {
                    arr.length=8
                } else {
                    arr.length=Math.ceil(this.count/10)-1
                }
                return arr
            } else {
                for(let i=1; i<Math.ceil(this.count/10)+1; i++) {
                    arr.push(i)
                }
                arr.length>8?arr.length=8:arr.length

                return arr
            }
        }
    },
    created() {
        if(this.num==null) {
            this.num = this.$route.params.page
            if(this.$route.params.page==undefined) {
                this.num = 1
            }
        }
        bus.$on("send-page",(data)=> {
            this.count = data
        }),
        bus.$on("get-id",(data)=> {
            this.id = data
        })
        // console.log(this.$route.params.type_id)
        // this.id = this.$route.params.type_id
    }
}
</script>

<style>
.page-active {
    color: red
}
</style>