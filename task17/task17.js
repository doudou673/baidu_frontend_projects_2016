window.onload = function(){
  function getDataStr(dat){
    var y = dat.getFullYear();
    var m = dat.getMonth()+1;
    var d = dat.getDate();
    m = m < 10 ? m + 1 : m;
    d = d < 10 ? d + 1 : d;
    return y + '-' + m + '-' + d;
  }

  function randomBuildData(seed){
    var returnData = {};
    var dat = new Date("2020-01-01");
    var datStr = '';
    for(var j = 1; j < 91; j++){
      datStr = getDataStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);
      dat.setDate(dat.getDate()+1)
    }
    return returnData;
  }
  
  var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
  };

  var chartData = {}

  var pageState = {
    nowSelectCity:"北京",
    nowGraTime:"day",
  }

  function renderChart(){
    var oDiv = document.getElementsByClassName('aqi-chart-wrap')[0];
    var items = "";
    for(var i in chartData){
      var color = 'rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+',0.8)'
      items += '<div title = "'+i+':'+chartData[i]+'" style = "height:'+chartData[i]+'px;background-color:'+color+'"></div>'
    }
    oDiv.innerHTML = items;
  }

  function graTimeChange(){
    if(pageState.nowGraTime == this.value) return;
    else if(pageState.nowGraTime != this.value){
      pageState.nowGraTime = this.value;
      initAqiChartDate();
      renderChart();
    }
  }
  
  function citySelectChange(){
    if(pageState.nowSelectCity == this.value) return;
    else if(pageState.nowSelectCity != this.value){
      pageState.nowSelectCity = this.value;
      initAqiChartDate();
      renderChart();
    }
  }

  function addEventHandler(ele,event,fun){
    if(ele.addEventListener) ele.addEventListener(event,fun,false);
    if(ele.attachEvent) ele.attachEvent("on"+event,fun);
    else ele["on"+event] = fun;
  }

  function initGraTimeForm(){
    var oTime = document.getElementsByName('gra-time');
    for(var i = 0; i < oTime.length; i ++){
      addEventHandler(oTime[i],'click',graTimeChange);
    }
  }

  function initCitySelector(){
    var oSelect = document.getElementById('city-select');
    var cities = "";
    for(var city in aqiSourceData){
      cities += '<option>'+city+'</option>'
    }
    oSelect.innerHTML = cities;
    addEventHandler(oSelect,'change',citySelectChange);
  }

  function initAqiChartDate(){
    chartData = {};
    var city = pageState.nowSelectCity;
    if(pageState.nowGraTime == "day"){
      chartData = aqiSourceData[city]
    }

    if(pageState.nowGraTime == "week"){
      var count = 0,week = 0,days = 0;
      for(var date in aqiSourceData[city]){
        var weeknum = new Date(date).getDay()
        count += aqiSourceData[city][date];
        days ++;
        if(weeknum == 6){
          week ++;
          chartData['week'+week] = Math.floor(count/days);
          count = 0;
          days = 0
        }
      }
      if(days != 0){
        week ++;;
        chartData['week'+week] = Math.floor(count/days);
      }
    }

    if(pageState.nowGraTime == "month"){
      var count = 0,month = 1,days = 0;
      for(var date in aqiSourceData[city]){
        count += aqiSourceData[city][date];
        days ++;
        if(month != new Date(date).getMonth()){
          chartData['month'+month] = Math.floor(count/days);
          month ++
          count = 0;
          days = 0
        }
      }
      if(days != 0){
        week ++;;
        chartData['month'+month] = Math.floor(count/days);
      }
    }
  }

  function init(){
    initGraTimeForm();
    initCitySelector();
    initAqiChartDate();
    renderChart();
  }

  init();
}