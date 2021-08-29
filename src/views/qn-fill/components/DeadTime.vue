<template>
  <div class="container">
    <div class="times" v-if="isEnd===false">
      距离考试结束还有<br>
      <span class="num">{{hour}}</span>时
      <span class="num">{{minute}}</span>分
      <span class="num">{{second}}</span>秒
    </div>
    <div class="end" v-else>
      考试已结束
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeadTime',
  props: {
    endTime: String
  },
  data() {
    return {
      currentTime: new Date(),
      ms:1,
      hour:1,
      minute:1,
      second:1,
      isEnd:false,
    };
  },
  methods:{
    change(){
      this.currentTime=new Date();
      this.endTime=new Date(this.endTime);
      this.ms=this.endTime-this.currentTime;//毫秒数
      if (this.ms<=0) this.isEnd=true;
      this.hour=Math.floor(this.ms/1000/60/60);
      this.minute=Math.floor((this.ms-this.hour*1000*60*60)/1000/60);
      this.second=Math.floor((this.ms-this.hour*1000*60*60-this.minute*1000*60)/1000);
    }
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.change();
    }, 500)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
<style scoped>
.times{
  color: #ffffff;
  font-size: 16px;
  text-align: center;
}
.times .num{
  color: #ffffff;
  font-size: 20px ;
  font-weight: bold;
  margin-right: 5px;
}
.container{
  position: fixed;
  right: 70px;
  top: 0;
  margin: auto;
  background-color: #ec5e66;
  border-radius: 0 0 15px 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 15px;
  padding-left: 15px;
}
.end{
  color: #ffffff;
  font-size: 20px;
  text-align: center;
}
</style>