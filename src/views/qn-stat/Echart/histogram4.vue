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
    dimensions_data:[],
    source_data:[],
    series_data: []
  },
  data () {
    return {
        // dimensions_data:['choice', 'a', 'b', 'c','d'],//['choice', 列选项]
        // source_data:[
        //     {choice: 'd', 'a': 0, 'b': 66.66, 'c': 33.33 , 'd': 0},
        //     {choice: 'b', 'a': 33.33, 'b': 0, 'c': 66.66, 'd': 0},
        //     {choice: 'c', 'a': 20, 'b': 0, 'c': 20, 'd': 60},
        //     // {choice: 行选项, 每个列选项在该行选项中所占百分比},
        // ],
        // series_data:[
        //     {type: 'bar'},
        //     {type: 'bar'},
        //     {type: 'bar'},
        //     {type: 'bar'}
        //     //有几个列选项就有几个这玩意：{type: 'bar'}
        // ]
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
            tooltip: {
              // formatter:'{a} {b}: {d} %'
            },
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
            dataset: {
                dimensions: this.dimensions_data,
                source: this.source_data,
            },
            xAxis: {type: 'category'},
            yAxis: {
              axisLabel: {
                  formatter: '{value} %'
              }
            },
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