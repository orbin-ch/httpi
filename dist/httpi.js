(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _response = __webpack_require__(1);

	var _response2 = _interopRequireDefault(_response);

	var _headers = __webpack_require__(2);

	var _headers2 = _interopRequireDefault(_headers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HttpClient = function () {
	  function HttpClient(options) {
	    _classCallCheck(this, HttpClient);

	    options = options || {};
	    this.baseUrl = options.baseUrl || "";
	    this.headers = new _headers2.default(options.headers || {});
	    this.interceptors = [];
	  }

	  _createClass(HttpClient, [{
	    key: "request",
	    value: function request(options) {
	      var _this = this;

	      var promise = new Promise(function (resolve, reject) {
	        var xhr = new window.XMLHttpRequest();

	        xhr.onload = function () {
	          var response = new _response2.default(this);

	          if (response.isSuccess) {
	            resolve(response);
	          } else {
	            reject(response);
	          }
	        };

	        xhr.onerror = function () {
	          reject(new _response2.default(this));
	        };

	        xhr.ontimeout = function () {
	          reject(new _response2.default(this));
	        };

	        xhr.open(options.method, _this.baseUrl + options.url, true);

	        _this.headers.forEach(function (value, name) {
	          xhr.setRequestHeader(name, value);
	        });

	        if (!_this.headers.has("Content-Type")) {
	          xhr.setRequestHeader("Content-Type", "application/json");
	        }

	        xhr.send(options.body ? JSON.stringify(options.body) : null);
	      });

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.interceptors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var interceptor = _step.value;

	          promise.then(interceptor.response, interceptor.responseError);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return promise;
	    }
	  }, {
	    key: "post",
	    value: function post(url, body) {
	      return this.request({
	        url: url,
	        method: "POST",
	        body: body
	      });
	    }
	  }]);

	  return HttpClient;
	}();

	exports.default = HttpClient;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Response = function () {
	  function Response(xhr) {
	    _classCallCheck(this, Response);

	    this.statusCode = xhr.status;
	    this.isSuccess = this.statusCode >= 200 && this.statusCode < 300;
	    this.responseText = xhr.responseText;
	  }

	  _createClass(Response, [{
	    key: "json",
	    value: function json() {
	      return JSON.parse(this.responseText);
	    }
	  }]);

	  return Response;
	}();

	exports.default = Response;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Headers = function () {
	  function Headers(headers) {
	    _classCallCheck(this, Headers);

	    this.headers = headers;
	  }

	  _createClass(Headers, [{
	    key: "has",
	    value: function has(name) {
	      name = name.toLowerCase();

	      return Object.keys(this.headers).some(function (key) {
	        return key.toLowerCase() === name;
	      });
	    }
	  }, {
	    key: "forEach",
	    value: function forEach(callback) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(this.headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var header = _step.value;

	          callback(this.headers[header], header);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }]);

	  return Headers;
	}();

	exports.default = Headers;

/***/ }
/******/ ])
});
;