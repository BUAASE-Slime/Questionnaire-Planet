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
    }
  },
  data () {
    return {
      chart2_data: [],
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
  created () {
    this.getData();
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart2();
    }, 500);
  },
  methods: {
    getData() {
      console.log(this.data);
      var title;
      var choosed;
      for (var i=0; i<this.data.length; i++) {
        title = this.data[i].title;
        choosed = this.data[i].choosed;
        if (this.type === 'mark') {
          title = (i+1).toString();
        } else if (this.data.length > 5 ||(title.length > 5 && this.data.length >= 4)) {
          title = "选项" + (i+1).toString();
        }
        this.chart2_data.push({
          value: choosed,
          name: title
        });
      }
    },
    showChart2()
    {

      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      var option2 = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
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

