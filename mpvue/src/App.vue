<template>
    <div>

    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        login () {
            console.log('this.$store.state.userInfo',this.$store.state.userInfo)
            // 如果vuex有该用户的信息就不需要进行登录了
            if (this.$store.state.userInfo == ''){
                this.$store.state.loginFlag = true
                console.log('this.$store.state.loginFlag:', this.$store.state.loginFlag)
                wx.login({
                    success: (res) =>{
                        console.log('wx.login res',res)
                        if (res.code) {
                            wx.request({
                                url: 'http://localhost:3001/login/getOpenId',
                                data: {
                                    code: res.code
                                },
                                success: (res) =>{
                                    console.log('openid')
                                    console.log(res)
                                    this.$store.state.openId = res.data
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                })
            } else {
                this.$store.state.loginFlag = false
                console.log('this.$store.state.loginFlag:', this.$store.state.loginFlag)
            }
        }
    },
    created () {
        this.login()
    }
}
</script>

<style>
</style>
