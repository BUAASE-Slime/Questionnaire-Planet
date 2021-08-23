<template>
    <div id="sum">
        <el-row :gutter="20">
        <el-col :span="6" style="width:480px"><div class="grid-content ">
            <el-card class="box-card1">
            <!-- <div>
                <h2 style="">{{name}}</h2>
                <span >id: {{userid}}</span><br>
                <div style="margin: 20px;">
                <img src="../../assets/images/star2.png">
                </div>
            </div> -->
            <div style="padding:25px 0;">
                <img src="../../assets/images/star4.png">
                <h2 style="">{{name}}</h2>
                <span >id: {{userid}}</span><br>
            </div>
            </el-card>
        </div></el-col>

        <el-col :span="6"><div class="grid-content">
            <el-card class="box-card2">
            <div slot="header" class="clearfix" style="display:flex">
                <div id="accountinfo">
                    <h2 style="margin-left: 80px; text-align: left;">账户信息</h2>
                    <div class="ainfo2" style="margin-top:50px"><span>用户名：{{name}}</span></div>
                    <div class="ainfo2"><span>用户id：{{userid}}</span></div>
                </div>
            </div>
            <div style="display:flex" id="set">
              <div>
                  <h2 style="margin-left: 80px; text-align: left;">账户设置</h2>
                  <!-- <div class="ainfo2" style="margin-top:50px"  v-if="havephone">
                    <span style="display:inline-block; width: 400px">手机号：{{phone}}</span>
                    <el-button type="primary" size="small" >更改</el-button>
                  </div>
                  <div class="ainfo2" style="margin-top:50px"  v-else >
                    <span style="display:inline-block; width: 400px">手机号：未绑定</span>
                    <el-button type="primary" size="small" >去绑定</el-button>
                  </div> -->
                  <div class="ainfo2" v-if="haveemail" >
                    <span style="display:inline-block; width: 400px">邮箱地址：{{email}}</span>
                    <el-button type="primary" size="small" >更改</el-button>
                  </div>
                  <div class="ainfo2" v-else >
                    <span style="display:inline-block; width: 400px">邮箱地址：去绑定</span>
                    <el-button type="primary" size="small" >去绑定</el-button>
                  </div>
                  <div class="ainfo2">
                    <span style="display:inline-block; width: 100px">密码：</span>
                    <el-button type="primary" size="small" >修改密码</el-button>
                  </div>

                </div>
            </div>
            </el-card>
        </div></el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          name:"合成大西瓜",
          userid:"66666789",
          phone:"15545677845",
          email:"wenjuanxingqiu@126.com",
          password:"eeerty",
          haveemail:true,
          havephone:false
      }
    }
  }
</script>

<style scoped>
#sum{
    width: 95%;
    /* background-color: cyan; */
    padding: 20px;
}

.el-button{
  color: #2d94d4;
  background-color: white;
  font-size: 14px;
  margin-left: 20px;
}

.ainfo2{
    margin:30px;
    margin-left: 80px;
    text-align: left;
}

.text {
font-size: 14px;
}

.item {
padding: 18px 0;
}

.box-card1 {
width: 425px;
margin: 10px;
}
.box-card2 {
width: 900px;
margin: 10px 30px;
}
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>