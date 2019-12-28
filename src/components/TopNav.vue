<template>
    <div class="header">
        <div class="top-nav clear-float">
            <div class="logo float-left">
                <a href="javascript:void(0)">
                    <span class="left-logo float-left clear-float">
                        <span class="logo-1 float-left"></span>
                        <span class="logo-2 float-left"></span>
                        <span class="logo-3 float-left"></span>
                    </span>
                    <router-link :to="{path:'/'}">悦读 FM</router-link>
                </a>
            </div>
            <div class="top-login float-right">
                <div class="login" v-if="userinfo">
                    <a href="javascript: void(0)">{{ userinfo.nikiname }}</a>
                    <a href="javascript: void(0)" @click="exit">退出</a>
                </div>
                <div class="login" v-else>
                    <a href="javascript:void(0);" @click="tabLogin">登录</a>
                    <a href="javascript:void(0);" @click="tabRegist">注册</a>
                </div>
            </div>
            <div class="search float-right clear-float">
                <form method="" action="">
                    <input type="text" class="key float-left" name="">
                    <button type="button" class="subbtn float-right"><i class="top-search"></i></button>
                </form>
            </div>
            <div class="top-menu">
                <router-link exact-active-class="active" v-for='(list,index) in lists' :key="index" :to="{path:'/about/'+list.id}" @click.native="getId(list.type)">{{ list.type }}</router-link>
            </div>
            <img src="" alt="">
        </div>
        <div v-show="show">
            <div class="pop">
                <div class="pop-wp" style="left: 50%; right: auto;" v-show="showregist">
                    <a href="#" rel="nofollow" title="关闭" class="pop-close" @click="tab">×</a>
                    <div class="pop-title">注册</div>
                    <form method="post">
                        <div class="account-form">
                            <input type="text" name="nikiname" class="account-input" placeholder="昵称" v-model="rnikiname">
                            <div class="error-tip"></div>
                            <div class="account-line"></div>
                            <input type="text" name="email" class="account-input" placeholder="邮箱" v-model="remail">
                            <div class="error-tip"></div>
                            <div class="account-line"></div>
                            <input type="password" name="password" id="rpassword" class="account-input" placeholder="密码" v-model="rpassword">
                            <div class="error-tip"></div>
                            <div class="account-line"></div>
                            <input type="password" name="repassword" class="account-input" placeholder="确认密码">
                            <div class="error-tip"></div>
                        </div>
                        <div class="account-other">
                            <label>
                                <input type="checkbox" name="angree" @click="agree" :value="agreeState"> 我已认真阅读并同意悦读FM的<a href="" class="red-link" target="_blank">《使用协议》</a>
                            </label>
                            <div class="error-tip">
                                <span id="angree-error" class="error" v-show="agreement">请阅读并同意悦读FM使用协议</span>
                            </div>
                        </div>
                        <button type="button" class="account-btn" @click="submit">注册</button>
                    </form>
                </div>
                <div class="pop-wp" style="left: 50%; right: auto;" v-show="showlogin">
                    <a href="#" class="pop-close" @click="tab">×</a>
                    <div class="pop-title">登录</div>
                    <form method="post">
                        <div class="account-form">
                            <input type="text" name="loginEmail" class="account-input" placeholder="邮箱" v-model="loginEmail">
                            <div class="error-tip" v-show="emailNull">
                                <span id="email-error" class="error">{{ msg }}</span>
                            </div>
                            <div class="account-line"></div>
                            <input type="password" name="loginPassword" class="account-input" placeholder="密码" v-model="loginPassword">
                            <div class="error-tip" v-show="passwordNull">
                                <span id="email-error" class="error">{{ msg }}</span>
                            </div>
                        </div>
                        <div class="account-other">
                            <span class="float-right">
                                <a href="" class="red-link" target="_blank">忘记密码</a>
                            </span>
                            <label><input type="checkbox" value="1" name="nextauto"> 下次自动登录</label>
                        </div>
                        <button type="button" @click="login" class="account-btn">登 录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../bus/bus.js'
export default {
    name: 'TopNav',
    data() {
        return {
            lists: null,
            show: false,
            showregist: false,
            showlogin: false,
            rusername: null,
            rpassword: null,
            remail: null,
            rnikiname: null,
            agreement: false,
            agreeState: false,
            loginEmail: null,
            loginPassword: null,
            userinfo: null,
            emailNull: false,
            passwordNull: false,
            msg: null,
            token: ''
        }
    },
    methods: {
        tab() {
            this.show=false
            this.showregist=false
            this.showlogin=false
        },
        tabRegist() {
            this.show=!this.show
            this.showregist=!this.showregist
        },
        tabLogin() {
            this.show=!this.show
            this.showlogin=!this.showlogin
        },
        getId(title) {
            bus.$emit("get-id",this.$route.params.type_id)
            document.title = title + "-悦读FM"
        },
        agree() {
            this.agreeState = !this.agreeState
        },
        exit() {
            localStorage.clear()
            this.userinfo = null
        },
        submit() {
            if(this.agreeState==false) {
                this.agreement = true
                return
            } else (
                this.agreement = false
            )
            this.axios.post("http://localhost:3000/api/user", {
                email: this.remail,
                password: this.rpassword,
                username: this.rnikiname,
                nikiname: this.rnikiname
            }).then(res=> {
                if(res.data.res_code==200) {
                    alert("注册成功")
                    this.tab()
                } 
                if(res.data.res_code==400) {
                    alert("邮箱被占用")
                }
            }).catch(err=> {
                console.log(err)
            })
        },
        login() {
            this.axios.post("http://localhost:3000/api/user/login",{
                email: this.loginEmail,
                password: this.loginPassword
            }).then(res=> {
                if(this.loginEmail==null) {
                    this.emailNull = true
                    this.msg = "用户名不能为空"
                    return
                } else {
                    this.emailNull = false
                }
                if(this.loginPassword==null) {
                    this.passwordNull = true
                    this.msg = "密码不能为空"
                    return
                } else {
                    this.passwordNull = false
                }
                if(res.data.res_code==400) {
                    this.emailNull = true
                    this.msg = res.data.res_msg
                }
                if(res.data.res_code==200) {
                    alert("登录成功")
                    this.tab()
                    bus.$emit("send-userid",res.data.res.user.id)
                    localStorage.setItem("user",JSON.stringify(res.data.res.user))
                    localStorage.setItem("token",res.data.res.token)
                    this.userinfo = JSON.parse(localStorage.getItem("user"))
                }
            }).catch(err=> {
                console.log(err)
            })
        },
        getData() {
            this.axios("http://localhost:3000/api/types").then(res=> {
                this.lists=res.data.res
            }).catch(err=> {
                console.log(err)
            })
        },
        // likeList() {
        //     this.axios("http://localhost:3000/api/articles/like").then(res=> {
        //         console.log(res)
        //     }).catch(err=> {
        //         console.log(err)
        //     })
        // }
    },
    created() {
        this.getData()
        this.userinfo = JSON.parse(localStorage.getItem("user"))
    },
    watch: {
        "$route": {
            handler() {
            }
        }
    }
}
</script>
<style scoped>
.active, .router-link-active {
    color: red
}

</style>

