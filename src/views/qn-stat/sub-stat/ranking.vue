<template>
    <div id='sum'>
        <div><h1>成绩排名</h1></div>
        <el-card class="box-card">
            <div>
                <el-table
                    v-loading="loading"
                    :data="submits.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    style="width: 100%; margin-top:50px;"
                    >
                    <el-table-column
                    prop="rank"
                    label="排名"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-medal-1" style="font-size:20px; float:left;" v-if="scope.row.rank==1"></i>
                        <i class="el-icon-medal" style="font-size:20px; float:left;" v-if="scope.row.rank==2||scope.row.rank==3"></i>
                        <span style="display: block; margin-right:76px; float:right;">{{scope.row.rank}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="submit_time"
                    label="提交时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="填写用户"
                        align="center">
                    </el-table-column>
                    <el-table-column
                    prop="answer_num"
                    label="完成题目数量"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="answer_percent"
                    label="完成率"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="score"
                    label="得分"
                    width="180"
                    align="center">
                    </el-table-column>
                </el-table>
                <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage" 
                :page-size="pageSize"
                :page-sizes="pageSizes" 
                :total="submits.length" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                style="margin: 20px"
                v-if="!loading">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
   data(){
       return{
        currentPage: 1,
        pageSize: 10,
        pageSizes:[5,10,15],
        status_code:1,
        message:"success",
        submits:[
        {
            score:11,
            submit_time:"2021/08/28 20:18",
            rank:1,
            num:1,
            submit_id:193,
            username:"huangzehuan",
            is_valid:true,
            qn_id:161,
            answer_num:6,
            answer_percent:"100.00%"
        },
        {
            score:6,
            submit_time:"2021/08/28 15:27",
            rank:2,
            num:2,
            submit_id:173,
            username:"MissTong",
            is_valid:true,
            qn_id:161,
            answer_num:6,
            answer_percent:"100.00%"
        },
        {
            score:5,
            submit_time:"2021/08/28 20:26",
            rank:3,
            num:3,
            submit_id:194,
            username:"liyu",
            is_valid:true,
            qn_id:161,
            answer_num:6,
            answer_percent:"100.00%"
        }
        ]
      }
   },
   methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
   }
}
</script>


<style scoped>
 #sum{
         width: 90%;
        /* background-color: cyan; */
 }
  .box-card{
     margin: 20px;
 }
</style>