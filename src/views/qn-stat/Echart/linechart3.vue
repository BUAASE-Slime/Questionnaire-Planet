<template>
  <div class="page_view">
    <div id="myChart4" class="chart-view"></div>
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
  watch: {
    data: {
      handler (newV, oldV) {
        console.log(oldV, newV);
        this.chart4_name = [];
        this.chart4_data = [];
        this.data = newV;
        this.getData();
        this.showChart4();
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
  data () {
    return {
      chart4_name: [],
      chart4_data: [],
    }
  },
  created () {
    // `this` 指向 vm 实例
    this.getData();
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
    this.showChart4();
    }, 500);
  },
  methods: {
    getData() {
      var title;
      var choosed;
      for (var i=0; i<this.data.length; i++) {
        title = this.data[i].title;
        choosed = this.data[i].choosed;
        if (this.type === 'mark') {
          this.chart4_name.push((i+1).toString());
        } else if (this.data.length > 5 ||(title.length > 5 && this.data.length >= 4)) {
          this.chart4_name.push("选项" + (i+1).toString());
        } else {
          this.chart4_name.push(title);
        }
        this.chart4_data.push(choosed);
      }
    },
 
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
                    name:'选项',
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

