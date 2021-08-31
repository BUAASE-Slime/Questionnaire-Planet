<template>
    <div>
        <div id="myChart1" class="chart-view"></div>
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
      chart1_name:[],
      chart1_data:[],
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    this.getData();

  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart1();
    }, 1000);
  },
  watch: {
    data: {
      handler (newV, oldV) {
        console.log(oldV, newV);
        this.chart1_name = [];
        this.chart1_data = [];
        this.data = newV;
        this.getData();
        this.showChart1();
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
  methods: {
    getData() {
      var title;
      var choosed;
      for (var i=0; i<this.data.length; i++) {
        title = this.data[i].title;
        choosed = this.data[i].choosed;
        if (this.type === 'mark') {
          this.chart1_name.push((i+1).toString());
        } else if (this.data.length > 5 ||(title.length > 5 && this.data.length >= 4)) {
          this.chart1_name.push("选项" + (i+1).toString());
        } else {
          this.chart1_name.push(title);
        }
        this.chart1_data.push(choosed);
      }
    },
    showChart1()
    {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: this.chart1_title },
            tooltip: {},
            toolbox: {
                feature: {
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                data:this.chart1_name,
                name: '选项'
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