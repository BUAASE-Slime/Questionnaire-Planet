<template>
  <el-row class="edit-header">
    <el-col :span="2" class="lf-bt"><el-button icon="el-icon-edit" @click="open_1">编辑标题</el-button></el-col>
    <el-col :span="2" class="lf-bt"><el-button icon="el-icon-edit-outline" @click="open_2">编辑说明</el-button></el-col>
    <el-col :span="2" class="lf-bt"><el-button icon="el-icon-setting" @click="setting">高级设置</el-button></el-col>
    <el-col :span="2" class="button"><el-button type="success" icon="el-icon-upload2" @click="publish">发布</el-button></el-col>
    <el-col :span="2" class="button"><el-button type="warning" icon="el-icon-receiving" @click="save">保存</el-button></el-col>
    <el-col :span="2" class="button"><el-button type="primary" icon="el-icon-view" @click="preview">预览</el-button></el-col>
  </el-row>
</template>

<script>
export default {
  name: "editHeader",
  props: {
    title: String,
    description: String,
  },
  data() {
    return {

    }
  },
  methods: {
    open_1: function () {
      this.$prompt('请输入问卷标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '问卷标题不能为空'
      }).then(({ value }) => {
        this.changeTitle(value)
        this.$message({
          type: 'success',
          message: '标题被成功更改为: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    open_2: function () {
      this.$prompt('请输入问卷描述', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.changeDescription(value)
        this.$message({
          type: 'success',
          message: '问题描述成功更改'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    setting: function () {
      this.$emit("advancedSetting");
    },
    open_3:function (){
      this.$confirm('确认发布？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.publishSuccess();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消发布'
        });
      });
    },
    publishSuccess:function (){
      this.$emit("publishSuccess");
    },
    changeTitle: function (value) {
      this.$emit("titleChanged", value);
    },
    changeDescription: function (value) {
      this.$emit("descriptionChanged", value);
    },
    publish() {
      this.$emit("publishClicked");
    },
    save() {
      this.$emit("saveClicked");
    },
    preview: function () {
      this.$emit("qnPreview", '0');
    },
  }
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

.edit-header .lf-bt {
  float: left;
  padding-top: 10px;
  padding-left: 12px;
}

.edit-header .lf-bt .el-button {
  transition: .1s;
  font-weight: 500;
  padding: 12px 12px;
  font-size: 14px;
  border-radius: 4px;
}
</style>