(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hotelModel/map/map"],{"0c93":function(t,e,i){"use strict";i("17f3");var n=a(i("b0ce")),o=a(i("997f"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(o.default))},"0e91":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{map:null,locationState:!0,covers:[{id:1,latitude:null,longitude:null,title:"当前位置",iconPath:"../../../static/mapImg/marker.png",width:30,height:30}],controls:[{id:1,position:{left:10,top:50,width:40,height:40},iconPath:"../../../static/mapImg/controlPosition.png",clickable:!0},{id:2,position:{left:10,top:110,width:40,height:40},iconPath:"../../../static/mapImg/refresh.png",clickable:!0},{id:3,position:{left:10,top:170,width:40,height:40},iconPath:"../../../static/mapImg/navigation.png",clickable:!0}],polyline:[{points:[],color:"#8A2BE288",width:"10",dottedLine:!1,arrowLine:!0}],marker:null,height:{height:null},latitude:null,longitude:null,name:null}},onShow:function(){var e=this;setTimeout(function(){e.map=t.createMapContext("myMap")},0),setTimeout(function(){e.map.moveToLocation()},200),setTimeout(function(){e.getCurrentLocation()},400)},onLoad:function(e){this.latitude=e.lat,this.longitude=e.lng,this.name=e.name,t.setNavigationBarTitle({title:this.name})},methods:{markerEvent:function(t){this.marker=t.target.markerId,this.polyline[0].points=[],this.polyline[0].points.push({latitude:this.covers[0].latitude,longitude:this.covers[0].longitude}),this.polyline[0].points.push({latitude:this.covers[t.target.markerId-1].latitude,longitude:this.covers[t.target.markerId-1].longitude})},controlEvent:function(t){var e=this,i=t.mp.controlId;switch(i){case 1:this.map.moveToLocation();break;case 2:this.getCurrentLocation(),setTimeout(function(){e.polyline[0].points&&(e.polyline[0].points[0].latitude=e.covers[0].latitude,e.polyline[0].points[0].longitude=e.covers[0].longitude)},300);break;case 3:this.navigation();break;default:break}},getCurrentLocation:function(){var e=this;t.getLocation({type:"gcj02",success:function(t){e.covers[0].latitude=t.latitude,e.covers[0].longitude=t.longitude}})},navigation:function(){t.openLocation({latitude:Number(this.latitude),longitude:Number(this.longitude),name:this.name,address:this.name,success:function(){}})},removeSame:function(t){for(var e=[],i=0;i<t.length;i++){for(var n=!0,o=0;o<e.length;o++)t[i].businessId.position.longitude===e[o].longitude&&t[i].businessId.position.latitude===e[o].latitude&&(n=!1);n&&e.push(t[i].businessId.position)}return e}}};e.default=i}).call(this,i("6e42")["default"])},1585:function(t,e,i){"use strict";i.r(e);var n=i("0e91"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a},"1afb":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticStyle:{height:"100%"}},[i("map",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"myMap",controls:t.controls,markers:t.covers,polyline:t.polyline,circles:t.circles,"show-location":!0,eventid:"2a3e156b-0"},on:{markertap:t.markerEvent,controltap:t.controlEvent}})],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},"997f":function(t,e,i){"use strict";i.r(e);var n=i("1afb"),o=i("1585");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("a896");var l=i("2877"),u=Object(l["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},a896:function(t,e,i){"use strict";var n=i("d053"),o=i.n(n);o.a},d053:function(t,e,i){}},[["0c93","common/runtime","common/vendor"]]]);