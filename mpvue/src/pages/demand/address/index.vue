<template>
    <div>
        <div>
            <label>收货地址：</label><input v-model="address" type="text" class="address" placeholder="请输入收货地址"/><br>
            <label>联系电话：</label><input v-model="tel" type="text" class="tel" placeholder="请输入联系电话"/><br>
        </div>

        <div class="btn_div">
            <div @click="cancelSubmit" class="buttom_cancel_btn btn">取消</div>
            <div @click="submitOrder" class="buttom_publish_btn btn">提交订单</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        submitOrder () {

        },
        cancelSubmit () {

        }
    }
}
</script>

<style scoped>
label{
    line-height: 40px;
    width: 100px;
    text-align: right;
    display: inline-block;
}
input{
    border: 1px solid lightgray;
    display: inline-block;
    vertical-align: middle;
    text-indent: 15px;
    border-radius: 6px;
    width: 70%;
}
.btn_div{
    text-align: center;
    position: absolute;
    top: 93%;
    width: 100%;
    height: 7%;
}
.buttom_cancel_btn,.buttom_publish_btn{
    display: inline-block;
    text-align: center;
    line-height: 2.3;
    width: 50%;
    height: 100%;
    color: #FFF;
    background-color: #A2C6E7;
}
.buttom_cancel_btn{
    left: 0;
}
.buttom_publish_btn{
    left: 50%;
}
</style>