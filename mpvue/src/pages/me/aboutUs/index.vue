<template>
  <div class="aboutUs">
    <div class="title">developed by</div>
    <p class="name">吴建星</p>
    <p class="name">陈美芳</p>
    <p class="name">钱丽莹</p>
    <p class="name">许明雪</p>
    <div class="devideLine"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.aboutUs {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #91eae4, #86a8e7, #7f7fd5);
}
.title {
  font-size: 40px;
  color: rgb(51, 51, 51);
  font-weight: bold;
  text-align: center;
  margin-bottom: 100px;
}
.name {
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-top: 30px;
}
.devideLine {
  position: absolute;
  bottom: 80px;
  border: 1px solid white;
  width: 85%;
  left: 7.5%;
}
.bottom-room {
  position: absolute;
  right: 15px;
  bottom: 20px;
  text-align: right;
  color: white;
}
</style>