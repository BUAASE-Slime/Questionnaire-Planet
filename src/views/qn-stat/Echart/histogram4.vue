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
        dimensions_data:['choice', 'a', 'b', 'c','d'],
        source_data:[
            {choice: 'd', 'a': 0, 'b': 2, 'c': 1 , 'd': 0},
            {choice: 'b', 'a': 1, 'b': 0, 'c': 2, 'd': 0},
            {choice: 'c', 'a': 1, 'b': 0, 'c': 1, 'd': 3},
        ],
        series_data:[
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
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
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: this.dimensions_data,
                source: this.source_data,
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: this.series_data
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