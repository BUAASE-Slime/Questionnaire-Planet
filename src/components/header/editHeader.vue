<template>
  <el-row class="edit-header">
    <el-col :span="2" class="button"><el-button type="success" icon="el-icon-upload2">发布</el-button></el-col>
    <el-col :span="2" class="button"><el-button type="primary" icon="el-icon-receiving">保存</el-button></el-col>
    <el-col :span="2" class="button"><el-button icon="el-icon-view">预览</el-button></el-col>
  </el-row>
</template>

<script>
export default {
  name: "editHeader",
  data() {
    return {

    }
  },
}
</script>

<style>
.edit-header {
  background: #FFFFFF;
  height: 60px;
  text-align: center;
}

.edit-header .button {
  padding-top: 10px;
  float: right;
}
</style>