<template>
    <div class="background">
            <div class="back-bt">
                <div id="icon">
                <img src="../../assets/images/survey2.png" alt="">
                </div>
                <h1 v-if="success">提交成功，感谢您的参与！</h1>
                <h1 v-if="close">问卷已结束，感谢您的参与！</h1>
                <el-button type="primary" size="middle">返回</el-button>
            </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            success: false,
            close: true
        }
    }
}
</script>


<style scoped>

.background {
  background-image: url("../../assets/images/preview_bk.png");
  background-repeat: repeat-y;
  min-height: 800px;
  overflow: hidden;
  background-position:center;
  background-size: 100% auto;
}
#icon{
    margin: 50px ;
    padding-top: 100px;
}
.back-bt {
  margin: 120px auto 0;
  width: 900px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-bottom: 100px;
}
</style>