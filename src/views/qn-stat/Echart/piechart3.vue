<template>
  <div class="page_view">

    <div id="myChart2" class="chart-view"></div>

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

    that.chart2_data=[{value:3, name:'a'},
                      {value:3, name:'b'},
                      {value:2, name:'c'},
                      {value:1, name:'d'}];
  },
  mounted(){
    //页面加载完成后,才执行
    that.showChart2();
  },
  methods: {
    showChart2()
    {
      console.log("showChart2")

      // 基于准备好的dom，初始化echarts实例
      let myChart2 = that.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      var option2 = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: {
                name: '选择人数',
                type: 'pie',
                radius : '55%',
                // center: ['50%', '50%'],
                data: this.chart2_data,
            }
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

