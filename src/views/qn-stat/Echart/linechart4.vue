<template>
  <div class="page_view">
    <div id="myChart4" class="chart-view"></div>
  </div>
</template>

<script>

export default {
  name: 'echart',
  props: {
    legend_data: [],
    x_data: [],
    series_data: [],
  },
  data () {
    return {
      // legend_data:['a','b','c','d'],//列选项
      // x_data:['d','b','c'],//行选项
      // series_data:[
      //       {
      //           name: 'a',//列选项
      //           type: 'line',
      //           data: [0,33.33,20]//该列选项在每个行选项中所占的百分比
      //       },
      //       {
      //           name: 'b',
      //           type: 'line',
      //           data: [66.66,0,0]
      //       },
      //       {
      //           name: 'c',
      //           type: 'line',
      //           data: [33.33,66.66,20]
      //       },
      //       {
      //           name: 'd',
      //           type: 'line',
      //           data: [0,0,60]
      //       },
      //   ]
    }
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showChart4();
    }, 500);
  },
  methods: {
 
    showChart4()
    {
      var myChart4= this.$echarts.init(document.getElementById('myChart4'));
      let option4 = {
                tooltip: {
                    trigger: 'axis',
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: this.legend_data
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.x_data,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: this.series_data
        };
         myChart4.setOption(option4)
    }
  }
}
</script>

<style>

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

