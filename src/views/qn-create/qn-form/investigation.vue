<template>
  <div class="investigation">
    <el-header class="header">
      <edit-header></edit-header>
    </el-header>

    <el-container class="container">
      <el-aside class="side">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="题目类型" name="first">
            <div class="edit">
              <div class="ques-type">
                <i class="el-icon-check"></i>
                <span> 单选题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <i class="el-icon-circle-plus type-icon"></i>
              </div>
              <div class="ques-type">
                <i class="el-icon-finished"></i>
                <span> 多选题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <i class="el-icon-circle-plus type-icon"></i>
              </div>
              <div class="ques-type">
                <i class="el-icon-edit-outline"></i>
                <span> 填空题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <i class="el-icon-circle-plus type-icon"></i>
              </div>
              <div class="ques-type">
                <i class="el-icon-star-off"></i>
                <span> 评分题&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <i class="el-icon-circle-plus type-icon"></i>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="问卷大纲" name="second">
            问卷大纲
          </el-tab-pane>
        </el-tabs>

      </el-aside>
      <el-main class="main">

      </el-main>
    </el-container>

  </div>
</template>

<script>
import editHeader from "../../../components/header/editHeader";

export default {
  name: "investigation",
  data() {
    return {
      isEditing: true,
    }
  },
  components: {
    editHeader,
  },
}
</script>

<style>
.investigation .container {
  padding: 0 100px;
  height: auto;
  min-height: 600px;
}

.investigation header {
  padding: 0 100px;
}

.investigation .side {
  border-top: solid 3px #e3e3e3;
  border-right: solid 3px #e3e3e3;
  background: #FFFFFF;
}

.investigation .main {
  border-top: solid 3px #e3e3e3;
  background: #FFFFFF;
}

.investigation .edit {
  margin-top: 0;
}

.investigation .ques-type {
  padding: 10px 20px;
  font-size: 16px;
}

.investigation .type-icon {
  color: #1687fd;
  display: inline-block;
}

.investigation .type-icon:hover {
  color: #409EFF;
  cursor: pointer;
}

.investigation .el-tabs__nav-scroll {
  text-align: center;
  height: 60px;
  margin: 0 60px;
}

.investigation .el-tabs__item {
  font-weight: bold;
  padding: 0 20px;
  height: 60px;
  box-sizing: border-box;
  line-height: 60px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  color: black;
  position: relative;
}

.investigation .el-tabs__header {
  margin: 0;
}

</style>