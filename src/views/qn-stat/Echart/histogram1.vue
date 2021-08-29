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
    chart1_name:[],
    chart1_data:[],
  },
  data () {
    return {
      chart1_title: '',
      chart1_dataName:'填写人数',
    }
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showChart1();
    }, 1000);
  },
  methods: {
    showChart1()
    {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: this.chart1_title },
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
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