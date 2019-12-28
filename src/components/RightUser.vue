<template>
    <div class="r-user">
        <div class="user-base clear-float">
            <div class="user-avatar float-left"><a href="javascript:void(0)" ><img src="../assets/images/user-img.png" alt="薇薇 - 悦读FM"></a></div>
            <div class="user-c">
                <div class="user-name"><a href="javascript:void(0)" >{{ article.podcast }}</a> <a href="javascript:void(0)" title="悦读FM主播"  class="gray-link"><i class="fa fa-microphone"></i></a></div>
                <div class="user-info clear-float">
                    <div class="user-status float-left">
                        作品：31<br>
                        粉丝：<span class="fans-count">119</span>
                    </div>
                    <div class="user-follow float-right">
                    <a href="javascript:void(0);" class="follow-link">关注</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-status">
            <a href="javascript:;" data-pid="1030" class="item-s-btn" id="item_digg" title="点个赞！">
                <span class="item-s-b" @click="like(article.id)">
                    <i class="fa fa-thumbs-up" :class="{'red': article.isLiked}"></i>
                    <span class="item-s-tip">赞</span>
                </span>
                <span id="digg_num">{{ article.like_count }}</span>
            </a>
            <a href="javascript:;" data-pid="1030" class="item-s-btn" id="item_collect" title="收藏本文">
                <span class="item-s-b">
                    <i class="fa fa-heart"></i>
                    <span class="item-s-tip">收藏</span>
                </span>
                <span id="collect_num">{{ article.collection_count }}</span>
            </a>
            <a href="#" class="item-s-btn shang" title="打赏主播">
                <span class="item-s-b">
                    <i class="fa"><strong>赏</strong></i>
                    <span class="item-s-tip">打赏</span>
                </span>
                <span class="item-s-img"><img src=""></span>
            </a>
        </div>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'RightUser',
    data() {
        return {
            id: 1025,
            article: ""
        }
    },
    methods: {
        like(id) {
            if(localStorage.getItem("user")==null) {
                alert("请先登录")
                return
            }
            if(this.article.isLiked==true) {
                this.axios.delete("http://localhost:3000/api/article/"+id+"/like").then(res=> {
                    this.getData()
                }).catch(err=> {
                    console.log(err)
                })
                return
            }
            this.axios.post("http://localhost:3000/api/article/"+id+"/like").then(res=> {
                this.getData()
            }).catch(err=> {
                console.log(err)
            })
        },
        getData() {
            this.axios("http://localhost:3000/api/article/"+this.id).then(res=> {
                this.article = res.data.res
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
            handler(to) {
                
                if(to.params.id==1) {
                    this.pre = false
                }
                
                if(to.params.id==1025) {
                    this.next = false
                }
                if(to.params.id != undefined) {
                    this.id = to.params.id
                }
                this.getData()
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
.red {
    color: red
}
</style>