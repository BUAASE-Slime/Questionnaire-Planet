<template>
    <div id='sum' style="display: flex">
        <div id='aside'> 
              <el-button type="primary" id='newButton' icon='el-icon-plus'> 创建问卷</el-button>
                <el-col :span="12" id='list'>
                    <el-menu id='item'
                    default-active="2"
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
                <span style="margin-left: 70px">问卷列表</span>
                <el-input class='right' v-model="input" placeholder="根据问卷名或id搜索" suffix-icon="el-icon-search"></el-input>
                <el-dropdown split-button class='right'>
                状态
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>已发布</el-dropdown-item>
                    <el-dropdown-item>未发布</el-dropdown-item>
                    <el-dropdown-item>所有</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown split-button class='right'>
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
                    <span class="leftside el-icon-edit"> 编辑</span>
                    <span class="leftside el-icon-view"> 预览</span>
                    <span class="leftside el-icon-share"> 分享</span>
                    <span class="leftside el-icon-s-data"> 统计</span>
                    <el-dropdown split-button class="leftside">
                    导出
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>统计分析</el-dropdown-item>
                        <el-dropdown-item>下载答卷</el-dropdown-item>
                        <el-dropdown-item>来源分析</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <span class="rightside el-icon-delete"> 删除</span>
                    <span class="rightside el-icon-star-off"> 收藏</span>
                    <span class="rightside el-icon-document"> 复制</span>
                    <span v-if="msg.is_released" class="rightside el-icon-video-pause"> 暂停</span>
                    <span v-else class="rightside el-icon-video-play"> 发布</span>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
        input: '',
      QnList: [
        {
            title:'易灿和他的问卷',
            paper_id:19373000,
            recycling_num: 8,
            create_time:'2021/6/10',
            is_released: false
        },
        {
            title:'nn和他的问卷',
            paper_id:19373000,
            recycling_num: 8,
            create_time:'2021/6/10',
            is_released: true
        },
        ]
      
    }
  }
}
</script>

<style scoped>
#sum{
    height: 1000px;
    width: 100%;
    min-width: 2500px;
    background-color: rgb(241, 241, 241);
}
#aside{
    width: 25%;
    /* background-color: antiquewhite; */
    min-width: 650px;
}
#mainpage{
    width: 75%;
    /* background-color: aquamarine; */
    min-width: 1900px;
}
#newButton{
    width: 60%;
    height: 100px;
    font-size: 30px;
    margin-top: 50px;
}
#list{
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;

}
#list .el-menu{
    width: 65%;
    margin: 0 108px;
}
#list .el-menu-item{
    height: 100px;
    font-size: 25px;
    padding: 28px 0;
    text-align: center;
}

#title{

    height: 70px;
    font-size: 40px;
    text-align: left;
    padding: 60px 20px;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.el-input{
    width: 300px;
}
.right{
    float: right;
    margin: 0 50px;
    /* margin-top: 10px; */
    padding: 25px 0;
}

.box-card {
margin: 50px 100px;
width: 89%;
height: auto;
font-size: 25px;
}
.el-col-20{
    text-align: left;
    font-size: 30px;
    padding: 10px 30px;
    width: 800px;
    font-weight: bold;
}
.headspan{
    padding: 15px 28px;
}
.leftside{
    float: left;
    padding: 20px ;
}
.rightside{
    float: right;
    padding: 20px;
}
</style>