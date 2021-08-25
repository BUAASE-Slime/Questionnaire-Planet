<template>
    <div id='sum'>
        <div><h1>交叉分析</h1></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="display: inline; float:left; margin-left:300px">
                    <span>定义行</span><br>
                      <el-select v-model="value1" placeholder="请选择">
                        <el-option
                        v-for="item in questions"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: inline; float:right; margin-right:300px" >
                    <span>定义列</span><br>
                      <el-select v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in questions"
                        :key="item.value2"
                        :label="item.label"
                        :value="item.value2">
                        </el-option>
                    </el-select>
                </div>
                <div style="clear:both;">
                    <el-button type="primary" @click="anlysis">分析</el-button>
                </div>
            </div>
            <div v-if="ans">
                <el-table style="width: 100%" border :data="tableData" v-loading="loading">
                  <template v-for="(item,index) in tableHead">
                    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
                  </template>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ans: false,
        tableHead:[],
        tableData: [],
        questions: [],
        value1: '',
        value2: '',
        loading: true,
      }
    },
    methods:{
      anlysis: function(){
        this.ans = true;

        const formData = new FormData();
        var id_1 = this.questions[this.value1-1].question_id;
        var id_2 = this.questions[this.value2-1].question_id;
        formData.append("question_id_1", id_1);
        formData.append("question_id_2", id_2);
        this.$axios({
          method: 'post',
          url: '/sm/cross/analysis',
          data: formData,
        })
        .then(res => {
          if (res.data.status_code === 1) {
            this.tableHead = res.data.tableHead;
            this.tableData = res.data.tableData;
            this.loading = false;
            console.log(this.tableHead);
            console.log(this.tableData);
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      const formData = new FormData();
      formData.append("qn_id", this.$route.query.pid);
      this.$axios({
        method: 'post',
        url: '/sm/get/qn/question/analysis',
        data: formData,
      })
      .then(res => {
        if (res.data.status_code === 1) {
          this.questions = res.data.questions;
        }
      })
      .catch(err => {
        console.log(err);
      })
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
    .el-select{
        margin: 10px;
    }
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>