(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userModel/paySetting/getPwd/getPwd"],{"0ba3":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("51bd"),s=a("954b"),o=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,i={data:function(){return{account:null,password:null,code:null,codeStatus:!1,num:null}},methods:{register:function(){if(o.test(this.account))if(this.code)if(6===this.password.length||"number"!==typeof this.password){var e={paypassword:this.password,code:this.code};(0,n.appUpdUserInfoByCode)(e).then(function(e){200==e.errno&&(t.showToast({title:"修改成功"}),(0,s.putUserInfo)(e).then(function(e){t.navigateBack({delta:1})}).catch(function(t){}),t.navigateBack({delta:1}))}).catch(function(t){})}else t.showToast({icon:"none",title:"支付密码为 6 个数字"});else t.showToast({icon:"none",title:"请输入验证码"});else t.showToast({icon:"none",title:"请填写正确的手机号"})},sendCode:function(){this.codeStatus?t.showToast({icon:"none",title:"请耐心等待"}):(this.num=60,this.codeStatus=!0,(0,n.sendMSM)({telephone:this.account,need:"isExist"}).then(function(e){200==e.errno?t.showToast({icon:"none",title:"发送成功，注意查收"}):t.showToast({icon:"none",title:"发送失败,".concat(e.errmsg)})}).catch(function(e){t.showToast({icon:"none",title:"发送失败,".concat(e)})}))}},watch:{num:function(t,e){var a=this;0!==t?setTimeout(function(){a.num--},1e3):this.codeStatus=!1}}};e.default=i}).call(this,a("6e42")["default"])},"532c":function(t,e,a){"use strict";a.r(e);var n=a("0ba3"),s=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"62c3":function(t,e,a){"use strict";a("17f3");var n=o(a("b0ce")),s=o(a("ebe9"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},bc24:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"content"},[a("view",{staticClass:"cu-form-group"},[a("view",{staticClass:"title"},[t._v("手机号：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"radius",attrs:{placeholder:"请输入正确的手机号",name:"input",eventid:"65ca8615-0"},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}}),t._m(0)]),a("view",{staticClass:"cu-form-group"},[a("view",{staticClass:"title"},[t._v("验证码：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"radius",attrs:{placeholder:"验证码",name:"input",eventid:"65ca8615-1"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),a("button",{staticClass:"cu-btn bg-green shadow",attrs:{eventid:"65ca8615-2"},on:{tap:t.sendCode}},[t._v(t._s(t.codeStatus?t.num:"验证码"))])],1),a("view",{staticClass:"cu-form-group"},[a("view",{staticClass:"title"},[t._v("新密码：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"radius",staticStyle:{"z-index":"1",position:"absolute",left:"175rpx"},attrs:{type:"password",placeholder:"支付密码",name:"input",eventid:"65ca8615-3"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"radius",staticStyle:{"z-index":"10",position:"absolute",left:"175rpx",opacity:"0"},attrs:{type:"number",eventid:"65ca8615-4"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),a("view",{staticClass:"padding flex flex-direction"},[a("button",{staticClass:"cu-btn bg-blue lg",attrs:{eventid:"65ca8615-5"},on:{tap:t.submit}},[t._v("提交")])],1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cu-capsule radius"},[a("view",{staticClass:"cu-tag bg-blue "},[t._v("+86")]),a("view",{staticClass:"cu-tag line-blue"},[t._v("中国大陆")])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},ebe9:function(t,e,a){"use strict";a.r(e);var n=a("bc24"),s=a("532c");for(var o in s)"default"!==o&&function(t){a.d(e,t,function(){return s[t]})}(o);var i=a("2877"),c=Object(i["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports}},[["62c3","common/runtime","common/vendor"]]]);