(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderModel/orderDetails/orderDetails"],{"08c8":function(t,e,a){"use strict";a("17f3");var s=c(a("b0ce")),i=c(a("f4fc"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"0907":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a("6b33"),i=a("86a5"),c={data:function(){return{totalData:s.orderDetails.totalData,bookData:s.orderDetails.bookData,orderData:s.orderDetails.orderData,data:{}}},onLoad:function(t){var e=this,a={orderId:t.id};(0,i.getOrderInfo)(a).then(function(t){e.data=t.data}).catch(function(t){})},methods:{call:function(){t.makePhoneCall({phoneNumber:this.data.telephone})},goHotel:function(){t.navigateTo({url:"../../homeModel/home?hotelId="+this.data.hotelId})},goMap:function(){t.navigateTo({url:"../../hotelModel/map/map?lat="+this.data.lat+"&lng="+this.data.lng+"&name="+this.data.hotelname})}}};e.default=c}).call(this,a("6e42")["default"])},b3bc:function(t,e,a){"use strict";a.r(e);var s=a("0907"),i=a.n(s);for(var c in s)"default"!==c&&function(t){a.d(e,t,function(){return s[t]})}(c);e["default"]=i.a},d7f8:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticStyle:{"overflow-x":"hidden","ovweflow-y":"auto"}},[a("view",{staticClass:"bg-gradual-blue shadow-blur",staticStyle:{width:"auto",height:"150rpx"}}),a("view",{staticClass:"cu-card case margin",staticStyle:{position:"absolute",width:"690rpx","border-radius":"5px","margin-top":"-150rpx"}},[a("view",{staticClass:"text-xl"},[a("text",{staticClass:"text-white text-bold"},[t._v(t._s(t.data.status))])]),a("view",{staticClass:"text-white"},[t._v("您的订单"+t._s(t.data.status)+"，期待您再次光顾哦")])]),a("view",{staticClass:"cu-list menu"},[a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("在线支付")]),a("text",{staticClass:"text-red"},[t._v("￥"+t._s(t.data.price))])])]),t._m(0),a("view",{staticClass:"cu-card padding bg-white"},[a("view",{staticClass:"flex justify-between"},[a("text",{staticClass:"text-lg"},[t._v(t._s(t.data.hotelname))]),a("text",{staticClass:"text-blue",attrs:{eventid:"7eef6fd2-0"},on:{tap:t.goHotel}},[t._v("查看商家>")])]),a("view",[a("text",{staticClass:"text-sm text-cut"},[t._v(t._s(t.data.address))])]),a("view",{staticClass:"flex justify-between"},[a("button",{staticClass:"cu-btn bg-white text-blue text-lg",staticStyle:{width:"340rpx"},attrs:{eventid:"7eef6fd2-1"},on:{tap:t.goMap}},[a("text",{staticClass:"icon-location"}),t._v("查看路线")]),a("button",{staticClass:"cu-btn bg-white text-blue text-lg",staticStyle:{width:"340rpx"},attrs:{eventid:"7eef6fd2-2"},on:{tap:t.call}},[a("text",{staticClass:"icon-phone"}),t._v("联系商家")])],1)])]),t._m(1),a("view",{staticClass:"cu-list menu"},[a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("时间")]),a("text",{staticClass:"text-black"},[t._v("￥"+t._s(t.data.time))])])]),a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("房间数")]),a("text",{staticClass:"text-black"},[t._v(t._s(t.data.housenum))])])]),a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("联系手机")]),a("text",{staticClass:"text-black"},[t._v(t._s(t.data.telephone))])])])]),t._m(2),a("view",{staticClass:"cu-list menu"},[a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("订单号")]),a("text",{staticClass:"text-black"},[t._v(t._s(t.data.id))])])]),a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("数量")]),a("text",{staticClass:"text-black"},[t._v(t._s(t.data.daynum)+"晚×"+t._s(t.data.housenum)+"间")])])]),a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("房费")]),a("text",{staticClass:"text-black"},[t._v("￥"+t._s(t.data.price))])])]),a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("押金(到店支付)")]),a("text",{staticClass:"text-black"},[t._v("￥"+t._s(t.data.deposit))])])]),a("view",{staticClass:"cu-item",staticStyle:{"margin-bottom":"70rpx"}},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("支付金额")]),a("text",{staticClass:"text-black"},[t._v("￥"+t._s(t.data.price))])])])]),t.loginStatus?t._e():a("view",{staticStyle:{position:"fixed",bottom:"0",width:"750rpx",height:"40px",background:"#000000"}},[a("button",{staticClass:"cu-btn bg-white",staticStyle:{height:"100%",width:"50%","border-radius":"0"}},[t._v("商家信息报错")]),a("button",{staticClass:"cu-btn bg-blue",staticStyle:{height:"100%",width:"50%","border-radius":"0"}},[t._v("删除订单")])],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cu-item"},[a("view",{staticClass:"content flex justify-between"},[a("text",{staticClass:"text-grey"},[t._v("发票报销")]),a("text",{staticClass:"text-black"},[t._v("如需发票，请先与酒店确认可开")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cu-bar bg-white solid-bottom margin-top"},[a("view",{staticClass:"action"},[a("text",{staticClass:"text-orange"}),t._v("预订信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cu-bar bg-white solid-bottom margin-top"},[a("view",{staticClass:"action"},[a("text",{staticClass:"text-orange"}),t._v("订单信息")])])}];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},f4fc:function(t,e,a){"use strict";a.r(e);var s=a("d7f8"),i=a("b3bc");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);var l=a("2877"),n=Object(l["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=n.exports}},[["08c8","common/runtime","common/vendor"]]]);