<template>
    <div class="related-item">
        <h3>
            <span class="float-right">
                <a v-if="left==0" href="javascript:void(0);" class="scroll-prev none">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a v-else @click="moveRight" href="javascript:void(0);" class="scroll-prev">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a v-if="left==-1320" href="javascript:void(0);" class="scroll-next none">
                    <i class="fa fa-angle-right"></i>
                </a>
                <a v-else @click="moveLeft" href="javascript:void(0);" class="scroll-next">
                    <i class="fa fa-angle-right"></i>
                </a>
            </span>其他相关节目
        </h3>
        <div class="related-list scroll-wp clear-float" style="width: 1650px; transition: all .5s;" :style="'margin-left:'+left+'px'">
            <ul>
                <li v-for="(list, index) in lists" :key="index">
                    <router-link :to="{path:'/article/'+list.id}">
                        <img :src="list.img_url" :alt="list.title">
                        <span>{{ list.title }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'RightRelated',
    data() {
        return {
            lists: null,
            left: 0
        }
    },
    methods: {
        moveLeft() {
            this.left+=-330
        },
        moveRight() {
            this.left-=-330
        },
        getData() {
            this.axios("http://localhost:3000/api/articles/rand").then(res=> {
                this.lists = res.data.res
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