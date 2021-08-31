<template>
  <div class="page_view">

    <div id="myChart2" class="chart-view"></div>

  </div>
</template>

<script>
export default {
  name: 'echart',
  props: {
    data: [],
    type: {
      type: String
    },
    legend_data: [],
    indecatior_data: [],
    series_data: [],
  },
  data () {
    return {
      // legend_data:['a','b','c','d'],//列选项
      // indecatior_data:[
      //     { name: 'd',max: 100, axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'},formatter: '{value} %'}},
      //     { name: 'b',max: 100},
      //     { name: 'c',max: 100},
      //     //{ name: 行选项, max: 100},第一个行选项要加：axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'},formatter: '{value} %'}
      // ],
      // series_data:[
      //     {
      //         value: [0,33.33,20],//该列选项在每个行选项中所占的百分比
      //         name: 'a'//列选项
      //     },
      //     {
      //         value: [66.66,0,0],
      //         name: 'b'
      //     },
      //     {
      //         value: [33.33,66.66,20],
      //         name: 'c'
      //     },
      //     {
      //         value: [0,0,60],
      //         name: 'd'
      //     },
      // ]
    }
  },
  watch: {
    data: {
      handler (newV, oldV) {
        console.log(oldV, newV);
        this.chart2_data = [];
        this.data = newV;
        this.getData();
        this.showChart2();
      },
      deep: true,
    },
    type: {
      handler(newV, oldV) {
        console.log(oldV, newV);
        this.type = newV;
      }
    }
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart2();
    }, 500);
  },
  methods: {
    showChart2()
    {

      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      var option2 = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
        legend: {
            data: this.legend_data,
        },
        radar: {
            // shape: 'circle',
            indicator: this.indecatior_data
        },
        series: [{
            type: 'radar',
            data: this.series_data,
            emphasis: {       
                label: {
                  show: true,
                  color: '#fff',
                  fontSize: 12,
                  formatter: '{c}%',       // 鼠标悬浮时展示数据加上单位
                  backgroundColor: '#0D1B42',
                  borderRadius: 5,
                  padding: 3,
                  shadowBlur: 3
                }
              }
        }]
      };

      myChart2.setOption(option2)
    },
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

#myChart2{
    margin-top: 0;
    padding-top: 0;
}
</style>

