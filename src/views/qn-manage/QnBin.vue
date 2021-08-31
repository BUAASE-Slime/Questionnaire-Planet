<template>
  <div class="bin">
      <el-row >
        <el-col :span="6">
        <div>
        <el-button size="small" id="backB" type="primary" plain icon="el-icon-back" @click="goIndex">返回</el-button>
        </div>
        </el-col>
        <el-col :span="16">
        <div id="hint">
        <span style="display:block; margin: 25px;color: #00aeff;">如果您想恢复或清空回收站内的问卷数据，请点击相应按钮，注意数据清空后将无法恢复，请谨慎操作！</span> 
        </div>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-table
            v-loading="loading"
            :data="binData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            stripe
            style="width: 70%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column
              prop="title"
              label="问卷名"
              min-width="350">
          </el-table-column>
          <el-table-column
              prop="create_time"
              label="创建时间"
              min-width="120"
              >
          </el-table-column>
          <el-table-column
              prop="recycling_num"
              label="答卷数"
              >
          </el-table-column>
          <el-table-column
              label="清空数据"
              >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  v-if="scope.row.recycling_num !== 0" @click="clearData_pre(scope.$index)">清空数据</el-button>
            </template>
            <el-button ></el-button>
          </el-table-column>
          <el-table-column
              label="恢复"
              >
            <i class="el-icon-caret-right"></i>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="recovery_pre(scope.$index)">恢复</el-button>
            </template>
          </el-table-column>
          <el-table-column
              label="彻底删除"
              >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="danger"
                  @click="del_pre(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage" 
                :page-size="pageSize"
                :page-sizes="pageSizes" 
                :total="binData.length" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                style="margin: 20px"
                v-if="!loading">
        </el-pagination>
        <el-button type="danger" plain style="margin-top: 20px" @click="empty_pre" >清空回收站</el-button>
      </el-row>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "QnBin",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes:[7,10,15],
      loading: true,
      /*
      binData: [
        {
          survey_id: 1,
          title: '测试问卷1',
          create_time: '2021/08/22 12:00',
          recycling_num: 0,
        },
        {
          survey_id: 2,
          title: '测试问卷2',
          create_time: '2021/08/22 12:00',
          recycling_num: 10,
        },
        {
          survey_id: 3,
          title: '普通调查问卷',
          create_time: '2021/08/22 12:00',
          recycling_num: 100,
        },
        {
          survey_id: 4,
          title: '特殊调查问卷',
          create_time: '2021/08/22 12:00',
          recycling_num: 100,
        },
        {
          survey_id: 5,
          title: '已作废的问卷',
          create_time: '2021/08/22 12:00',
          recycling_num: 100,
        },
      ]
       */
      binData: []
    }
  },
  methods:{
      goIndex: function () {
        this.$router.push('/index');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
    empty_pre: function () {
      this.$confirm('此操作将彻底删除回收站中所有内容，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.binData.length === 0) {
          this.$message.info("回收站为空，无需执行此操作！");
        } else {
          let loadingIns = this.$loading({fullscreen: true, text: '正在为您清空回收站'});
          const formData = new FormData();
          formData.append("username", user.getters.getUser(user.state()).user.username);
          this.$axios({
            method: 'post',
            url: '/sm/delete/qn/empty',
            data: formData,
          })
          .then(res => {
            loadingIns.close();
            if (res.data.status_code === 1) {
              this.empty()
              this.$message({
                type: 'success',
                message: '操作成功'
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
    empty: function () {
      this.binData.splice(0,this.binData.length);
    },
    clearData_pre:function (index){
      this.$confirm('清空数据将不可再恢复，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loadingIns = this.$loading({fullscreen: true, text: '清空数据中'});
        const formData = new FormData();
        formData.append("qn_id", this.binData[index].survey_id);
        this.$axios({
          method: 'post',
          url: '/sm/delete/all_submit',
          data: formData,
        })
        .then(res => {
          loadingIns.close();
          switch (res.data.status_code) {
            case 0:
              this.$message.warning("您无权执行此操作！");
              break;
            case 1:
              this.clearData(index);
              this.$message({
                type: 'success',
                message: '清空成功'
              });
              break;
            default:
              this.$message.error("清空失败！");
              break;
          }
        })
      }).catch(() => {
      });
    },
    clearData:function (index){
      this.binData[index].recycling_num=0;
    },
    del_pre: function (index) {
      this.$confirm('彻底删除将不可再恢复，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loadingIns = this.$loading({fullscreen: true});
        const formData = new FormData();
        formData.append("qn_id", this.binData[index].survey_id);
        this.$axios({
          url: '/sm/delete/qn/real',
          method: 'post',
          data: formData
        })
        .then(res => {
          loadingIns.close();
          switch (res.data.status_code) {
            case 0:
              this.$message.warning("您无权执行此操作！");
              break;
            case 1:
              this.del(index)
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              break;
            default:
              this.$message.error("删除失败！");
              break;
          }
        })
      }).catch(() => {

      });
    },
    del: function (index) {
      this.binData.splice(index,1);
    },
    recovery_pre: function (index) {
      this.$confirm('问卷将恢复至问卷仓库，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.recovery(index)
      }).catch(() => {
      });
    },
    recovery: function (index) {
        let loadingIns = this.$loading({fullscreen: true});
      const formData = new FormData();
      formData.append("qn_id", this.binData[index].survey_id);
      this.$axios({
        url: '/sm/delete/qn/recover',
        method: 'post',
        data: formData,
      })
      .then(res => {
        loadingIns.close();
        switch (res.data.status_code) {
          case 1:
            this.$message({
              type: 'success',
              message: '恢复成功'
            });
            this.binData.splice(index,1);
            break;
          default:
            this.$message.error("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    let formData = new FormData();
    const userInfo = user.getters.getUser(user.state());
    formData.append("username", userInfo.user.username);
    formData.append("is_deleted", 1);
    this.$axios({
      method: 'post',
      url: '/qn/get_list',
      data: formData,
    })
    .then(res => {
      switch (res.data.status_code) {
        case 401:
          this.$message.warning("您无权访问！");
          location.reload();
          break;
        case 403:
          this.$message.warning("您无权访问！");
          location.reload();
          break;
        case 404:
          this.binData = [];
          this.loading = false;
          break;
        default:
          this.binData = JSON.parse(res.data.data);
          this.loading = false;
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
.bin{
  width: 100%;
}
.bin .el-table{
  margin: auto;
  text-align: center;
}
#backB{
  display: flex;
  float:left;
  margin: 20px;
  margin-left: 240px;

}
#hint{
  text-align: left;
}
</style>