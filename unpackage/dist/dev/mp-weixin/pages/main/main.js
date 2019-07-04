(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/main/main"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;















































































































var _main = __webpack_require__(/*! ../../setting/main.js */ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\setting\\main.js");


var _hotels = __webpack_require__(/*! ../../api/hotels.js */ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\api\\hotels.js");var leftModel = function leftModel() {return __webpack_require__.e(/*! import() | pages/main/leftModel */ "pages/main/leftModel").then(__webpack_require__.bind(null, /*! ./leftModel */ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\leftModel.vue"));};



var img = 'http://p0.meituan.net/tdchotel/1938994348a6ade29a5c6bf2fdf02ae15542536.jpg@220w_125h_1e_1c',
bgTag = 'http://www.sweetqianba.com/group1/M00/00/00/rBsAEVz_TWuALPoBAAAFE_TWZDA213.png',
img2 = 'http://p0.meituan.net/hotel/afb53273e9dc6b09bf4cf427119e5a58591104.jpg@660w_500h_1e_1c',
img3 = 'http://p0.meituan.net/hotel/26b031011e46a371444a08123ba307e2674980.png',
img4 = 'http://p0.meituan.net/hotel/2490b2063966e24538f279760ee0cad3652981.png';var _default =
{
  data: function data() {
    return {
      loginStatus: false, //默认为未登录
      modalName: null, //控制打开状态，打开方式
      ListTouchStart: null, // 起始的位置，用于判断左右滑动
      ListTouchStartY: null, //其实的y坐标位置，用于判断是否滑动，如果上下滑动的太大就不进行滑动
      touchDirection: null, // 算出来的滑动方向
      iconList: _main.mainIcon.iconList,
      swiper: _main.mainIcon.swiper,
      cardCur: 0,
      cards: [{
        id: 0 }],

      img: img,
      img2: img2,
      img3: img3,
      img4: img4,
      bgTag: bgTag,
      inputVal: null, //导航栏上的input的值
      params: {},
      pageNum: 1, //当前获取数据的页数
      pageSize: 10, //每页多少条
      data: [] };

  },
  components: {
    leftModel: leftModel },

  // 下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {var _this = this;
    setTimeout(function () {
      uni.stopPullDownRefresh();
      _this.data = [];
      _this.pageNum = 1;
      var params = {
        pageNum: _this.pageNum,
        pageSize: _this.pageSize };

      _this.appGetHotelsByToken(params);
      uni.showToast({
        icon: 'none',
        title: '刷新成功' });

    }, 1000);
  },
  //触底刷新
  onReachBottom: function onReachBottom() {
    this.pageNum++;
    this.params.pageNum++;
    this.appGetHotelsByToken(this.params);
  },
  onLoad: function onLoad() {
    var params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize };

    this.params = params;
    this.appGetHotelsByToken(this.params);
  },
  // 监听input的值和按钮操作事件和软键盘上的搜索按钮
  onNavigationBarButtonTap: function onNavigationBarButtonTap(val) {
    uni.navigateTo({
      url: '../hotelModel/hotelList/hotelList?name=' + this.inputVal });

  },
  onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(val) {
    this.inputVal = val.text;
  },
  onNavigationBarSearchInputConfirmed: function onNavigationBarSearchInputConfirmed(val) {
    uni.navigateTo({
      url: '../hotelModel/hotelList/hotelList?name=' + this.inputVal });

  },
  onShow: function onShow() {
    if (!uni.getStorageSync('token')) {
      this.loginStatus = false;
    } else {
      this.loginStatus = true;
    }
    this.hideModel();

  },
  methods: {
    hideModel: function hideModel() {
      this.modalName = null;
    },
    showModel: function showModel() {
      this.modalName = 'DrawerModalL';
    },
    // 轮播图显示增大方法
    cardSwiper: function cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    /* 左滑操作 */
    // ListTouch触摸开始
    TouchStart: function TouchStart(e) {
      this.ListTouchStart = e.touches[0].pageX;
      this.ListTouchStartY = e.touches[0].pageY;
    },

    // ListTouch计算方向
    ListTouchMove: function ListTouchMove(e) {
      this.touchDirection = null;
      /* 在保证y轴上变化不大的情况下，可以进行滑动 */
      if (Math.abs(e.touches[0].pageY - this.ListTouchStartY) < 20 && Math.abs(e.touches[0].pageX - this.ListTouchStart) >
      50) {
        this.touchDirection = e.touches[0].pageX - this.ListTouchStart > 0 ? 'right' : 'left';
      }
    },

    // ListTouch计算滚动
    ListTouchEnd: function ListTouchEnd(e) {
      if (this.touchDirection == 'left') {
        this.hideModel();
      } else if (this.touchDirection == 'right') {
        this.showModel();
      }
    },
    goHotelCenter: function goHotelCenter(index) {
      if (index === 0) {
        uni.switchTab({
          url: '../hotelModel/hotels' });

      } else {
        uni.showToast({
          icon: 'none',
          title: '暂未开放' });

      }
    },
    goRoom: function goRoom(data) {
      uni.navigateTo({
        url: '../homeModel/home?hotelId=' + data.id });

    },
    appGetHotelsByToken: function appGetHotelsByToken(params) {var _this2 = this;
      (0, _hotels.appGetHotelsByToken)(params).then(function (data) {
        console.log(data, 'sssssssss');
        if (!data.data) {
          // 调用随机获取酒店信息
          (0, _hotels.appGetRandomHotels)(params).then(function (data) {
            data.data.forEach(function (item) {
              _this2.data.push(item);
            });
          }).catch(function (err) {});
        } else {
          data.data.forEach(function (item) {
            _this2.data.push(item);
          });
        }
      }).catch(function (err) {
        console.log(err, 'eeeeeee');
      });
    },
    goLogin: function goLogin() {
      uni.navigateTo({
        url: '../userModel/login/login' });

    },
    goHotel: function goHotel() {
      uni.switchTab({
        url: '../hotelModel/hotels' });

    },
    goMovie: function goMovie() {
      uni.showToast({
        icon: 'none',
        title: '暂未开放' });

    },
    goNoise: function goNoise() {
      uni.showToast({
        icon: 'none',
        title: '暂未开放' });

    },
    goEvaluate: function goEvaluate() {
      uni.navigateTo({
        url: "../evaluateModel/evaluate" });

    },
    goTop: function goTop() {
      uni.showToast({
        icon: 'none',
        title: '暂未开放' });

    },
    goHelp: function goHelp() {
      uni.showToast({
        icon: 'none',
        title: '暂未开放' });

    },
    method: function method(data) {
      this[data]();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=template&id=37933355&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue?vue&type=template&id=37933355& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.modalName = ""
    }
  }
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue":
/*!*********************************************************************!*\
  !*** D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.vue?vue&type=template&id=37933355& */ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=template&id=37933355&");
/* harmony import */ var _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.vue?vue&type=script&lang=js& */ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__["render"],
  _main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=template&id=37933355&":
/*!****************************************************************************************************!*\
  !*** D:/2019-暑-课设-前端/frontEnd/hotelAppointment/pages/main/main.vue?vue&type=template&id=37933355& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./main.vue?vue&type=template&id=37933355& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\pages\\main\\main.vue?vue&type=template&id=37933355&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuildX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_37933355___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["D:\\2019-暑-课设-前端\\frontEnd\\hotelAppointment\\main.js?{\"page\":\"pages%2Fmain%2Fmain\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/main/main.js.map