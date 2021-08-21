<template>
    <div id='sum' style="display: flex">
        <div id='aside'> 
              <el-button type="primary" id='newButton' icon='el-icon-plus'> <span style="font-weight: bold; font-size: 16px">创建问卷</span></el-button>
                <el-col :span="12" id='list'>
                    <el-menu id='item'
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
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
                    placeholder="根据问卷名或id搜索"
                    suffix-icon="el-icon-search"
                    @keyup.enter.native="searchQn"/>
                <el-dropdown split-button class='right' size="small">
                状态
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>已发布</el-dropdown-item>
                    <el-dropdown-item>未发布</el-dropdown-item>
                    <el-dropdown-item>所有</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown split-button class='right' size="small">
                排序
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>按创建时间正序</el-dropdown-item>
                    <el-dropdown-item>按创建时间倒序</el-dropdown-item>
                    <el-dropdown-item>按发布时间正序</el-dropdown-item>
                    <el-dropdown-item>按发布时间倒序</el-dropdown-item>
                    <el-dropdown-item>按答题人数正序</el-dropdown-item>
                    <el-dropdown-item>按答题人数倒序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-card v-for="(msg,index) in QnList" class="box-card" :key='index'>
                <div slot="header" style="display:flex">
                <el-row>
                    <el-col span=20>{{msg.title}}</el-col>
                </el-row>
                <span class="headspan">id：{{msg.paper_id}}</span>
                <span class="headspan">答卷：{{msg.recycling_num}}</span>
                <span v-if="msg.is_released" class="headspan">已发布</span>
                <span v-else class="headspan">未发布</span>
                <span class="headspan">创建时间：{{msg.create_time}}</span>
                </div>
                <div slot="default" class="card-body">
                    <el-link href="investigation" target="_blank" :underline="false" class="leftside el-icon-edit"> 编辑</el-link>
                    <el-link href="PageNotFound" target="_blank" :underline="false" class="leftside el-icon-view"> 预览</el-link>
                    <span class="leftside el-icon-share"> 分享</span>
                    <span class="leftside el-icon-s-data"> 统计</span>
                    <el-dropdown split-button class="leftside" size="mini" id="download">
                    导出
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>统计分析</el-dropdown-item>
                        <el-dropdown-item>下载答卷</el-dropdown-item>
                        <el-dropdown-item>来源分析</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="text" class="rightside el-icon-delete"> 删除</el-button>
                    <el-button type="text" class="rightside el-icon-star-off"> 收藏</el-button>
                    <el-button type="text" class="rightside el-icon-document"> 复制</el-button>
                    <el-button type="text" v-if="msg.is_released" @click="recycle(index)" class="rightside el-icon-video-pause"> 暂停</el-button>
                    <el-button type="text" v-else @click="release(index)" class="rightside el-icon-video-play"> 发布</el-button>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
export default {
  mounted() {

  },
  methods: {
    searchQn() {
      console.log(this.input);
    }
  },
  data() {
    return {
      input: '',
      QnList: [
        {
            title:'易灿和他的问卷',
            paper_id:19373000,
            recycling_num: 8,
            create_time:'2021/6/10 5:10',
            is_released: false,
            is_deleted: false
        },
        {
            title:'nn和他的问卷',
            paper_id:19373000,
            recycling_num: 1118,
            create_time:'2021/6/10 23:10',
            is_released: true
        },
        ]
      
    }
  },
  methods:{

      recycle:function (index){
        this.$alert('问卷已暂停', '', {
          confirmButtonText: '确定',
        });
        this.QnList[index].is_released=false
        
      },
      release:function(index){
        this.$alert('问卷已发布', '', {
          confirmButtonText: '确定',
        });          
        this.QnList[index].is_released=true
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
        font-size: 25px;
        text-align: left;
        padding: 30px 10px;
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
    }
    #download{
        padding: 3px 10px 12px 10px;
    }

    #newButton {
      width: 240px;
      height: 56px;
    }
</style>