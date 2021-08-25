<template>
    <div>
        <div id="myChart1" class="chart-view"></div>
    </div>
</template>

<script>
// var that;
export default {
  name: 'echart',
  props: {
    chart1_name:null,
    chart1_data:null,
  },
  data () {
    return {
      chart1_title: '',
      chart1_dataName:'填写人数',

    }
  },
  // created: function () {
  //   // `this` 指向 vm 实例
  //   // that = this
  //
  //   // this.chart1_name =  ["8.15","8.16","8.17","8.18","8.19","8.20","8.21"];
  //   // this.chart1_data =  [5, 20, 36, 10, 10, 20, 3];
  //
  //   console.log(this.chart1_data);
  //
  //   const formData = new FormData();
  //   formData.append("qn_id", this.$route.query.pid);
  //   this.$axios({
  //     method: 'post',
  //     url: '/sm/get/recycling_num',
  //     data: formData,
  //   })
  //   .then(res => {
  //     if (res.data.status_code === 1) {
  //       this.chart1_data = res.data.nums;
  //       this.chart1_name = res.data.dates;
  //
  //       console.log(this.chart1_data);
  //
  //     } else {
  //       this.$message.error("请求失败！");
  //       setTimeout(() => {
  //         this.$router.push('/index');
  //       }, 1000);
  //     }
  //   })
  // },
  mounted(){

    //页面加载完成后,才执行
    setTimeout(() => {
      this.showChart1();
    }, 500);
  },
  methods: {
    showChart1()
    {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: this.chart1_title },
            tooltip: {},
            xAxis: {
                data:this.chart1_name,
                name: '日期'
            },
            yAxis: {
                type: 'value',
                name: '填写人数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            series: [{
                name: this.chart1_dataName,
                type: 'bar',
                data:this.chart1_data,
            }]
        });
    },
  }
}
</script>

<style scoped>
.page_view
{
  padding:20px 3%;
  text-align: center;
}

.title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-view{
  margin: 20px auto;
  width: 400px;
  height: 400px;
}

</style>