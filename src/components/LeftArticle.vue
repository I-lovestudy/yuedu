<template>
    <div>
        <div class="item">
            <div class="item-base">
                <div class="item-name">{{ details.title }}</div>
                <div class="item-meta">
                    <span class="float-right">播放 <span class="f16">{{ details.play_time }}</span> 次</span>
                    <em><i class="fa fa-pencil"></i>{{ details.author }}</em>
                    <em><i class="fa fa-microphone"></i> {{ details.podcast }}</em>
                    <em><i class="fa fa-clock-o"></i>{{ details.duration }}</em>
                </div>
                <div class="item-pic">
                    <img :src="details.img_url">
                </div>
                <div class="yuedu_player" style="display: none">
                    <audio id="audio" controls="controls" :src="details.mp3_url"></audio>
                </div>
                <div id="jp_container_1" class="yd-player row">
                    <div class="yd-controls jp-controls float-left">
                        <a href="javascript: void(0);" @click="play" v-show="showPlay" class="jp-play"><i class="fa fa-play"></i></a>
                        <a href="javascript: void(0);" @click="pause" v-show="showPause" class="jp-pause"><i class="fa fa-pause"></i></a>
                    </div>
                    <div class="yd-duration jp-duration float-right" v-if="minute==null&&sec==null">-{{ time }}</div>
                    <div class="yd-duration jp-duration float-right" v-else>-{{ minute }}:{{ sec }}</div>
                    <div class="yd-progress jp-progress">
                        <div class="yd-seek-bar jp-seek-bar" :style="'width:'+num+'%;'">
                            <div id="bar" class="yd-play-bar jp-play-bar" :style="'width:'+num1+'%'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-intro clear-float">
                <div style="white-space: pre-line;" :style="'height: '+height">
                    
                    <p v-html="details.content"></p>
                    <span class="item-intro-hide" v-show="show"></span>
                </div>
                <a @click="unfold" href="javascript:void(0);" class="item-intro-more float-right">
                    {{ txt }} 
                    <i class="fa" :class="{'fa-angle-down': down, 'fa-angle-up': up}"></i>
                </a>
            </div>
            <div class="item-f clear-float">
                <div class="item-tags float-left "><strong>标签：</strong>
                    <a href="javascript:void(0);" v-for="(label, index) in labels" :key="index">{{ label }}</a>
                </div>
                <div class="item-share float-right">
                    <div class="bdsharebuttonbox bdshare-button-style0-16" style="position: relative">
                        <img src="../assets/images/icon.png" alt="" style="position: absolute; top: 3px; right: 0;">
                    </div>
                </div>
            </div>
        </div>
        <div class="item-pg clear-float">
            <span class="float-left" v-if="pre">
                <router-link :to="{path: '/article/'+ (id-1)}" class="podcast-prev"><i class="fa fa-angle-left"></i> 上一篇</router-link>
            </span>
            <span class="float-right" v-if="next">
                <router-link :to="{path: '/article/'+ (id+1)}" class="podcast-next">下一篇 <i class="fa fa-angle-right"></i></router-link>
            </span>
        </div>    
    </div>
</template>

<script>
import bus from '../bus/bus.js'
import router from '../router'
export default {
    name: 'LeftArticle',
    data() {
        return {
            details: "",
            labels: null,
            id: 1025,
            txt: "展开全文",
            show: true,
            height: "280px",
            up: false,
            down: true,
            next: true,
            pre: true,
            showPlay: true,
            showPause: false,
            minute: null,
            sec: null,
            num: 100,
            num1: 0,
            time: null
        }
    },
    methods: {
        unfold() {
            if(this.txt=="展开全文") {
                this.height = "auto"
                this.txt = "收起"
            } else {
                this.height = "280px"
                this.txt = "展开全文"
            }
            this.show = !this.show
            this.up = !this.up
            this.down = !this.down
        },
        play() {
            this.showPlay = false
            this.showPause = true
            audio.play()
            var that = this
            audio.ontimeupdate = function() {
                var bar = document.getElementById("bar")
                that.num1 = audio.currentTime/audio.duration*100
                that.residueTime = audio.duration - audio.currentTime
                that.minute = Math.floor((that.residueTime)/60)
                that.sec = Math.floor((that.residueTime)%60)
                if(that.sec==0) {
                    audio.onended = function() {
                        that.showPause = false
                        that.showPlay = true
                    }
                }
            }
            
        },
        pause() {
            this.showPause = false
            this.showPlay = true
            audio.pause()
        },
        getData() {
            this.axios("http://localhost:3000/api/article/"+this.id).then(res=> {
                this.details=res.data.res;
                this.labels=res.data.res.labels.split(",");
                document.title = this.details.title + "悦读-FM"
            }).catch(err=> {
                console.log(err)
            })
        }
    },
    created() {
    },
    updated() {
        var audio = document.getElementsByTagName("audio")
        this.time = this.details.duration
    },
    watch: {
        "$route": {
            handler(to) {
                
                
                if(to.params.id != undefined) {
                    this.id = Number(to.params.id)
                }
                if(to.params.id==1) {
                    this.pre = false
                }
                
                if(to.params.id==1025 || this.id==1025) {
                    this.next = false
                } else {
                    this.next = true
                }
                this.getData()
            },
            immediate: true
        }
    }
}
</script>

<style scoped>

</style>