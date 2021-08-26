<template>
    <div id='sum'>
        <div><h1>回收数据</h1></div>
        <el-card class="box-card">
        <div>
              <div>
              <el-button type="primary" @click="downloadExcel" style="float: right;margin: 30px;">下载</el-button>
              </div>
              <div>
              <el-table
                    v-loading="loading"
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                          <div style="display:inline">
                            <el-button type="text" class="el-icon-delete" style="color: red" @click="delSubmit(scope.row.submit_id, scope.row.num)">删除</el-button>
                          </div>
                          <div style="display:inline">
                            <el-button type="text" class="el-icon-document" style="color: black">预览</el-button>
                          </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage" 
                :page-size="pageSize"
                :page-sizes="pageSizes" 
                :total="tableData.length" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                style="margin: 20px"
                v-if="!loading">
                </el-pagination>
                </div>
        </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        
        currentPage: 1,
        pageSize: 5,
        pageSizes:[3,5,7],
        loading: true,
        tableData: [
        // {
        // num: 1,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 2,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 3,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 4,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },       
        // {
        // num: 5,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 6,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 7,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 8,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },   
        // {
        // num: 9,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 10,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // }, 
        // {
        // num: 11,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 12,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 13,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 14,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },       
        // {
        // num: 15,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },
        // {
        // num: 16,
        // submit_time:'2021/4/7 19:34:42',
        // answer_num:10,
        // answer_percent:'70%',
        // },     
        ]
      }
    },
    created() {
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn/all_submit',
        data: formData,
      })
      .then(res => {
        if (res.data.status_code === 1) {
          this.tableData = res.data.submits;
          this.loading = false;
        } else {
          this.$message.error("请求失败！");
          setTimeout(() => {
            this.$router.push('/index');
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      delSubmit(index, num) {
        this.$confirm('此操作将永久删除该答卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const formData = new FormData();
          formData.append("submit_id", index);
          this.$axios({
            method: 'post',
            url: '/sm/delete/submit',
            data: formData,
          })
          .then(res => {
            switch (res.data.status_code) {
              case 1:
                this.$message.success("删除成功");
                this.tableData.splice(num-1, 1);
                for (var i=num+1; i<=this.tableData.length+1; i++)
                  this.tableData[i-2].num -= 1;
                break;
              default:
                this.$message.error("执行操作失败");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
        }).catch(() => {
        });
      },
      downloadExcel() {
        const formData = new FormData();
        formData.append('qn_id', this.$route.query.pid);
        this.$axios({
          method: 'post',
          url: '/sm/export/excel',
          data: formData
        })
        .then(res => {
          switch (res.data.status_code) {
            case 1:
              var url = res.data.excel_url;
              var downloadLink = document.createElement('a');
              downloadLink.download = res.data.excel_name;
              downloadLink.href = url;
              downloadLink.click();
              downloadLink.remove();
              break;
            case 3:
              this.$message.error("该问卷暂无提交，无法导出");
              break;
            default:
              this.$message.error("请求失败！");
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
         width: 90%;
        /* background-color: cyan; */
 }
 .el-button{
    float: right;
    margin: 0 30px;
 }
 .box-card{
     margin: 20px;
 }
</style>