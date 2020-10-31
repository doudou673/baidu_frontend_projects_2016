window.onload=function(){
  //以下两个函数用于随机生成测试数据
  function getDateStr(dat){
    var y = dat.getFullYear();
    var m = dat.getMonth()+1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
  }

  function randomBuildData(seed){
    var returnData = {};
    var dat = new Date("2020-01-01");
    var datStr = '';
    for(var i = 1; i < 92; i ++){
      datStr = getDateStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);
      dat.setDate(dat.getDate()+1);
    }
    return returnData;
  }

  var aqiSourceData = {
    "北京":randomBuildData(500),
    "上海":randomBuildData(300),
    "广州":randomBuildData(200),
    "深圳":randomBuildData(100),
    "成都":randomBuildData(300),
    "西安":randomBuildData(500),
    "福州":randomBuildData(100),
    "厦门":randomBuildData(100),
    "沈阳":randomBuildData(500),
  }

  var chartData = {

  };

  var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day",
  }

  var formGraTime = document.getElementById("form-gra-time");
  var citySelect = document.getElementById('city-select');
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];

  function renderChart(){
    var color = '',text = '';
    for(var item in chartData){
      color = 'rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+',0.8)';
      text += '<div title ="'+item+':'+chartData[item]+'" style="height:'+chartData[item]+'px;background-color:'+color+';"> </div>'
    }
    aqiChartWrap.innerHTML = text;
  }

  function graTimeChange(){
    if(pageState.nowGraTime == this.value) return;
    else pageState.nowGraTime = this.value;

    initAqiChartData();
    renderChart();
  }

  function citySelectChange(){
    if(pageState.nowSelectCity == this.value) return;
    else pageState.nowSelectCity = this.value;

    initAqiChartData();
    renderChart();
  }

  function addEventHandler(ele,event,hanlder){
    if(ele.addEventListener) ele.addEventListener(event,hanlder,false);
    else if(ele.attachEvent) ele.attachEvent("on"+event,hanlder);
    else ele["on"+event] = hanlder;
  }
  function initGraTimeForm(){
    var pageRadio = formGraTime.getElementsByTagName('input');
    for(var i = 0; i < pageRadio.length; i ++){
      addEventHandler(pageRadio[i],'click',graTimeChange);
    }
  }

  function initCitySelector(){
    var cityList = "";
    for(var i in aqiSourceData){
      cityList += '<option>'+i+'</option>'
    }
    citySelect.innerHTML = cityList;
    addEventHandler(citySelect,'change',citySelectChange)
  }

  function initAqiChartData(){
    var nowCityDate = aqiSourceData[pageState.nowSelectCity];
    if (pageState.nowGraTime == 'day') {
      chartData = nowCityDate;
    }
    if (pageState.nowGraTime == 'week') {
      chartData = {};
      var countSum = 0,daySum = 0,week = 0;
      for(var item in nowCityDate){
        countSum += nowCityDate[item];
        daySum ++;
        if ((new Date(item)).getDay()==6) {
          week ++;
          chartData['第'+week+'周'] = Math.floor(countSum/daySum);
          countSum = 0;
          daySum = 0;
        }
      }
      if (daySum != 0 ) {
        week ++;
        chartData['第'+week+'周'] = Math.floor(countSum/daySum);
      }
    }

    if (pageState.nowGraTime == "month") {
      chartData = {};
      var countSum = 0,daySum = 0,month = 0;
      for(var item in nowCityDate){
        countSum += nowCityDate[item];
        daySum ++;
        if ((new Date(item)).getMonth() != month) {
          month ++;
          chartData['第'+ month +'月'] = Math.floor(countSum/daySum);
          countSum = 0;
          daySum = 0;
        }
      }
      if (daySum != 0 ) {
        month ++;
        chartData['第'+month+'月'] = Math.floor(countSum/daySum);
      }
    }
  }

  function init(){
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
  }

  init()
}