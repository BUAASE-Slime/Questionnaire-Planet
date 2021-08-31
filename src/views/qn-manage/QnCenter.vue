<template>
    <div id='sum' style="display: flex">
        <div id='aside'>
              <el-button type="primary" id='newButton' icon='el-icon-plus' @click="linkCreate">
                <span style="font-weight: bold; font-size: 16px">创建问卷</span>
              </el-button>
                <el-col :span="12" id='list'>
                    <el-menu id='item'
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @select="handleSelect">
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
                <span style="margin-left: 35px">问卷列表</span>
                <el-input
                    class='right'
                    v-model="input"
                    size="small"
                    placeholder="根据问卷名进行搜索.."
                    @keyup.enter.native="searchQn">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQn" style="cursor: pointer"></i>
                </el-input>

              <el-dropdown @command="selectQnType" split-button class='right' size="small">
                {{ qnValue }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">所有</el-dropdown-item>
                  <el-dropdown-item command="1">调查问卷</el-dropdown-item>
                  <el-dropdown-item command="2">考试问卷</el-dropdown-item>
                  <el-dropdown-item command="3">投票问卷</el-dropdown-item>
                  <el-dropdown-item command="4">报名问卷</el-dropdown-item>
                  <el-dropdown-item command="5">打卡问卷</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

                <el-dropdown @command="selectType" split-button class='right' size="small">
                  {{ qnType }}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="所有">所有</el-dropdown-item>
                    <el-dropdown-item command="已发布">已发布</el-dropdown-item>
                    <el-dropdown-item command="未发布">未发布</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="orderIndex" split-button class='right' size="small">
                  {{ orderQn }}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">按创建时间正序</el-dropdown-item>
                    <el-dropdown-item command="2">按创建时间倒序</el-dropdown-item>
                    <el-dropdown-item command="3">按发布时间正序</el-dropdown-item>
                    <el-dropdown-item command="4">按发布时间倒序</el-dropdown-item>
                    <el-dropdown-item command="5">按答题人数正序</el-dropdown-item>
                    <el-dropdown-item command="6">按答题人数倒序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>

            </div>

            <div v-if="hasQn" id="main-body">
              <div>
              <el-card v-for="(msg,index) in userdata" class="box-card" :key='index' >
                <div slot="header" style="display:flex">
                  <el-row>
                    <el-col span=20>{{msg.title}}</el-col>
                  </el-row>
                  <span class="headspan">id：{{msg.survey_id}}</span>
                  <span v-if="msg.is_released" class="headspan" style="color: #02923b"><i class="el-icon-success"></i> 已发布</span>
                  <span v-else class="headspan"><i class="el-icon-error"></i> 未发布</span>
                  <span class="headspan">答卷：
                    <span v-if="msg.recycling_num===0">{{msg.recycling_num}}</span>
                    <span v-else style="color: #1687fd">{{msg.recycling_num}}</span>
                  </span>
                  <span class="headspan">创建时间：{{msg.create_time}}</span>
                </div>
                <div slot="default" class="card-body" >
                  <el-link @click="editUrl(indexMethod(index))" :underline="false" class="leftside el-icon-edit">&nbsp;编辑</el-link>
                  <el-link :href="previewUrl(msg)" :underline="false" class="leftside el-icon-view">&nbsp;预览</el-link>
                  <el-link @click="openShare(indexMethod(index))" :underline="false" class="leftside el-icon-share">&nbsp;分享</el-link>
                  <el-link @click="statUrl(indexMethod(index))" :underline="false" class="leftside el-icon-s-data">&nbsp;统计</el-link>
                  <el-link @click="refresh(indexMethod(index))" :underline="false" class="leftside el-icon-refresh">&nbsp;清空</el-link>
                  <el-dropdown split-button class="leftside" size="mini" id="download" @command="selectExportType">
                    导出
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="beforeHandleCommand(indexMethod(index),'word')">导出Word</el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(indexMethod(index),'pdf')">导出PDF</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="text" class="rightside el-icon-delete" @click="deleteQn(indexMethod(index))"> 删除</el-button>
                  <el-button type="text" class="rightside el-icon-star-on" @click="uncollectQn(indexMethod(index))" v-if="msg.is_collected"> 收藏</el-button>
                  <el-button type="text" class="rightside el-icon-star-off" @click="collectQn(indexMethod(index))" v-else> 收藏</el-button>
                  <el-button type="text" class="rightside el-icon-document" @click="copyQn(indexMethod(index))"> 复制</el-button>
                  <el-button type="text" v-if="msg.is_released" @click="recycle(indexMethod(index))" class="rightside el-icon-video-pause" style="color: red"> 暂停</el-button>
                  <el-button type="text" v-else @click="release(indexMethod(index))" class="rightside el-icon-video-play" style="color: #038235"> 发布</el-button>
                </div>
              </el-card>
              
              <el-pagination layout="sizes, prev, pager, next, jumper" 
                background
                :current-page="currentPage" 
                :page-size="pageSize"
                :page-sizes="pageSizes" 
                :total="QnList.length" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                style="margin: 20px">
                </el-pagination>
                </div>
            </div>
          <div v-else>
            <el-divider/>
            <el-empty :image-size="225" description="未查询到满足条件的问卷！">
              <el-button type="primary" @click="linkCreate">创建问卷</el-button>
            </el-empty>
          </div>
        </div>
      <el-dialog :visible.sync="shareOpen" :title="shareOpenTitle" style="text-align: left" :show-close="false" width="800px" >
        <el-row>
          <el-col span="8" style="text-align: center">
            <el-row>
              <div id="qrcode_1" style="height:200px; width:200px; margin-left: 22px;"></div>
<!--              <img src="../../assets/images/example.jpg" height="200px" width="200px">-->
            </el-row>
          </el-col>
          <el-col span="16">
            <el-row><h2>链接与二维码</h2></el-row>
            <el-row style="margin-top:15px">
              <el-col :span="16" style="margin-right: 5px">
                <el-input :placeholder=linkShare v-model="linkShare" id="copyText" :disabled="true">
                </el-input>
              </el-col>
              <el-button type="info" plain id="copyBtn" @click="copyToClip">复制链接</el-button></el-row>
            <el-row style="margin-top: 25px">
              <el-button type="primary" plain @click="download">下载二维码</el-button>
              <el-button type="primary" @click="genCodeAgain" style="margin-left: 30px">重新生成链接</el-button>
            </el-row>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-row>
                    <el-button :span="6" type="success" style="width: 80px"  @click="finish">完 成</el-button>
                  </el-row>
      </span>
      </el-dialog>
    </div>
</template>

<script>
import user from "@/store/user";
import * as Axios from "core-js";
import { saveAs } from "file-saver";
import QRCode from 'qrcodejs2';

export default {
  created() {
    this.searchQns(0);
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      pageSizes:[4,5,7],

      image_url: '',
      qrcode: null,

      shareOpen: false,
      shareOpenTitle: '分享',
      share_surveyId: 0,

      linkShare: '',

      activeIdx: "1",

      qnType: '问卷状态',
      orderQn: '排序依据',
      qnValue: '问卷类型',

      qnKey: '',
      orderItem: 'default',
      orderType: 'default',
      hasQn: true,
      input: '',
      is_released: "default",
      is_collected: 0,
      qn_type: 0,
      QnList: [
        // {
        //     title:'易灿和他的问卷',
        //     survey_id:19373000,
        //     recycling_num: 8,
        //     create_time:'2021/6/10 5:10',
        //     is_released: false,
        //     is_deleted: false,
        //     is_collected: false,
        // },
        // {
        //     title:'nn和他的问卷',
        //     survey_id:19373000,
        //     recycling_num: 1118,
        //     create_time:'2021/6/10 23:10',
        //     is_released: true,
        //     is_collected: true,
        // },
      ],
    }
  },
  methods:{
    indexMethod(index) {
        return (this.currentPage-1)*this.pageSize+index;
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
    getTypeFormPid(pid) {
      for (var i=0; i<this.QnList.length; i++) {
        if (this.QnList[i].survey_id === pid) {
          return this.QnList[i].type;
        }
      }
    },
    genCodeAgain() {
      const formData = new FormData();
      formData.append("qn_id", this.share_surveyId);
      this.$axios({
        method: 'post',
        url: '/qn/change/code',
        data: formData,
      })
      .then(res => {
        if (res.data.status_code === 1) {
          switch (this.getTypeFormPid(this.share_surveyId)) {
            case "1":
              this.linkShare = this.GLOBAL.baseUrl + "/fill?mode=1&code=" + res.data.code;
              break;
            case "2":
              this.linkShare = this.GLOBAL.baseUrl + "/fill_test?mode=1&code=" + res.data.code;
              break;
            case "3":
              this.linkShare = this.GLOBAL.baseUrl + "/fill_vote?mode=1&code=" + res.data.code;
              break;
            case "4":
              this.linkShare = this.GLOBAL.baseUrl + "/fill_form?mode=1&code=" + res.data.code;
              break;
            case "5":
              this.linkShare = this.GLOBAL.baseUrl + "/fill_hate?mode=1&code=" + res.data.code;
              break;
          }

          if (this.qrcode == null) {
            this.qrcode = new QRCode(document.getElementById("qrcode_1"), {
              width: 200, //生成的二维码的宽度
              height: 200, //生成的二维码的高度
              colorDark : "#000000", // 生成的二维码的深色部分
              colorLight : "#ffffff", //生成二维码的浅色部分
              correctLevel : QRCode.CorrectLevel.H
            });
          }
          this.qrcode.clear();
          this.qrcode.makeCode(this.linkShare);
        } else {
          this.$message.error("请求失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    beforeHandleCommand(index, format) {
      return {
        'index': index,
        'format': format
      }
    },
    download() {
      // 获取base64的图片节点
      var img = document.getElementById('qrcode_1').getElementsByTagName('img')[0];
      // 构建画布
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      // 构造url
      var url = canvas.toDataURL('image/png');
      // 构造a标签并模拟点击
      var downloadLink = document.createElement('a');
      downloadLink.download = '二维码.png';
      downloadLink.href = url;
      downloadLink.click();
      downloadLink.remove();
    },
    finish() {
      this.shareOpen = false;
    },
    copyToClip(message) {
      var aux = document.createElement("input");
      aux.setAttribute("value", this.linkShare);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("复制成功");
      } else{
        this.$message.error("复制失败");
      }
    },

    recycle:function (index){
      this.$confirm('暂停问卷后，问卷将无法正常填写吗，是否确定？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
        const formData = new FormData();
        formData.append("qn_id", this.QnList[index].survey_id);
        this.$axios({
          url: '/sm/pause_qn',
          method: 'post',
          data: formData,
        })
            .then(res => {
              if (res.data.status_code === 1) {
                this.$message.success("暂停发布成功");
                this.QnList[index].is_released=false;
              } else {
                this.$message.error("执行操作失败");
              }
            })
            .catch(err => {
              console.log(err);
            })
      });
    },
    release:function(index){
      const formData = new FormData();
      formData.append("qn_id", this.QnList[index].survey_id);
      this.$axios({
        url: '/sm/deploy_qn',
        method: 'post',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 7:
            this.$message.error("问卷题目为空，不可发布");
            break;
          case 1:
            this.$message.success("问卷发布成功！");
            this.QnList[index].is_released=true;
            break;
          case 10:
            this.$message.success("问卷发布成功！");
            this.QnList[index].is_released=true;
            break;
          default:
            this.$message.error("问卷发布失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    refresh(index) {
      if (this.QnList[index].recycling_num === 0) {
        this.$alert('该问卷未发布或无回收答卷，无法清空数据', '问题提示', {
          confirmButtonText: '确定',
        });
        return;
      }

      this.$confirm('清空数据将不可再恢复，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = new FormData();
        formData.append("qn_id", this.QnList[index].survey_id);
        this.$axios({
          method: 'post',
          url: '/sm/delete/all_submit',
          data: formData,
        })
        .then(res => {
          switch (res.data.status_code) {
            case 0:
              this.$message.warning("您无权执行此操作！");
              break;
            case 1:
              this.QnList[index].recycling_num = 0;
              this.$message({
                type: 'success',
                message: '清空数据成功'
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

    statUrl(index) {
      if (this.QnList[index].recycling_num > 0) {
        location.href = this.GLOBAL.baseUrl + "/recyconcept?pid=" + this.QnList[index].survey_id;
      } else {
        this.$alert('问卷暂无回收答卷，无统计信息', '问题提示', {
          confirmButtonText: '确定',
        });
      }
    },

    openShare(index) {
      if (this.QnList[index].is_released === true) {
        this.shareOpen = true;
        this.share_surveyId = this.QnList[index].survey_id;
        const formData = new FormData();
        formData.append("survey_id", this.share_surveyId);
        this.$axios({
          url: '/qn/get_code_existed',
          method: 'post',
          data: formData
        })
        .then(res => {
          switch (res.data.status_code) {
            case 0:
              this.$message.warning("您无权执行此操作！");
              break;
            case 1:
              switch (this.QnList[index].type) {
                case "1":
                  this.linkShare = this.GLOBAL.baseUrl + "/fill?mode=1&code=" + res.data.code;
                  break;
                case "2":
                  this.linkShare = this.GLOBAL.baseUrl + "/fill_test?mode=1&code=" + res.data.code;
                  break;
                case "3":
                  this.linkShare = this.GLOBAL.baseUrl + "/fill_vote?mode=1&code=" + res.data.code;
                  break;
                case "4":
                  this.linkShare = this.GLOBAL.baseUrl + "/fill_form?mode=1&code=" + res.data.code;
                  break;
                case "5":
                  this.linkShare = this.GLOBAL.baseUrl + "/fill_hate?mode=1&code=" + res.data.code;
                  break;
              }

              if (this.qrcode == null) {
                this.qrcode = new QRCode(document.getElementById("qrcode_1"), {
                  width: 200, //生成的二维码的宽度
                  height: 200, //生成的二维码的高度
                  colorDark : "#000000", // 生成的二维码的深色部分
                  colorLight : "#ffffff", //生成二维码的浅色部分
                  correctLevel : QRCode.CorrectLevel.H
                });
              }
              this.qrcode.clear();
              this.qrcode.makeCode(this.linkShare);

              break;
            default:
              this.$message.error("操作失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.$alert('问卷未发布，请先发布', '问题提示', {
          confirmButtonText: '确定',
        });
      }
    },

    deleteQn(index) {
      this.$confirm('此操作将问卷移入回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = new FormData();
        formData.append("qn_id", this.QnList[index].survey_id);
        this.$axios({
          method: 'post',
          url: '/sm/delete/qn/not_real',
          data: formData
        })
        .then(res => {
          switch (res.data.status_code) {
            case 1:
              this.QnList.splice(index, 1);
              if (this.QnList.length === 0)
                this.hasQn = false;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              break;
            default:
              this.$message.error("操作失败！");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    uncollectQn(index) {
      const formData = new FormData();
      formData.append("survey_id", this.QnList[index].survey_id);
      this.$axios({
        method: 'post',
        url: '/qn/not_collect',
        data: formData
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.QnList[index].is_collected = false;
            if (this.activeIdx === "2") {
              this.QnList.splice(index, 1);
            }
            if (this.QnList.length === 0) {
              this.hasQn = false;
            }
            break;
          case 401:
            this.$message.error("您无权执行此操作！");
            break;
          case 403:
            this.$message.error("您无权执行此操作！");
            break;
          default:
            this.$message.warning("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    collectQn(index) {
      const formData = new FormData();
      formData.append("survey_id", this.QnList[index].survey_id);
      this.$axios({
        method: 'post',
        url: '/qn/collect',
        data: formData
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.QnList[index].is_collected = true;
            break;
          case 401:
            this.$message.error("您无权执行此操作！");
            break;
          case 403:
            this.$message.error("您无权执行此操作！");
            break;
          default:
            this.$message.warning("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    copyQn(index) {
      const formData = new FormData();
      formData.append("qn_id", this.QnList[index].survey_id);
      this.$axios({
        method: 'post',
        url: '/sm/duplicate/qn',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            var newForm = new FormData();
            newForm.append("survey_id", res.data.qn_id);
            newForm.append("username", user.getters.getUser(user.state()).user.username);
            this.$axios({
              method: 'post',
              url: '/qn/get_list',
              data: newForm,
            })
            .then(res => {
              if (res.data.status_code === 402) {
                this.$message.error("操作失败！");
              } else {
                this.$message.success("复制成功！");
                this.QnList.unshift(res.data);
              }
            })
            .catch(err => {
              console.log(err);
            })

            break;
          default:
            this.$message.error("操作失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    linkEditUrl(index) {
      switch (this.QnList[index].type) {
        case "1":
          location.href = 'edit?pid=' + this.QnList[index].survey_id;
          break;
        case "2":
          location.href = 'edit_test?pid=' + this.QnList[index].survey_id;
          break;
        case "3":
          location.href = 'edit_vote?pid=' + this.QnList[index].survey_id;
          break;
        case "4":
          location.href = 'edit_form?pid=' + this.QnList[index].survey_id;
          break;
        case "5":
          location.href = 'edit_hate?pid=' + this.QnList[index].survey_id;
          break;
      }
    },

    editUrl(index) {
      if (this.QnList[index].is_released) {
        this.$confirm('检测到问卷已发布，编辑可能影响已回收答卷数据，请确认是否编辑？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.linkEditUrl(index);
        }).catch(() => {
        });
      } else {
        this.linkEditUrl(index);
      }
    },

    previewUrl(index) {
      switch (index.type) {
        case "1":
          return 'preview?pid=' + index.survey_id + '&mode=0';
        case "2":
          return 'preview_test?pid=' + index.survey_id + '&mode=0';
        case "3":
          return 'preview_vote?pid=' + index.survey_id + '&mode=0';
        case "4":
          return 'preview_form?pid=' + index.survey_id + '&mode=0';
        case "5":
          return 'preview_hate?pid=' + index.survey_id + '&mode=0';
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initParams() {
      this.qnType = '问卷状态';
      this.qnValue = '问卷类型';
      this.orderQn = '排序依据';
      this.qnKey = '';
      this.orderType = 'default';
      this.orderItem = 'default';
      this.hasQn = true;
      this.is_released = 'default';
      this.is_collected = 0;
      this.input = '';
    },
    handleSelect(key) {
      this.activeIdx = key;

      this.initParams();

      switch (this.activeIdx) {
        case "1":
          this.is_collected = 0;
          this.searchQns(0);
          break;
        case "2":
          this.is_collected = 1;
          this.searchQns(0);
          break;
        case "3":
          this.$router.push('/bin');
          break;
      }
    },
    downloadPDF(url, fileName = '') {
      return this.downloadFile(url, fileName, { responseType: 'arraybuffer' })
    },

    selectExportType(command) {
      let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      var surveyId = this.QnList[command.index].survey_id;
      const formData = new FormData();
      formData.append("qn_id", surveyId);
      switch (command.format) {
        case "word":
          this.$axios({
            method: 'post',
            url: '/sm/export/docx',
            data: formData,
          })
          .then(res => {
            loadingIns.close();
            if (res.data.status_code === 1) {
              var item = {
                FILETYPE: 'docx',
                CNAME: res.data.filename,
                ANNEXCONTENT: res.data.b64data
              };
              this.shows(item);
            } else {
              this.$message.error("文件下载失败！");
            }
          })
          .catch(err => {
            console.log(err);
          })
          break;
        case "pdf":
          this.$axios({
            method: 'post',
            url: '/sm/export/pdf',
            data: formData,
          })
          .then(res => {
            loadingIns.close();
            if (res.data.status_code === 1) {
              // this.downloadPDF(res.data.pdf_url, res.data.filename);
              this.fileSaverPDF(res.data.pdf_url, res.data.filename);
            } else {
              this.$message.error("文件下载失败！");
            }
          })
          .catch(err => {
            console.log(err);
          })
          break;
      }
    },
    fileSaverPDF(url, name) {
      var oReq = new XMLHttpRequest();
      // The Endpoint of your server
      var URLToPDF = url;
      // Configure XMLHttpRequest
      oReq.open("GET", URLToPDF, true);
      // Important to use the blob response type
      oReq.responseType = "blob";
      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = function() {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        var file = new Blob([oReq.response], {
          type: 'application/pdf'
        });

        // Generate file download directly in the browser !
        saveAs(file, name);
      };
      oReq.send();

    },
    downloadURL(url, name) {
      const link = document.createElement('a')
      link.download = name
      link.href = url
      if ('download' in document.createElement('a')) {
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // 对不支持download进行兼容
        this.click(link, (link.target = '_blank'))
      }
    },
    click(node) {
      try {
        node.dispatchEvent(new MouseEvent('click'))
      } catch (e) {
        var evt = document.createEvent('MouseEvents')
        evt.initMouseEvent(
            'click',
            true,
            true,
            window,
            0,
            0,
            0,
            80,
            20,
            false,
            false,
            false,
            false,
            0,
            null
        )
        node.dispatchEvent(evt)
      }
    },
    // 创建blob对象
    downloadBlob(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'

        xhr.onload = function() {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(new Error(xhr.statusText || 'Download failed.'))
          }
        }
        xhr.onerror = function() {
          reject(new Error('Download failed.'))
        }
        xhr.send()
      })
    },
    // 主要用于下载导出的代码

    downloadFile(url, fileName = '', requestConfig = {}) {
      return Axios.get(url, requestConfig)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error('Download fail.')
        } else if (resp.blob) {
          return resp.blob()
        } else {
          return new Blob([resp])
        }
      })
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        this.downloadURL(url, fileName)
        URL.revokeObjectURL(url)
      })
    },

    shows(item) {
      if (item.FILETYPE.substring(item.FILETYPE.lastIndexOf('.')+1,item.FILETYPE.length)=='docx') {
        const dataURLtoBlob = function (dataurl) {
          let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        }

        const  downloadFile = function downloadFile(url,name=item.CNAME){
          let a = document.createElement("a")
          a.setAttribute("href",url)
          a.setAttribute("download",name)
          a.setAttribute("target","_blank")
          let clickEvent = document.createEvent("MouseEvents");
          clickEvent.initEvent("click", true, true);
          a.dispatchEvent(clickEvent);
        }

        const downloadFileByBase64 = function (base64,name){
          let myBlob = dataURLtoBlob(base64)
          let myUrl = URL.createObjectURL(myBlob)
          downloadFile(myUrl,name)
        }
        downloadFileByBase64('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,'+ item.ANNEXCONTENT)
      }else{
        this.imgsrc='data:image/jpeg;base64,'+ item.ANNEXCONTENT
        this.modal3_show=true
      }
    },


    linkCreate() {
      this.$router.push('/create_ques');
    },

    searchQn() {
      this.qnKey = this.input;
      this.searchQns(1);
    },
    selectType(command) {
      this.qnType = command;
      switch (command) {
        case "所有":
          this.is_released = "default";
          break;
        case "已发布":
          this.is_released = "1";
          break;
        case "未发布":
          this.is_released = "0";
          break;
      }
      this.searchQns(1);
    },
    selectQnType(command) {
      this.qn_type = command;
      switch (command) {
        case "0":
          this.qnValue = "所有";
          break;
        case "1":
          this.qnValue = "调查问卷";
          break;
        case "2":
          this.qnValue = "考试问卷";
          break;
        case "3":
          this.qnValue = "投票问卷";
          break;
        case "4":
          this.qnValue = "报名问卷";
          break;
        case "5":
          this.qnValue = "打卡问卷";
          break;
      }
      this.searchQns(1);
    },
    orderIndex(command) {
      switch (command) {
        case "1":
          this.orderQn = "按创建时间正序";
          this.orderItem = "created_time";
          this.orderType = "asc";
          break;
        case "2":
          this.orderQn = "按创建时间倒序";
          this.orderItem = "created_time";
          this.orderType = "desc";
          break;
        case "3":
          this.orderQn = "按发布时间正序";
          this.orderItem = "release_time";
          this.orderType = "asc";
          break;
        case "4":
          this.orderQn = "按发布时间倒序";
          this.orderItem = "release_time";
          this.orderType = "desc";
          break;
        case "5":
          this.orderQn = "按答题人数正序";
          this.orderItem = "recycling_num";
          this.orderType = "asc";
          break;
        case "6":
          this.orderQn = "按答题人数倒序";
          this.orderItem = "recycling_num";
          this.orderType = "desc";
          break;
      }
      this.searchQns(0);
    },

    searchQns(tag) {
      let formData = new FormData();
      const userInfo = user.getters.getUser(user.state());
      formData.append("username", userInfo.user.username);

      if (this.is_released === "1")
      {
        formData.append("is_released", 1);
      }
      else if (this.is_released === "0")
      {
        formData.append("is_released", 0);
      }

      if (this.orderItem !== "default" && this.orderType !== "default") {
        formData.append("order_item", this.orderItem);
        formData.append("order_type", this.orderType);
      }
      if (this.qnKey !== "")
        formData.append("title_key", this.qnKey);
      if (this.is_collected === 1)
        formData.append("is_collected", this.is_collected);
      formData.append("type", this.qn_type);
      let loadingInstance = this.$loading({
        target: '#main-body',
      });
      this.$axios({
        method: 'post',
        url: '/qn/get_list',
        data: formData,
      })
      .then(res => {
        loadingInstance.close();
        switch (res.data.status_code) {
          case 401:
            this.$message.warning("请先登录！");
            this.$router.push('/login');
            break;
          case 403:
            this.$message.warning("您无权访问！");
            this.$router.push('/index');
            break;
          case 404:
            this.hasQn = false;
            break;
          default:
            this.QnList = JSON.parse(res.data.data);
            this.hasQn = true;
            if (tag === 1) {
              this.$message.success("为您查询到 " + this.QnList.length + " 条问卷");
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  computed:{ 
    userdata:function(){
       return this.QnList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize); 
       }
  }
}
</script>

<style scoped>
    #sum{
        /*height: 1000px;*/
        width: 100%;
        min-width: 1200px;
        /* background-color: rgb(241, 241, 241); */
    }
    #aside{
        width: 340px;
        /* background-color: antiquewhite; */
        min-width: 325px;
    }
    #mainpage{
        width: 70%;
        /* background-color: aquamarine; */
        min-width: 850px;
    }
    #newButton{
        width: 60%;
        height: 50px;
        font-size: 15px;
        margin-top: 25px;
    }
    #list{
        width: 100%;
        margin-top: 25px;
    }
    #list .el-menu{
        width: 240px;
        margin: 0 54px;
    }
    #list .el-menu-item{
        height: 50px;
        font-size: 14px;
        text-align: center;
    }

    #title{

        height: 35px;
        font-size: 22px;
        text-align: left;
        margin: 15px;
        font-weight: bold;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-icon-arrow-down {
        font-size: 6px;
    }
    #title .el-input{
        width: 200px;
    }
    .right{
        float: right;
        margin: 0 15px; 
        /* margin-top: 10px; */
        padding: 13px 0;
    }

    .box-card {
    margin: 25px 50px;
    width: 89%;
    height: auto;
    font-size: 12px;
    }
    .el-col-20{
        text-align: left;
        font-size: 16px;
        padding: 5px 15px;
        width: 520px;
        /* font-weight: bold; */
    }
    .headspan{
        padding: 7px 7px;
    }
    .leftside{
        float: left;
        padding: 10px ;
    }
    .rightside{
        float: right;
        padding: 10px;
        color: black;
      font-size: 14px;
    }
    #download{
        padding: 3px 10px 12px 10px;
    }

    #newButton {
      width: 240px;
      height: 56px;
    }

    .el-icon-my-star {
        background: url("/src/assets/icon/star.png") center no-repeat;
        background-size: cover;
      font-family: element-icons;
    }
    .el-icon-my-star:before {
      font-size: 13px;
      content: "66ff";
      visibility: hidden;
      font-family: element-icons,serif!important;
    }
</style>