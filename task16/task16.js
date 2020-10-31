var aqiData = {}

function addAqiData(){
  var city = document.getElementById("aqi-city-input").value;
  var score = document.getElementById("aqi-value-input").value;
  aqiData[city]= Number(score) ;
  console.log(aqiData);
}

function renderAqiList(){
  var items = ""
  var oTable = document.getElementById("aqi-table");
  oTable.innerHTML="";
  if(Object.keys(aqiData).length){
    var oThead = document.createElement("thead");
    var theaditem = "<th>城市</th><th>空气质量</th><th>操作</th>";
    oThead.innerHTML = theaditem;
    oTable.appendChild(oThead)
    var oTbody = document.createElement("tbody");
    for(var i in aqiData ){
      items += "<tr><td>"+i+"</td>"+"<td>"+aqiData[i]+"</td><td><a href='#' onclick = 'delBtnHandle(this)'>删除</a></td></tr>";
    }
    oTbody.innerHTML = items;
    oTable.appendChild(oTbody);
  }
}
function addBtnHandle(){
  addAqiData();
  renderAqiList();
}

function delBtnHandle(some){
  var parentTr = some.parentNode.parentNode;
  var delcity = parentTr.firstChild.innerHTML;
  console.log(delcity)
  delete aqiData[delcity];
  
  renderAqiList();
}

function init(){
  document.getElementById("add-btn").onclick = function(){addBtnHandle()};
}

init();