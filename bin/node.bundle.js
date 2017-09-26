module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var moment = __webpack_require__(2);
	var redis = __webpack_require__(3);
	
	var cms = __webpack_require__(4);
	
	/*
	  Botpress module template. This is your module's entry point.
	  Please have a look at the docs for more information about config, init and ready.
	  https://botpress.io/docs
	*/
	
	module.exports = {
	
	  config: {},
	
	  init: function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bp, configurator) {
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));
	
	    function init(_x, _x2) {
	      return _ref.apply(this, arguments);
	    }
	
	    return init;
	  }(),
	
	  ready: function () {
	    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(bp, configurator) {
	
	      // Will be exposed at: http://localhost:3000/api/botpress-polls/results
	
	      var getPolls = function () {
	        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	          var client, todaysDate, pollList, items, i, poll, j, count;
	          return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	              switch (_context2.prev = _context2.next) {
	                case 0:
	                  client = redis.createClient(process.env.REDIS_URL);
	                  todaysDate = moment.tz(new Date(), 'America/New_York');
	                  pollList = [];
	                  _context2.next = 5;
	                  return cms.getContent(bp, 'polls');
	
	                case 5:
	                  items = _context2.sent;
	                  i = 0;
	
	                case 7:
	                  if (!(i < items.length)) {
	                    _context2.next = 25;
	                    break;
	                  }
	
	                  poll = {
	                    hashtag: items[i].data.code,
	                    options: []
	                  };
	                  j = 0;
	
	                case 10:
	                  if (!(j < 3)) {
	                    _context2.next = 21;
	                    break;
	                  }
	
	                  _context2.next = 13;
	                  return client.getAsync('count:' + items[i].data.code + '-' + todaysDate.format('YYYYMMDD') + ':' + (j + 1));
	
	                case 13:
	                  _context2.t0 = _context2.sent;
	
	                  if (_context2.t0) {
	                    _context2.next = 16;
	                    break;
	                  }
	
	                  _context2.t0 = 0;
	
	                case 16:
	                  count = _context2.t0;
	
	                  poll.options.push({ name: items[i]['data']['option' + (j + 1)], count: count });
	
	                case 18:
	                  j++;
	                  _context2.next = 10;
	                  break;
	
	                case 21:
	                  pollList.push(poll);
	
	                case 22:
	                  i++;
	                  _context2.next = 7;
	                  break;
	
	                case 25:
	                  client.quit();
	                  return _context2.abrupt('return', pollList);
	
	                case 27:
	                case 'end':
	                  return _context2.stop();
	              }
	            }
	          }, _callee2, this);
	        }));
	
	        return function getPolls() {
	          return _ref3.apply(this, arguments);
	        };
	      }();
	
	      var router, config;
	      return regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              // Your module's been loaded by Botpress.
	              // Serve your APIs here, execute logic, etc.
	
	              router = bp.getRouter('botpress-polls', { auth: false });
	
	
	              router.get('/results', function (req, res) {
	                getPolls().then(function (pollList) {
	                  res.send({
	                    polls: pollList
	                  });
	                });
	              });
	
	              _context3.next = 4;
	              return configurator.loadAll();
	
	            case 4:
	              config = _context3.sent;
	
	            case 5:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    }));
	
	    function ready(_x3, _x4) {
	      return _ref2.apply(this, arguments);
	    }
	
	    return ready;
	  }()
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("moment-timezone");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("redis");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var getContent = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bp, category) {
	    var client, rkey, content;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            // get content from cache. hit db if no cache data available
	            client = redis.createClient(process.env.REDIS_URL);
	            rkey = 'content-' + category;
	            _context.next = 4;
	            return client.getAsync(rkey);
	
	          case 4:
	            content = _context.sent;
	
	            if (!content) {
	              _context.next = 10;
	              break;
	            }
	
	            client.quit();
	            return _context.abrupt('return', JSON.parse(content));
	
	          case 10:
	            _context.next = 12;
	            return bp.contentManager.listCategoryItems(category);
	
	          case 12:
	            content = _context.sent;
	            _context.next = 15;
	            return client.setAsync(rkey, JSON.stringify(content), 'EX', 60 * 5);
	
	          case 15:
	            client.quit();
	            return _context.abrupt('return', content);
	
	          case 17:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function getContent(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var P = __webpack_require__(5);
	var redis = __webpack_require__(3);
	P.promisifyAll(redis.RedisClient.prototype);
	P.promisifyAll(redis.Multi.prototype);
	
	module.exports = {
	  getContent: getContent
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("bluebird");

/***/ })
/******/ ]);
//# sourceMappingURL=node.bundle.js.map