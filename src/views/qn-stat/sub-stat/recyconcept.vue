<template>
    <div id='sum'>
        <div id=title>
            <h1>问卷回收量</h1>
        </div>
        <el-card class="box-card">
        <div id="chartswitch"  >
            <el-radio-group v-model="radio2" size="medium">
            <el-radio-button label="柱状图" @click.native="columngrams"></el-radio-button>
            <el-radio-button label="折线图" @click.native="linegrams"></el-radio-button>
            </el-radio-group>
        </div>
        <div>
            <div style="clear:both">
            <span>总回收量</span>
            <span>日回收量</span>
            <span>周回收量</span>
            </div>
            <br>
            <h2 style="display: inline;">{{sum_collect}}</h2>
            <h2 style="display: inline;">{{day_collect}}</h2>
            <h2 style="display: inline;">{{week_collect}}</h2>
        </div>
        <div v-if="swigram">
            <histogram1 :chart1_name="chart1_name" :chart1_data="chart1_data"></histogram1>
        </div>
        <div v-else>
            <linechart :chart4_name="chart1_name" :chart4_data="chart1_data"></linechart>
        </div>
        </el-card>
    </div>
</template>

<script>
import histogram1 from '../Echart/histogram1.vue'
import linechart from '../Echart/linchart1.vue'
export default {
  components:{
    histogram1,
    linechart
  },
  data() {
    return{
      swigram: true,
      sum_collect: null,
      day_collect: null,
      week_collect: null,
      radio2: '柱状图',

      surveyId: '',
      chart1_data: null,
      chart1_name: null,
    }
  },
  methods:{
    columngrams: function(){
      this.swigram=true
      console.log(this.swigram)
    },
    linegrams: function(){
      this.swigram=false
      console.log(this.swigram)
    },
  },
  created() {
    let loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
    const formData = new FormData();
    formData.append("qn_id", parseInt(this.$route.query.pid));
    this.$axios({
      method: 'post',
      url: '/sm/get/recycling_num',
      data: formData,
    })
    .then(res => {
      loadingIns.close();
      switch (res.data.status_code) {
        case 1:
          this.sum_collect = res.data.num_all;
          this.day_collect = res.data.num_day;
          this.week_collect = res.data.num_week;
          this.chart1_data = res.data.nums;
          this.chart1_name = res.data.dates;
          break;
        default:
          this.$message.error("访问失败！");
          setTimeout(() => {
            this.$router.push('/index');
          }, 1000);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
};

</script>

<style scoped>
    #sum{
        width: 90%;
        /* background-color: cyan; */
    }
    h1{
        margin: 20px 50px;

    }
    #chartswitch{
        width: 100%;
    }
    .el-radio-group{
        /* position: absolute;
        right: 80px; */
        width: 300px;
        float: right;
    }
    #myChart1{
        vertical-align: middle;
    }
    span{
        font-size: 16px;
        padding: 0 50px;
    }
    h2{
        padding: 30px 70px;
    }
    .box-card{
        margin: 20px;
    }


</style>