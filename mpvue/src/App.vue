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
            wx.login({
                success: (res) => {
                    if (res.code) {
                        this.$fly.get('http://localhost:3001/login/getOpenId', {
                            code: res.code
                        })
                            .then(res => {
                                this.$store.state.openId = res.data
                            })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        determineLogin () {
            // 如果vuex有该用户的信息就不需要进行登录了
            if (this.$store.state.userInfo === '') {
                this.$store.state.loginFlag = true
                this.login()
            } else {
                this.$store.state.loginFlag = false
            }
        }
    },
    created () {
        this.determineLogin()
    }
}
</script>

<style>
.i-card-header-thumb {
  border-radius: 50%;
}
</style>
