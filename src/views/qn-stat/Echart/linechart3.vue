<template>
  <div class="page_view">
    <div id="myChart4" class="chart-view"></div>
  </div>
</template>

<script>

var that;

export default {
  name: 'echart',
  data () {
    return {
      chart1_name:null,
      chart1_data:null,
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    that = this
    that.chart4_name =  ["a","b","c","d"];
    that.chart4_data =  [5, 20, 36, 10];
  },
  mounted(){
    //页面加载完成后,才执行
    that.showChart4();
  },
  methods: {
 
    showChart4()
    {
      var myChart4= that.$echarts.init(document.getElementById('myChart4'));
      let option4 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                data:['填写人数']
            },
            xAxis: [
                {
                    type: 'category',
                    name:'选项',
                    data:that.chart4_name,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '填写人数',
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
            ],
            series: [
                {
                    name: that.chart4_dataName,
                    type:'line',
                    data:that.chart4_data,
                }
            ]
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

