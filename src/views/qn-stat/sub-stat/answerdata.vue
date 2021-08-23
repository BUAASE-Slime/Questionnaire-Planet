<template>
    <div id='sum'>
        <div><h1>回收数据</h1></div>
        <el-card class="box-card">
        <div>
             <el-button type="primary" >下载</el-button>
              <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                    prop="num"
                    label="序号"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    label="提交时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="donenum"
                    label="完成题目数量"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="donerate"
                    label="完成率"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="250" align="center">
                        <div style="display:inline">
                        <el-button type="text" class="el-icon-document" style="color: black">预览</el-button>
                        </div>
                        <div style="display:inline">
                        <el-button type="text" class="el-icon-delete" style="color: red">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
        </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
        num: 1,
        time:'2021/4/7 19:34:42',
        donenum:10,
        donerate:'70%',
        },
        {
        num: 2,
        time:'2021/4/7 19:34:42',
        donenum:10,
        donerate:'70%',
        },
        ]
      }
    }
  }
</script>

<style scoped>
 #sum{
         width: 90%;
        /* background-color: cyan; */
 }
 .el-button{
    float: right;
    margin: 30px;
 }
 .box-card{
     margin: 20px;
 }
</style>