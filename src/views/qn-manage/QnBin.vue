<template>
  <div class="bin">
      <el-row style="margin: 20px;color: #00aeff">
        如果您想释放上传文件题的空间，请点击“清空数据”，数据清空后将无法恢复，请谨慎操作！
      </el-row>
      <el-row style="text-align: center">
        <el-table
            :data="binData"
            stripe
            style="width: 60%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column
              prop="title"
              label="问卷名"
              min-width="350">
          </el-table-column>
          <el-table-column
              prop="date"
              label="发布时间"
              >
          </el-table-column>
          <el-table-column
              prop="num"
              label="答卷数"
              >
          </el-table-column>
          <el-table-column
              label="清空数据"
              >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  v-if="scope.row.num !== '0'" @click="clearData_pre(scope.$index)">清空数据</el-button>
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
        <el-button type="danger" plain style="margin-top: 20px" @click="empty_pre" >清空回收站</el-button>
      </el-row>
  </div>
</template>

<script>
export default {
  name: "QnBin",
  data() {
    return {
      binData: [
        {
          id: '1',
          title: '测试问卷1',
          date: '2021-08-22',
          num: '0',
        },
        {
          id: '2',
          title: '测试问卷2',
          date: '2021-08-22',
          num: '10',
        },
        {
          id: '3',
          title: '普通调查问卷',
          date: '2021-08-21',
          num: '100',
        },
        {
          id: '4',
          title: '特殊调查问卷',
          date: '2021-08-21',
          num: '100',
        },
        {
          id: '5',
          title: '已作废的问卷',
          date: '2021-08-21',
          num: '100',
        },
      ]
    }
  },
  methods:{
    empty_pre: function () {
      this.$confirm('此操作将彻底删除回收站中所有内容，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.empty()
        this.$message({
          type: 'success',
          message: '操作成功'
        });
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
        this.clearData(index);
        this.$message({
          type: 'success',
          message: '清空成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消清空'
        });
      });
    },
    clearData:function (index){
      this.binData[index].num=0;
      /////清空数据操作
    },
    del_pre: function (index) {
      this.$confirm('彻底删除将不可再恢复，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(index)
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
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
        this.$message({
          type: 'success',
          message: '恢复成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消恢复'
        });
      });
    },
    recovery: function (index) {
      /*

      恢复的相关后台操作

       */
      this.binData.splice(index,1);
    }
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
</style>