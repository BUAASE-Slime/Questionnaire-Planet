<template>
    <div id='sum' style="display: flex">
        <div id='aside'> 
              <el-button type="primary" id='newButton' icon='el-icon-plus' @click="linkCreate">
                <span style="font-weight: bold; font-size: 16px">创建问卷</span>
              </el-button>
                <el-col :span="12" id='list'>
                    <el-menu id='item'
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">全部问卷</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">星标问卷</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-delete"></i>
                        <span slot="title">回收站</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
        </div>
        <div id='mainpage'>
            <div id='title'>
                <span style="margin-left: 35px">问卷列表</span>
                <el-input
                    class='right'
                    v-model="input"
                    size="small"
                    placeholder="根据问卷名进行搜索.."
                    @keyup.enter.native="searchQn">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQn" style="cursor: pointer"></i>
                </el-input>

                <el-dropdown @command="selectType" split-button class='right' size="small">
                  {{ qnType }}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="所有">所有</el-dropdown-item>
                    <el-dropdown-item command="已发布">已发布</el-dropdown-item>
                    <el-dropdown-item command="未发布">未发布</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="orderIndex" split-button class='right' size="small">
                  {{ orderQn }}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">按创建时间正序</el-dropdown-item>
                    <el-dropdown-item command="2">按创建时间倒序</el-dropdown-item>
                    <el-dropdown-item command="3">按发布时间正序</el-dropdown-item>
                    <el-dropdown-item command="4">按发布时间倒序</el-dropdown-item>
                    <el-dropdown-item command="5">按答题人数正序</el-dropdown-item>
                    <el-dropdown-item command="6">按答题人数倒序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>

            </div>

            <div v-if="hasQn">
              <el-card v-for="(msg,index) in QnList" class="box-card" :key='index'>
                <div slot="header" style="display:flex">
                  <el-row>
                    <el-col span=20>{{msg.title}}</el-col>
                  </el-row>
                  <span class="headspan">id：{{msg.survey_id}}</span>
                  <span class="headspan">答卷：{{msg.recycling_num}}</span>
                  <span v-if="msg.is_released" class="headspan">已发布</span>
                  <span v-else class="headspan">未发布</span>
                  <span class="headspan">创建时间：{{msg.create_time}}</span>
                </div>
                <div slot="default" class="card-body">
                  <el-link :href="editUrl(msg)" target="_blank" :underline="false" class="leftside el-icon-edit">&nbsp;编辑</el-link>
                  <el-link :href="previewUrl(msg)" target="_blank" :underline="false" class="leftside el-icon-view">&nbsp;预览</el-link>
                  <el-link href="PageNotFound" target="_blank" :underline="false" class="leftside el-icon-share">&nbsp;分享</el-link>
                  <el-link href="PageNotFound" target="_blank" :underline="false" class="leftside el-icon-s-data">&nbsp;统计</el-link>
                  <el-dropdown split-button class="leftside" size="mini" id="download" @command="selectExportType">
                    导出
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="word">导出Word</el-dropdown-item>
                      <el-dropdown-item command="pdf">导出PDF</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="text" class="rightside el-icon-delete" @click="deleteQn(index)"> 删除</el-button>
                  <el-button type="text" class="rightside el-icon-star-on" @click="uncollectQn(index)" v-if="msg.is_collected"> 收藏</el-button>
                  <el-button type="text" class="rightside el-icon-star-off" @click="collectQn(index)" v-else> 收藏</el-button>
                  <el-button type="text" class="rightside el-icon-document" @click="copyQn(msg)"> 复制</el-button>
                  <el-button type="text" v-if="msg.is_released" @click="recycle(index)" class="rightside el-icon-video-pause"> 暂停</el-button>
                  <el-button type="text" v-else @click="release(index)" class="rightside el-icon-video-play"> 发布</el-button>
                </div>
              </el-card>
            </div>
          <div v-else>
            <el-divider/>
            <el-empty :image-size="225" description="未查询到满足条件的问卷！">
              <el-button type="primary" @click="linkCreate">创建问卷</el-button>
            </el-empty>
          </div>
        </div>
    </div>

</template>

<script>
import user from "@/store/user";

export default {
  created() {
    this.searchQns();
  },
  data() {
    return {
      activeIdx: "1",

      qnType: '问卷状态',
      orderQn: '排序依据',

      qnKey: '',
      orderItem: 'default',
      orderType: 'default',
      hasQn: true,
      input: '',
      is_released: "default",
      is_collected: 0,
      QnList: [
        // {
        //     title:'易灿和他的问卷',
        //     paper_id:19373000,
        //     recycling_num: 8,
        //     create_time:'2021/6/10 5:10',
        //     is_released: false,
        //     is_deleted: false,
        //     is_collected: false,
        // },
        // {
        //     title:'nn和他的问卷',
        //     paper_id:19373000,
        //     recycling_num: 1118,
        //     create_time:'2021/6/10 23:10',
        //     is_released: true,
        //     is_collected: true,
        // },
      ],
    }
  },
  methods:{
    recycle:function (index){
      this.$alert('问卷暂停成功', '', {
        confirmButtonText: '确定',
      });
      this.QnList[index].is_released=false

    },
    release:function(index){
      this.$alert('问卷发布成功', '', {
        confirmButtonText: '确定',
      });
      this.QnList[index].is_released=true
    },

    deleteQn(index) {
      this.$confirm('此操作将问卷移入回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = new FormData();
        formData.append("qn_id", this.QnList[index].survey_id);
        this.$axios({
          method: 'post',
          url: '/sm/delete/qn/not_real',
          data: formData
        })
        .then(res => {
          switch (res.data.status_code) {
            case 1:
              this.QnList.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              break;
            default:
              this.$message.error("操作失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    uncollectQn(index) {
      const formData = new FormData();
      formData.append("survey_id", this.QnList[index].survey_id);
      this.$axios({
        method: 'post',
        url: '/qn/not_collect',
        data: formData
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.QnList[index].is_collected = false;
            this.QnList.splice(index, 1);
            break;
          case 401:
            this.$message.error("您无权执行此操作！");
            break;
          case 403:
            this.$message.error("您无权执行此操作！");
            break;
          default:
            this.$message.warning("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    collectQn(index) {
      const formData = new FormData();
      formData.append("survey_id", this.QnList[index].survey_id);
      this.$axios({
        method: 'post',
        url: '/qn/collect',
        data: formData
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.QnList[index].is_collected = true;
            break;
          case 401:
            this.$message.error("您无权执行此操作！");
            break;
          case 403:
            this.$message.error("您无权执行此操作！");
            break;
          default:
            this.$message.warning("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    editUrl(index) {
      return 'edit?pid=' + index.survey_id;
    },
    previewUrl(index) {
      return 'preview?pid=' + index.survey_id;
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initParams() {
      this.qnType = '问卷状态';
      this.orderQn = '排序依据';
      this.qnKey = '';
      this.orderType = 'default';
      this.orderItem = 'default';
      this.hasQn = true;
      this.is_released = 'default';
      this.is_collected = 0;
      this.input = '';
    },
    handleSelect(key) {
      this.activeIdx = key;

      this.initParams();

      switch (this.activeIdx) {
        case "1":
          this.is_collected = 0;
          this.searchQns();
          break;
        case "2":
          this.is_collected = 1;
          this.searchQns();
          break;
        case "3":

          break;
      }
    },

    selectExportType(command) {
      console.log(command);
      switch (command) {
        case "word":
          window.alert("导出word");
          break;
        case "pdf":
          window.alert("导出pdf");
          break;
      }
    },

    linkCreate() {
      this.$router.push('/create_ques');
    },

    searchQn() {
      this.qnKey = this.input;
      this.searchQns();
    },
    selectType(command) {
      this.qnType = command;
      switch (command) {
        case "所有":
          this.is_released = "default";
          break;
        case "已发布":
          this.is_released = "1";
          break;
        case "未发布":
          this.is_released = "0";
          break;
      }
      this.searchQns();
    },
    orderIndex(command) {
      console.log(command);
      switch (command) {
        case "1":
          this.orderQn = "按创建时间正序";
          this.orderItem = "created_time";
          this.orderType = "desc";
          break;
        case "2":
          this.orderQn = "按创建时间倒序";
          this.orderItem = "created_time";
          this.orderType = "asc";
          break;
        case "3":
          this.orderQn = "按发布时间正序";
          this.orderItem = "release_time";
          this.orderType = "desc";
          break;
        case "4":
          this.orderQn = "按发布时间倒序";
          this.orderItem = "release_time";
          this.orderType = "asc";
          break;
        case "5":
          this.orderQn = "按答题人数正序";
          this.orderItem = "recycling_num";
          this.orderType = "desc";
          break;
        case "6":
          this.orderQn = "按答题人数倒序";
          this.orderItem = "recycling_num";
          this.orderType = "asc";
          break;
      }
      this.searchQns();
    },

    searchQns() {
      let formData = new FormData();
      const userInfo = user.getters.getUser(user.state());
      formData.append("username", userInfo.user.username);

      if (this.is_released === "1")
      {
        formData.append("is_released", 1);
        console.log("1");
      }
      else if (this.is_released === "0")
      {
        formData.append("is_released", 0);
        console.log("0");
      }

      if (this.orderItem !== "default" && this.orderType !== "default") {
        formData.append("order_item", this.orderItem);
        formData.append("order_type", this.orderType);
      }
      if (this.qnKey !== "")
        formData.append("title_key", this.qnKey);
      if (this.is_collected === 1)
        formData.append("is_collected", this.is_collected);

      this.$axios({
        method: 'post',
        url: '/qn/get_list',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 401:
            this.$message.warning("您无权访问！");
            break;
          case 403:
            this.$message.warning("您无权访问！");
            break;
          case 404:
            this.hasQn = false;
            console.log('success! qn none!')
            break;
          default:
            this.QnList = JSON.parse(res.data.data);
            console.log('success');
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
    #sum{
        /*height: 1000px;*/
        width: 100%;
        min-width: 1200px;
        /* background-color: rgb(241, 241, 241); */
    }
    #aside{
        width: 340px;
        /* background-color: antiquewhite; */
        min-width: 325px;
    }
    #mainpage{
        width: 70%;
        /* background-color: aquamarine; */
        min-width: 850px;
    }
    #newButton{
        width: 60%;
        height: 50px;
        font-size: 15px;
        margin-top: 25px;
    }
    #list{
        width: 100%;
        margin-top: 25px;
    }
    #list .el-menu{
        width: 240px;
        margin: 0 54px;
    }
    #list .el-menu-item{
        height: 50px;
        font-size: 14px;
        text-align: center;
    }

    #title{

        height: 35px;
        font-size: 22px;
        text-align: left;
        margin: 15px;
        font-weight: bold;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-icon-arrow-down {
        font-size: 6px;
    }
    .el-input{
        width: 200px;
    }
    .right{
        float: right;
        margin: 0 15px; 
        /* margin-top: 10px; */
        padding: 13px 0;
    }

    .box-card {
    margin: 25px 50px;
    width: 89%;
    height: auto;
    font-size: 12px;
    }
    .el-col-20{
        text-align: left;
        font-size: 16px;
        padding: 5px 15px;
        width: 520px;
        /* font-weight: bold; */
    }
    .headspan{
        padding: 7px 7px;
    }
    .leftside{
        float: left;
        padding: 10px ;
    }
    .rightside{
        float: right;
        padding: 10px;
        color: black;
      font-size: 13px;
    }
    #download{
        padding: 3px 10px 12px 10px;
    }

    #newButton {
      width: 240px;
      height: 56px;
    }

    .el-icon-my-star {
        background: url("/src/assets/icon/star.png") center no-repeat;
        background-size: cover;
      font-family: element-icons;
    }
    .el-icon-my-star:before {
      font-size: 13px;
      content: "66ff";
      visibility: hidden;
      font-family: element-icons,serif!important;
    }
</style>