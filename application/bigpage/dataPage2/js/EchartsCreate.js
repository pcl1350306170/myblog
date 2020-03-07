var EchartsCreate = {

  init () {
    const _this = this

    //左 - 事件近30天区域分布
    _this.echarts_RegionalDistributionEvents30Day();
    //左 - 事件近30天分类统计
    _this.echarts_ClassifiedStatisticsEvent30Days();
    //左 - 事件近7天新增数
    _this.echarts_NewNumberIn7Days()

    // 右-综治事件近30天区域分布
    _this.echarts_RegionalDistributionlast30Days()
    // 右-综治事件近30天分类统计
    _this.echarts_ClassifiedStatisticsTreatmentIncidents30Days()
    // 右-综治事件近7天新增数
    _this.echarts_ComprehensiveTreatmentIncident7DaysNumber()

    _this.run_TownshipStreet()
  },
  // 创建图表 - 事件近30天区域分布
  echarts_RegionalDistributionEvents30Day() {
    const _this = this

    let classifyCharts = echarts.init(document.getElementById('id_RegionalDistributionEvents30Day'))
    let classifyOption = {
      backgroundColor: '',
      color: ['#0573fb'],
      grid: {
        left: '10px',
        top: '20px',
        right: '30px',
        bottom: 0,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['乡镇1', '乡镇2', '乡镇3', '乡镇4', '乡镇5', '街道1', '街道2', '街道3', '街道4', '街道5', '街道6'],
          axisTick: {
            alignWithLabel: false,
            show: false,
            inside: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            margin: 12
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(255,255,255,0.3)']
            }
          }
        }
      ],
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: [73, 78, 55, 32, 54, 45, 85, 15, 42, 62, 35],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#f9e61c' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#0bd7a1' // 100% 处的颜色
              }], false),
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#f3f410'
                }
              }
            }
          }
        }
      ]
    }
    classifyCharts.setOption(classifyOption)
  },
  // 创建图表 - 左 - 事件近30天分类统计
  echarts_ClassifiedStatisticsEvent30Days() {
    let subsidyCharts = echarts.init(document.getElementById('id_ClassifiedStatisticsEvent30Days'))
    let subsidyOption = {
      grid: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['综治', '城管', '计生', '安检', '环保', '环卫', '信访', '文化', '民政', '民生', '其他'],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['rgba(255,255,255,0.3)']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: false
        }
      },
      series: [{
        data: [50, 32, 91, 34,23,43,23,43,23,43,23,12],
        type: 'line',
        symbol: '',
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: '#4378ed',
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(86,157,211,0.3)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(86,157,211,0.7)' // 100% 处的颜色
            }]
          }
        },
        smooth: true
      }]
    }
    subsidyCharts.setOption(subsidyOption)
  },
  // 创建图表 - 事件近7天新增数
  echarts_NewNumberIn7Days() {
    const _this = this

    let opChart = echarts.init(document.getElementById('id_NewNumberIn7Days'))
    let chartOption = {
      legend: {
        data: ['新增数', '处理数'],
        textStyle: {
          color: '#ffffff'
        },
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 20
      },
      grid: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 0,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [1, 2, 3, 4, 5, 6, 7],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['rgba(255,255,255,0.3)']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      series: [{
        name: '新增数',
        data: [20, 92, 1, 94, 21, 32, 45],
        type: 'line',
        symbol: 'circle',
        symbolSize: 3,
        itemStyle: {
          normal: {
            color: '#cd99fd',
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(205,153,253,0.1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(205,153,253,0.3)' // 100% 处的颜色
            }]
          }
        },
        smooth: true
      },
        {
          name: '处理数',
          data: [23, 22, 11, 44, 51, 32, 21],
          type: 'line',
          symbol: 'circle',
          symbolSize: 3,
          itemStyle: {
            normal: {
              color: '#34abff',
              label: {
                show: false,
                position: 'top',
                textStyle: {
                  color: '#fff'
                }
              }
            }
          },
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(34,145,227,0.3)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(34,145,227,0.3)' // 100% 处的颜色
              }]
            }
          },
          smooth: true
        }]
    }
    opChart.setOption(chartOption)
  },
  // 创建图表 - 综治事件近30天区域分布
  echarts_RegionalDistributionlast30Days() {
    const _this = this

    let classifyCharts = echarts.init(document.getElementById('id_RegionalDistributionlast30Days'))
    let classifyOption = {
      backgroundColor: '',
      grid: {
        left: '10px',
        top: '20px',
        right: '30px',
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0.4, 0.001],
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          margin: 12
        }
      },
      yAxis: {
        type: 'category',
        data: ['乡镇1', '乡镇2', '乡镇3', '乡镇4', '乡镇5', '乡镇6', '乡镇7'],
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          show: true
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['rgba(255,255,255,0.3)']
          }
        }
      },
      series: [
        {
          name: '事件区域统计',
          type: 'bar',
          data: [52, 38, 65, 34, 44, 21, 45],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#c802f5' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#32e7ee' // 100% 处的颜色
              }], false),
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#ffffff'
                }
              }
            }
          }
        }
      ]
    }
    classifyCharts.setOption(classifyOption)
  },
  // 创建图表 - 综治事件近30天分类统计
  echarts_ClassifiedStatisticsTreatmentIncidents30Days() {
    let subsidyCharts = echarts.init(document.getElementById('id_ClassifiedStatisticsTreatmentIncidents30Days'))
    let subsidyOption = {
      grid: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['信访事件', '规整矫正', '治安流管', '法律咨询', '人民调解'],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['rgba(255,255,255,0.3)']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: false
        }
      },
      series: [{
        data: [50, 32, 91, 34, 23, 43],
        type: 'line',
        symbol: '',
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: '#ba68d4',
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(249,115,231,0.1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(249,115,231,0.3)' // 100% 处的颜色
            }]
          }
        },
        smooth: true
      }]
    }
    subsidyCharts.setOption(subsidyOption)
  },
  // 创建图表 - 综治事件近7天新增数
  echarts_ComprehensiveTreatmentIncident7DaysNumber() {
    const _this = this

    let opChart = echarts.init(document.getElementById('id_ComprehensiveTreatmentIncident7DaysNumber'))
    let chartOption = {
      legend: {
        data: ['新增数', '处理数'],
        textStyle: {
          color: '#ffffff'
        },
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 20
      },
      grid: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 0,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [1, 2, 3, 4, 5, 6, 7],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['rgba(255,255,255,0.3)']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          alignWithLabel: false,
          show: false,
          inside: true
        }
      },
      series: [{
        name: '新增数',
        data: [20, 92, 1, 94, 21, 32, 45],
        type: 'line',
        symbol: 'circle',
        symbolSize: 3,
        itemStyle: {
          normal: {
            color: '#91e3f7',
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(205,153,253,0.1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(205,153,253,0.3)' // 100% 处的颜色
            }]
          }
        },
        smooth: true
      },
        {
          name: '处理数',
          data: [23, 22, 11, 44, 51, 32, 21],
          type: 'line',
          symbol: 'circle',
          symbolSize: 3,
          itemStyle: {
            normal: {
              color: '#34abff',
              label: {
                show: false,
                position: 'top',
                textStyle: {
                  color: '#fff'
                }
              }
            }
          },
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(34,145,227,0.3)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(34,145,227,0.3)' // 100% 处的颜色
              }]
            }
          },
          smooth: true
        }]
    }
    opChart.setOption(chartOption)
  },
  //乡镇、街道绩效考核排名
  run_TownshipStreet(){
    $('.ul-TownshipStreet').liMarquee({
      direction: 'up'
    })
  }
}
