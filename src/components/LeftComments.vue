<template>
    <div>
        <div class="comments">
            <form class="comment-post clear-float">
            <input type="hidden" name="_xsrf" value="">
                <textarea class="comment-text float-left" placeholder="说点什么吧！" name="detail" v-model="contents"></textarea>
                <button type="button" class="comment-btn float-right" @click="addComment">评论</button>
            </form>
        </div>
        <div class="comment-list">
            <ul class="tab clear-float">
                <li class="cur">最新评论（<span>{{comments.length}}</span>）</li>
            </ul>
            <div class="comments-dom">
                <div class="comments-loading" v-show="loading"><img src="../assets/images/loading.gif" alt="正在加载 - 悦读FM"> 正在加载……</div>
                
                <ul class="comments-list" v-if="comments.length==0"><div class="no-comment">暂无评论</div></ul>
                <ul class="comments-list" v-else>
                    <li v-for="(list, index) in comments" :key="index">
                        <div class="comment-avatar float-left">
                            <a href="javascript:void(0);">
                                <img :src="list.avatar" />
                            </a>
                        </div>
                        <div class="comment-c">
                            <div class="comment-meta">
                                <a href="javascript:void(0);" class="comment-user">{{ list.nikiname }}</a>
                                <span>{{ list.reply_time }}</span>
                            </div>
                            <div class="comment-p">{{ list.content }}</div>
                        </div>
                        <button class="del float-right" type="button" v-if="list.user_id==userId" @click="delComment(list.id)">删除</button>
                    </li>
                </ul>
                
            </div>
        </div>    
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'LeftComments',
    data() {
        return {
            articleId: 1025,
            contents: '',
            comments: '',
            loading: true,
            userId: null
        }
    },
    methods: {
        getData() {
            this.articleId = this.$route.params.id
            this.axios("http://localhost:3000/api/comments/"+this.articleId+"/page/1").then(res=> {
                if(res.data.res_code==200) {
                    this.comments = []
                    this.comments = this.comments.concat(res.data.res)
                    this.comments.reverse()
                    this.loading = false
                } else {
                    this.comments = []
                    this.loading = false
                }
            }).catch(err=> {
                console.log(err)
            })
        },
        addComment() {
            if(localStorage.getItem("user")==null) {
                alert("请先登录")
                return
            }
            if(this.contents.trim()=='') {
                alert("评论内容不能为空")
                return
            }
            this.axios.post("http://localhost:3000/api/comment",{
                article_id: this.$route.params.id,
                content: this.contents
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(res=> {
                this.getData()
            }).catch(err=> {
                console.log(err)
            })
            this.contents = ''
        },
        delComment(del) {
            this.axios.delete("http://localhost:3000/api/comment/"+del,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(res=> {
                this.getData()
            }).catch(err=> {
                console.log(err)
            })
        }
    },
    created() {
        this.getData()
        if(localStorage.getItem("user")==null) {
            bus.$on("send-userid",(data)=> {
                this.userId = data
            })
        } else {
            this.userId = JSON.parse(localStorage.getItem("user")).id
        }
        
    },
    watch: {
        '$route': {
            handler() {
                this.getData()
            }
        }
    }
}
</script>

<style>

</style>