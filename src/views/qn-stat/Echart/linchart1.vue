<template>
  <div class="page_view">
    <div id="myChart4" class="chart-view"></div>
  </div>
</template>

<script>

export default {
  name: 'echart',
  props: {
    chart4_name:null,
    chart4_data:null,
  },
  data () {
    return {
      chart4_title: '周视图',
      chart4_dataName:'填写人数',
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
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['填写人数']
            },
            xAxis: [
                {
                    type: 'category',
                    name:'日期',
                    data:this.chart4_name,
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
                    name: this.chart4_dataName,
                    type:'line',
                    data:this.chart4_data,
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

