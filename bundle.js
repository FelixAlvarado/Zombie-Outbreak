/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/outbreak.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/game.js":
/*!****************************!*\
  !*** ./javascript/game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _survival__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./survival */ \"./javascript/survival.js\");\n\n\nclass Game {\n  constructor(grid,ctx){\n    this.grid = grid;\n    this.ctx = ctx;\n    // this.process = setInterval(() => this.procedures);\n  }\n\n  move() {\n    let zombieCount = 0;\n    let humanCount = 0;\n    const tempGrid = JSON.parse(JSON.stringify( this.grid.grid ));\n    tempGrid.forEach((arr, i) =>{\n      arr.forEach((space, j) => {\n        if (space === 'z'){zombieCount++;}\n        if (space === 'h'){humanCount++;}\n        if (space !== 'b'){\n          let moves = this.grid.getMoves(tempGrid,i,j);\n          if(moves.length > 0){\n            let direction = Math.floor(Math.random() * moves.length);\n            let move = moves[direction];\n              if(this.grid.grid[i + move[0]][j + move[1]] === 'b'){\n                let oldSpot = tempGrid[i][j];\n                let newSpot = tempGrid[i + move[0]][j + move[1]];\n                this.grid.grid[i][j] = newSpot;\n                this.grid.grid[i + move[0]][j + move[1]] = oldSpot;\n              }\n            }\n          }\n\n      });\n    });\n    this.endGame(humanCount,zombieCount);\n  }\n\n  endGame(human,zombie) {\n    if (human === 0  || zombie === 0){\n      clearInterval(this.process);\n      this.grid.grid = this.grid.generateGrid();\n      this.ctx.font = \"75px Arial\";\n      this.ctx.fillStyle = \"blue\";\n      if (human === 0) {this.ctx.fillText(\"Zombies Win!\",170,320);}\n      if (zombie === 0) {this.ctx.fillText(\"The People Survived!\",40,320);}\n    }\n  }\n\n  updateGrid(x,y) {\n    const newX = (x % 20) / 20;\n    const newY = (y % 20) / 20;\n    this.grid.grid[newY][newX] = 'z';\n  }\n\n  encounter() {\n    const tempGrid = JSON.parse(JSON.stringify( this.grid.grid ));\n    this.grid.grid.forEach((arr, i) =>{\n      arr.forEach((space, j) => {\n        if (space !== 'b'){\n          if(this.grid.grid[i][j] === 'z') {this.zombieMove(i,j);}\n          if(this.grid.grid[i][j] === 'h') {this.humanMove(i,j);}\n        }\n    });\n  });\n  }\n\n  humanMove(y,x){\n    let zombies = _survival__WEBPACK_IMPORTED_MODULE_0__[\"getZombies\"](this.grid.grid,y,x);\n    let moves = this.grid.getMoves(this.grid.grid,y,x);\n    if (zombies.length === 0 && moves.length > 0){\n      let move = moves[Math.floor(Math.random() * moves.length)];\n      let chance = Math.random()*100;\n      if(chance <= this.survivalFind){this.grid.grid[y + move[0]][x + move[1]] = 'h';}\n    }\n  }\n\n  zombieMove(y,x){\n    let humans = _survival__WEBPACK_IMPORTED_MODULE_0__[\"getHumans\"](this.grid.grid,y,x);\n    if (humans.length > 0){\n      let human = humans[Math.floor(Math.random()* humans.length)];\n      let chance = Math.random()*100;\n      let zombies = _survival__WEBPACK_IMPORTED_MODULE_0__[\"getZombies\"](this.grid.grid,y,x);\n      if (humans.length > zombies.length){\n        if(chance < this.personInfection) {this.grid.grid[human[0]][human[1]] = 'z';}\n        if (chance >= this.personInfection && chance < this.personInfection + this.personKill) {this.grid.grid[y][x] = 'b';}\n      }\n      if (humans.length === zombies.length){\n        if(chance < this.equalInfection) {this.grid.grid[human[0]][human[1]] = 'z';}\n        if (chance >= this.equalInfection && chance < this.equalInfection + this.equalKill)\n        console.log(this.equalInfection + this.equalKill); {this.grid.grid[y][x] = 'b';}\n      }\n      if (humans.length < zombies.length){\n        if(chance < this.zombieInfection) {this.grid.grid[human[0]][human[1]] = 'z';}\n        if (chance >= this.zombieInfection && chance < this.zombieInfection + this.zombieKill) {this.grid.grid[y][x] = 'b';}\n      }\n    }\n  }\n\n    startSimulation(equalInfection, equalKill, personInfection,personKill, zombieInfection, zombieKill,survivalFind, simSpeed){\n      this.equalInfection = parseInt(equalInfection.value);\n      this.equalKill = parseInt(equalKill.value);\n      this.personInfection = parseInt(personInfection.value);\n      this.personKill = parseInt(personKill.value);\n      this.zombieInfection = parseInt(zombieInfection.value);\n      this.zombieKill = parseInt(zombieKill.value);\n      this.survivalFind = parseInt(survivalFind.value);\n      this.simSpeed = parseInt(simSpeed.value * 1000);\n      clearInterval(this.process);\n      this.process = setInterval(this.procedures.bind(this), this.simSpeed);\n    }\n\n    pauseSimulation() {\n\n      clearInterval(this.process);\n    }\n\n    resetSimulation() {\n      this.ctx.clearRect(0,0,800,600);\n      clearInterval(this.process);\n      this.grid.grid = this.grid.generateGrid();\n    }\n\n\n    procedures() {\n      this.grid.draw(this.ctx);\n      this.move();\n      this.encounter();\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2dhbWUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L2dhbWUuanM/OGVlYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTdXJ2aXZhbCBmcm9tICcuL3N1cnZpdmFsJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsY3R4KXtcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIC8vIHRoaXMucHJvY2VzcyA9IHNldEludGVydmFsKCgpID0+IHRoaXMucHJvY2VkdXJlcyk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGxldCB6b21iaWVDb3VudCA9IDA7XG4gICAgbGV0IGh1bWFuQ291bnQgPSAwO1xuICAgIGNvbnN0IHRlbXBHcmlkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSggdGhpcy5ncmlkLmdyaWQgKSk7XG4gICAgdGVtcEdyaWQuZm9yRWFjaCgoYXJyLCBpKSA9PntcbiAgICAgIGFyci5mb3JFYWNoKChzcGFjZSwgaikgPT4ge1xuICAgICAgICBpZiAoc3BhY2UgPT09ICd6Jyl7em9tYmllQ291bnQrKzt9XG4gICAgICAgIGlmIChzcGFjZSA9PT0gJ2gnKXtodW1hbkNvdW50Kys7fVxuICAgICAgICBpZiAoc3BhY2UgIT09ICdiJyl7XG4gICAgICAgICAgbGV0IG1vdmVzID0gdGhpcy5ncmlkLmdldE1vdmVzKHRlbXBHcmlkLGksaik7XG4gICAgICAgICAgaWYobW92ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbW92ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBtb3ZlID0gbW92ZXNbZGlyZWN0aW9uXTtcbiAgICAgICAgICAgICAgaWYodGhpcy5ncmlkLmdyaWRbaSArIG1vdmVbMF1dW2ogKyBtb3ZlWzFdXSA9PT0gJ2InKXtcbiAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IHRlbXBHcmlkW2ldW2pdO1xuICAgICAgICAgICAgICAgIGxldCBuZXdTcG90ID0gdGVtcEdyaWRbaSArIG1vdmVbMF1dW2ogKyBtb3ZlWzFdXTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZ3JpZFtpXVtqXSA9IG5ld1Nwb3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdyaWRbaSArIG1vdmVbMF1dW2ogKyBtb3ZlWzFdXSA9IG9sZFNwb3Q7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuZW5kR2FtZShodW1hbkNvdW50LHpvbWJpZUNvdW50KTtcbiAgfVxuXG4gIGVuZEdhbWUoaHVtYW4sem9tYmllKSB7XG4gICAgaWYgKGh1bWFuID09PSAwICB8fCB6b21iaWUgPT09IDApe1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnByb2Nlc3MpO1xuICAgICAgdGhpcy5ncmlkLmdyaWQgPSB0aGlzLmdyaWQuZ2VuZXJhdGVHcmlkKCk7XG4gICAgICB0aGlzLmN0eC5mb250ID0gXCI3NXB4IEFyaWFsXCI7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgIGlmIChodW1hbiA9PT0gMCkge3RoaXMuY3R4LmZpbGxUZXh0KFwiWm9tYmllcyBXaW4hXCIsMTcwLDMyMCk7fVxuICAgICAgaWYgKHpvbWJpZSA9PT0gMCkge3RoaXMuY3R4LmZpbGxUZXh0KFwiVGhlIFBlb3BsZSBTdXJ2aXZlZCFcIiw0MCwzMjApO31cbiAgICB9XG4gIH1cblxuICB1cGRhdGVHcmlkKHgseSkge1xuICAgIGNvbnN0IG5ld1ggPSAoeCAlIDIwKSAvIDIwO1xuICAgIGNvbnN0IG5ld1kgPSAoeSAlIDIwKSAvIDIwO1xuICAgIHRoaXMuZ3JpZC5ncmlkW25ld1ldW25ld1hdID0gJ3onO1xuICB9XG5cbiAgZW5jb3VudGVyKCkge1xuICAgIGNvbnN0IHRlbXBHcmlkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSggdGhpcy5ncmlkLmdyaWQgKSk7XG4gICAgdGhpcy5ncmlkLmdyaWQuZm9yRWFjaCgoYXJyLCBpKSA9PntcbiAgICAgIGFyci5mb3JFYWNoKChzcGFjZSwgaikgPT4ge1xuICAgICAgICBpZiAoc3BhY2UgIT09ICdiJyl7XG4gICAgICAgICAgaWYodGhpcy5ncmlkLmdyaWRbaV1bal0gPT09ICd6Jykge3RoaXMuem9tYmllTW92ZShpLGopO31cbiAgICAgICAgICBpZih0aGlzLmdyaWQuZ3JpZFtpXVtqXSA9PT0gJ2gnKSB7dGhpcy5odW1hbk1vdmUoaSxqKTt9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIH1cblxuICBodW1hbk1vdmUoeSx4KXtcbiAgICBsZXQgem9tYmllcyA9IFN1cnZpdmFsLmdldFpvbWJpZXModGhpcy5ncmlkLmdyaWQseSx4KTtcbiAgICBsZXQgbW92ZXMgPSB0aGlzLmdyaWQuZ2V0TW92ZXModGhpcy5ncmlkLmdyaWQseSx4KTtcbiAgICBpZiAoem9tYmllcy5sZW5ndGggPT09IDAgJiYgbW92ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgbW92ZSA9IG1vdmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdmVzLmxlbmd0aCldO1xuICAgICAgbGV0IGNoYW5jZSA9IE1hdGgucmFuZG9tKCkqMTAwO1xuICAgICAgaWYoY2hhbmNlIDw9IHRoaXMuc3Vydml2YWxGaW5kKXt0aGlzLmdyaWQuZ3JpZFt5ICsgbW92ZVswXV1beCArIG1vdmVbMV1dID0gJ2gnO31cbiAgICB9XG4gIH1cblxuICB6b21iaWVNb3ZlKHkseCl7XG4gICAgbGV0IGh1bWFucyA9IFN1cnZpdmFsLmdldEh1bWFucyh0aGlzLmdyaWQuZ3JpZCx5LHgpO1xuICAgIGlmIChodW1hbnMubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgaHVtYW4gPSBodW1hbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKiBodW1hbnMubGVuZ3RoKV07XG4gICAgICBsZXQgY2hhbmNlID0gTWF0aC5yYW5kb20oKSoxMDA7XG4gICAgICBsZXQgem9tYmllcyA9IFN1cnZpdmFsLmdldFpvbWJpZXModGhpcy5ncmlkLmdyaWQseSx4KTtcbiAgICAgIGlmIChodW1hbnMubGVuZ3RoID4gem9tYmllcy5sZW5ndGgpe1xuICAgICAgICBpZihjaGFuY2UgPCB0aGlzLnBlcnNvbkluZmVjdGlvbikge3RoaXMuZ3JpZC5ncmlkW2h1bWFuWzBdXVtodW1hblsxXV0gPSAneic7fVxuICAgICAgICBpZiAoY2hhbmNlID49IHRoaXMucGVyc29uSW5mZWN0aW9uICYmIGNoYW5jZSA8IHRoaXMucGVyc29uSW5mZWN0aW9uICsgdGhpcy5wZXJzb25LaWxsKSB7dGhpcy5ncmlkLmdyaWRbeV1beF0gPSAnYic7fVxuICAgICAgfVxuICAgICAgaWYgKGh1bWFucy5sZW5ndGggPT09IHpvbWJpZXMubGVuZ3RoKXtcbiAgICAgICAgaWYoY2hhbmNlIDwgdGhpcy5lcXVhbEluZmVjdGlvbikge3RoaXMuZ3JpZC5ncmlkW2h1bWFuWzBdXVtodW1hblsxXV0gPSAneic7fVxuICAgICAgICBpZiAoY2hhbmNlID49IHRoaXMuZXF1YWxJbmZlY3Rpb24gJiYgY2hhbmNlIDwgdGhpcy5lcXVhbEluZmVjdGlvbiArIHRoaXMuZXF1YWxLaWxsKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVxdWFsSW5mZWN0aW9uICsgdGhpcy5lcXVhbEtpbGwpOyB7dGhpcy5ncmlkLmdyaWRbeV1beF0gPSAnYic7fVxuICAgICAgfVxuICAgICAgaWYgKGh1bWFucy5sZW5ndGggPCB6b21iaWVzLmxlbmd0aCl7XG4gICAgICAgIGlmKGNoYW5jZSA8IHRoaXMuem9tYmllSW5mZWN0aW9uKSB7dGhpcy5ncmlkLmdyaWRbaHVtYW5bMF1dW2h1bWFuWzFdXSA9ICd6Jzt9XG4gICAgICAgIGlmIChjaGFuY2UgPj0gdGhpcy56b21iaWVJbmZlY3Rpb24gJiYgY2hhbmNlIDwgdGhpcy56b21iaWVJbmZlY3Rpb24gKyB0aGlzLnpvbWJpZUtpbGwpIHt0aGlzLmdyaWQuZ3JpZFt5XVt4XSA9ICdiJzt9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgICBzdGFydFNpbXVsYXRpb24oZXF1YWxJbmZlY3Rpb24sIGVxdWFsS2lsbCwgcGVyc29uSW5mZWN0aW9uLHBlcnNvbktpbGwsIHpvbWJpZUluZmVjdGlvbiwgem9tYmllS2lsbCxzdXJ2aXZhbEZpbmQsIHNpbVNwZWVkKXtcbiAgICAgIHRoaXMuZXF1YWxJbmZlY3Rpb24gPSBwYXJzZUludChlcXVhbEluZmVjdGlvbi52YWx1ZSk7XG4gICAgICB0aGlzLmVxdWFsS2lsbCA9IHBhcnNlSW50KGVxdWFsS2lsbC52YWx1ZSk7XG4gICAgICB0aGlzLnBlcnNvbkluZmVjdGlvbiA9IHBhcnNlSW50KHBlcnNvbkluZmVjdGlvbi52YWx1ZSk7XG4gICAgICB0aGlzLnBlcnNvbktpbGwgPSBwYXJzZUludChwZXJzb25LaWxsLnZhbHVlKTtcbiAgICAgIHRoaXMuem9tYmllSW5mZWN0aW9uID0gcGFyc2VJbnQoem9tYmllSW5mZWN0aW9uLnZhbHVlKTtcbiAgICAgIHRoaXMuem9tYmllS2lsbCA9IHBhcnNlSW50KHpvbWJpZUtpbGwudmFsdWUpO1xuICAgICAgdGhpcy5zdXJ2aXZhbEZpbmQgPSBwYXJzZUludChzdXJ2aXZhbEZpbmQudmFsdWUpO1xuICAgICAgdGhpcy5zaW1TcGVlZCA9IHBhcnNlSW50KHNpbVNwZWVkLnZhbHVlICogMTAwMCk7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMucHJvY2Vzcyk7XG4gICAgICB0aGlzLnByb2Nlc3MgPSBzZXRJbnRlcnZhbCh0aGlzLnByb2NlZHVyZXMuYmluZCh0aGlzKSwgdGhpcy5zaW1TcGVlZCk7XG4gICAgfVxuXG4gICAgcGF1c2VTaW11bGF0aW9uKCkge1xuXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucHJvY2Vzcyk7XG4gICAgfVxuXG4gICAgcmVzZXRTaW11bGF0aW9uKCkge1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCw4MDAsNjAwKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wcm9jZXNzKTtcbiAgICAgIHRoaXMuZ3JpZC5ncmlkID0gdGhpcy5ncmlkLmdlbmVyYXRlR3JpZCgpO1xuICAgIH1cblxuXG4gICAgcHJvY2VkdXJlcygpIHtcbiAgICAgIHRoaXMuZ3JpZC5kcmF3KHRoaXMuY3R4KTtcbiAgICAgIHRoaXMubW92ZSgpO1xuICAgICAgdGhpcy5lbmNvdW50ZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./javascript/game.js\n");

/***/ }),

/***/ "./javascript/grid.js":
/*!****************************!*\
  !*** ./javascript/grid.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// var canvas = document.getElementById('canvas');\n// var c = canvas.getContext('2d');\n// c.fillStyle = \"red\";\n// c.fillRect(0,0,40,40);\n\n\nclass Grid {\n  constructor(zombie, human) {\n    this.grid = this.generateGrid();\n    this.zombie = zombie;\n    this.human = human;\n  }\n\ngenerateGrid () {\n  let placement = ['z','h','h','h','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'];\n  let grid = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];\n  for (let i = 0; i < 30; i++) {\n      while (grid[i].length < 40) {\n        let random = placement[Math.floor(Math.random() * 40)];\n            grid[i].push(random);\n    }\n  }\n  return grid;\n}\n\n  getMoves(grid,y,x) {\n    let result = [];\n    if (y > 0 && grid[y-1][x] === 'b') {result.push([-1,0]);}\n    if (y < 29 && grid[y+1][x] === 'b') {result.push([1,0]);}\n    if (x > 0 && grid[y][x-1] === 'b') {result.push([0,-1]);}\n    if (x < 39 && grid[y][x+1] === 'b') {result.push([0,1]);}\n    return result;\n  }\n\n  draw(ctx) {\n    this.grid.forEach((arr, i) => {\n      arr.forEach((space, j) => {\n        switch (space){\n          case 'z':\n          // ctx.fillStyle = \"red\";\n          ctx.drawImage(this.zombie,j*20,i*20,20,20);\n          // ctx.fillRect(j*20,i*20,20,20);\n          break;\n          case 'h':\n          // ctx.fillStyle = \"black\";\n          ctx.drawImage(this.human,j*20,i*20,20,20);\n          // ctx.fillRect(j*20,i*20,20,20);\n          break;\n          case 'b':\n          ctx.fillStyle = \"#fcfcfc\";\n          ctx.fillRect(j*20,i*20,20,20);\n          break;\n        }\n      });\n  });\n}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2dyaWQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L2dyaWQuanM/ZjVhMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuLy8gdmFyIGMgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbi8vIGMuZmlsbFN0eWxlID0gXCJyZWRcIjtcbi8vIGMuZmlsbFJlY3QoMCwwLDQwLDQwKTtcblxuXG5jbGFzcyBHcmlkIHtcbiAgY29uc3RydWN0b3Ioem9tYmllLCBodW1hbikge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuZ2VuZXJhdGVHcmlkKCk7XG4gICAgdGhpcy56b21iaWUgPSB6b21iaWU7XG4gICAgdGhpcy5odW1hbiA9IGh1bWFuO1xuICB9XG5cbmdlbmVyYXRlR3JpZCAoKSB7XG4gIGxldCBwbGFjZW1lbnQgPSBbJ3onLCdoJywnaCcsJ2gnLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InLCdiJywnYicsJ2InXTtcbiAgbGV0IGdyaWQgPSBbW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW10sW11dO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgIHdoaWxlIChncmlkW2ldLmxlbmd0aCA8IDQwKSB7XG4gICAgICAgIGxldCByYW5kb20gPSBwbGFjZW1lbnRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDApXTtcbiAgICAgICAgICAgIGdyaWRbaV0ucHVzaChyYW5kb20pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ3JpZDtcbn1cblxuICBnZXRNb3ZlcyhncmlkLHkseCkge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBpZiAoeSA+IDAgJiYgZ3JpZFt5LTFdW3hdID09PSAnYicpIHtyZXN1bHQucHVzaChbLTEsMF0pO31cbiAgICBpZiAoeSA8IDI5ICYmIGdyaWRbeSsxXVt4XSA9PT0gJ2InKSB7cmVzdWx0LnB1c2goWzEsMF0pO31cbiAgICBpZiAoeCA+IDAgJiYgZ3JpZFt5XVt4LTFdID09PSAnYicpIHtyZXN1bHQucHVzaChbMCwtMV0pO31cbiAgICBpZiAoeCA8IDM5ICYmIGdyaWRbeV1beCsxXSA9PT0gJ2InKSB7cmVzdWx0LnB1c2goWzAsMV0pO31cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICB0aGlzLmdyaWQuZm9yRWFjaCgoYXJyLCBpKSA9PiB7XG4gICAgICBhcnIuZm9yRWFjaCgoc3BhY2UsIGopID0+IHtcbiAgICAgICAgc3dpdGNoIChzcGFjZSl7XG4gICAgICAgICAgY2FzZSAneic6XG4gICAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnpvbWJpZSxqKjIwLGkqMjAsMjAsMjApO1xuICAgICAgICAgIC8vIGN0eC5maWxsUmVjdChqKjIwLGkqMjAsMjAsMjApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmh1bWFuLGoqMjAsaSoyMCwyMCwyMCk7XG4gICAgICAgICAgLy8gY3R4LmZpbGxSZWN0KGoqMjAsaSoyMCwyMCwyMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZjZmNmY1wiO1xuICAgICAgICAgIGN0eC5maWxsUmVjdChqKjIwLGkqMjAsMjAsMjApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./javascript/grid.js\n");

/***/ }),

/***/ "./javascript/outbreak.js":
/*!********************************!*\
  !*** ./javascript/outbreak.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./javascript/grid.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./javascript/game.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./javascript/util.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById('canvas');\n  const ctx = canvas.getContext('2d');\n  const zombie = document.getElementById('zombie');\n  const human = document.getElementById('human');\n  const grid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"](zombie, human);\n  const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"](grid,ctx);\n  const start = document.getElementById('start');\n  const pause = document.getElementById('pause');\n  const reset = document.getElementById('reset');\n\n  canvas.addEventListener(\"click\", (e) => {\n    const x = e.clientX - canvas.offsetLeft + 400;\n    const y = e.clientY - canvas.offsetTop + 300;\n    game.updateGrid(x,y);\n  });\n\n  start.addEventListener('click',() => {\n    if (_util__WEBPACK_IMPORTED_MODULE_2__[\"valueValidity\"](equalInfection, equalKill, equalEscape, personInfection,personKill, personEscape, zombieInfection, zombieKill, zombieEscape)) {\n      alert('All percentages for each row must add to equal 100!');\n      return;\n    }\n    if (parseInt(survivalFind.value) < 0 || parseInt(survivalFind.value) > 100){\n      alert('Survival Find must be between 0 and 100!');\n      return;\n    }\n\n    if (parseInt(simSpeed.value) < 0) {\n      alert('Speed Must be greater than 0');\n      return;\n    }\n\n    game.startSimulation(equalInfection, equalKill, personInfection,personKill, zombieInfection, zombieKill,survivalFind, simSpeed);\n  });\n\n  pause.addEventListener('click',() => {\n    game.pauseSimulation();\n  });\n\n  reset.addEventListener('click',() => {\n    game.resetSimulation();\n  });\n\n  const instructions = document.getElementById(\"instruction-background\");\n  const openI = document.getElementById(\"openI\");\n  const close = document.getElementById(\"close\");\n\n  openI.addEventListener(\"click\", () => {\n    instructions.style.display = \"block\";\n  });\n\n  close.addEventListener(\"click\", () =>{\n    instructions.style.display = \"none\";\n  });\n\n  window.addEventListener(\"click\", (e) => {\n    if (e.target === instructions){\n      instructions.style.display = \"none\";\n    } else if (e.target === customize){\n      customize.style.display = \"none\";\n    }\n  });\n\n  const customize = document.getElementById(\"customize-background\");\n  const openC = document.getElementById(\"openC\");\n  const closeC = document.getElementById(\"closeC\");\n\n  openC.addEventListener(\"click\", () => {\n    customize.style.display = \"block\";\n  });\n\n  closeC.addEventListener(\"click\", () =>{\n    customize.style.display = \"none\";\n  });\n\n  const equalInfection = document.getElementById('equalInfection');\n  equalInfection.value = 50;\n  const equalKill = document.getElementById('equalKill');\n  equalKill.value = 25;\n  const equalEscape = document.getElementById('equalEscape');\n  equalEscape.value = 25;\n\n  const personInfection = document.getElementById('personInfection');\n  personInfection.value = 30;\n  const personKill = document.getElementById('personKill');\n  personKill.value = 35;\n  const personEscape = document.getElementById('personEscape');\n  personEscape.value = 35;\n\n  const zombieInfection = document.getElementById('zombieInfection');\n  zombieInfection.value = 70;\n  const zombieKill = document.getElementById('zombieKill');\n  zombieKill.value = 15;\n  const zombieEscape = document.getElementById('zombieEscape');\n  zombieEscape.value = 15;\n\n  const survivalFind = document.getElementById('survivalFind');\n  survivalFind.value = .5;\n\n  const simSpeed = document.getElementById('simSpeed');\n  simSpeed.value = .1;\n\n  const resetSettings = document.getElementById('resetSettings');\n  resetSettings.addEventListener('click', () => {\n      equalInfection.value = 50;\n      equalKill.value = 25;\n      equalEscape.value = 25;\n      personInfection.value = 30;\n      personKill.value = 35;\n      personEscape.value = 35;\n      zombieInfection.value = 70;\n      zombieKill.value = 15;\n      zombieEscape.value = 15;\n      survivalFind.value = .5;\n      simSpeed.value = .1;\n  });\n\n\n\n\n\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L291dGJyZWFrLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9vdXRicmVhay5qcz84MTA3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHcmlkIGZyb20gJy4vZ3JpZCc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0ICogYXMgVXRpbCBmcm9tICcuL3V0aWwnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IHpvbWJpZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b21iaWUnKTtcbiAgY29uc3QgaHVtYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtYW4nKTtcbiAgY29uc3QgZ3JpZCA9IG5ldyBHcmlkKHpvbWJpZSwgaHVtYW4pO1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ3JpZCxjdHgpO1xuICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICBjb25zdCBwYXVzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXVzZScpO1xuICBjb25zdCByZXNldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQgKyA0MDA7XG4gICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGNhbnZhcy5vZmZzZXRUb3AgKyAzMDA7XG4gICAgZ2FtZS51cGRhdGVHcmlkKHgseSk7XG4gIH0pO1xuXG4gIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgaWYgKFV0aWwudmFsdWVWYWxpZGl0eShlcXVhbEluZmVjdGlvbiwgZXF1YWxLaWxsLCBlcXVhbEVzY2FwZSwgcGVyc29uSW5mZWN0aW9uLHBlcnNvbktpbGwsIHBlcnNvbkVzY2FwZSwgem9tYmllSW5mZWN0aW9uLCB6b21iaWVLaWxsLCB6b21iaWVFc2NhcGUpKSB7XG4gICAgICBhbGVydCgnQWxsIHBlcmNlbnRhZ2VzIGZvciBlYWNoIHJvdyBtdXN0IGFkZCB0byBlcXVhbCAxMDAhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYXJzZUludChzdXJ2aXZhbEZpbmQudmFsdWUpIDwgMCB8fCBwYXJzZUludChzdXJ2aXZhbEZpbmQudmFsdWUpID4gMTAwKXtcbiAgICAgIGFsZXJ0KCdTdXJ2aXZhbCBGaW5kIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhcnNlSW50KHNpbVNwZWVkLnZhbHVlKSA8IDApIHtcbiAgICAgIGFsZXJ0KCdTcGVlZCBNdXN0IGJlIGdyZWF0ZXIgdGhhbiAwJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2FtZS5zdGFydFNpbXVsYXRpb24oZXF1YWxJbmZlY3Rpb24sIGVxdWFsS2lsbCwgcGVyc29uSW5mZWN0aW9uLHBlcnNvbktpbGwsIHpvbWJpZUluZmVjdGlvbiwgem9tYmllS2lsbCxzdXJ2aXZhbEZpbmQsIHNpbVNwZWVkKTtcbiAgfSk7XG5cbiAgcGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICBnYW1lLnBhdXNlU2ltdWxhdGlvbigpO1xuICB9KTtcblxuICByZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgIGdhbWUucmVzZXRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5zdHJ1Y3Rpb24tYmFja2dyb3VuZFwiKTtcbiAgY29uc3Qgb3BlbkkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5JXCIpO1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VcIik7XG5cbiAgb3BlbkkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfSk7XG5cbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGluc3RydWN0aW9ucyl7XG4gICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgPT09IGN1c3RvbWl6ZSl7XG4gICAgICBjdXN0b21pemUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgY3VzdG9taXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXN0b21pemUtYmFja2dyb3VuZFwiKTtcbiAgY29uc3Qgb3BlbkMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5DXCIpO1xuICBjb25zdCBjbG9zZUMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlQ1wiKTtcblxuICBvcGVuQy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGN1c3RvbWl6ZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9KTtcblxuICBjbG9zZUMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIGN1c3RvbWl6ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIGNvbnN0IGVxdWFsSW5mZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VxdWFsSW5mZWN0aW9uJyk7XG4gIGVxdWFsSW5mZWN0aW9uLnZhbHVlID0gNTA7XG4gIGNvbnN0IGVxdWFsS2lsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcXVhbEtpbGwnKTtcbiAgZXF1YWxLaWxsLnZhbHVlID0gMjU7XG4gIGNvbnN0IGVxdWFsRXNjYXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VxdWFsRXNjYXBlJyk7XG4gIGVxdWFsRXNjYXBlLnZhbHVlID0gMjU7XG5cbiAgY29uc3QgcGVyc29uSW5mZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlcnNvbkluZmVjdGlvbicpO1xuICBwZXJzb25JbmZlY3Rpb24udmFsdWUgPSAzMDtcbiAgY29uc3QgcGVyc29uS2lsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwZXJzb25LaWxsJyk7XG4gIHBlcnNvbktpbGwudmFsdWUgPSAzNTtcbiAgY29uc3QgcGVyc29uRXNjYXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlcnNvbkVzY2FwZScpO1xuICBwZXJzb25Fc2NhcGUudmFsdWUgPSAzNTtcblxuICBjb25zdCB6b21iaWVJbmZlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9tYmllSW5mZWN0aW9uJyk7XG4gIHpvbWJpZUluZmVjdGlvbi52YWx1ZSA9IDcwO1xuICBjb25zdCB6b21iaWVLaWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbWJpZUtpbGwnKTtcbiAgem9tYmllS2lsbC52YWx1ZSA9IDE1O1xuICBjb25zdCB6b21iaWVFc2NhcGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9tYmllRXNjYXBlJyk7XG4gIHpvbWJpZUVzY2FwZS52YWx1ZSA9IDE1O1xuXG4gIGNvbnN0IHN1cnZpdmFsRmluZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdXJ2aXZhbEZpbmQnKTtcbiAgc3Vydml2YWxGaW5kLnZhbHVlID0gLjU7XG5cbiAgY29uc3Qgc2ltU3BlZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2ltU3BlZWQnKTtcbiAgc2ltU3BlZWQudmFsdWUgPSAuMTtcblxuICBjb25zdCByZXNldFNldHRpbmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0U2V0dGluZ3MnKTtcbiAgcmVzZXRTZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGVxdWFsSW5mZWN0aW9uLnZhbHVlID0gNTA7XG4gICAgICBlcXVhbEtpbGwudmFsdWUgPSAyNTtcbiAgICAgIGVxdWFsRXNjYXBlLnZhbHVlID0gMjU7XG4gICAgICBwZXJzb25JbmZlY3Rpb24udmFsdWUgPSAzMDtcbiAgICAgIHBlcnNvbktpbGwudmFsdWUgPSAzNTtcbiAgICAgIHBlcnNvbkVzY2FwZS52YWx1ZSA9IDM1O1xuICAgICAgem9tYmllSW5mZWN0aW9uLnZhbHVlID0gNzA7XG4gICAgICB6b21iaWVLaWxsLnZhbHVlID0gMTU7XG4gICAgICB6b21iaWVFc2NhcGUudmFsdWUgPSAxNTtcbiAgICAgIHN1cnZpdmFsRmluZC52YWx1ZSA9IC41O1xuICAgICAgc2ltU3BlZWQudmFsdWUgPSAuMTtcbiAgfSk7XG5cblxuXG5cblxufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/outbreak.js\n");

/***/ }),

/***/ "./javascript/survival.js":
/*!********************************!*\
  !*** ./javascript/survival.js ***!
  \********************************/
/*! exports provided: getZombies, getHumans */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getZombies\", function() { return getZombies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHumans\", function() { return getHumans; });\nconst getZombies = (grid,y,x) => {\n  let zombies = [];\n  if (y > 0 && grid[y-1][x] === 'z') {zombies.push([y-1,x]);}\n  if (y < 29 && grid[y+1][x] === 'z') {zombies.push([y+1,x]);}\n  if (x > 0 && grid[y][x-1] === 'z') {zombies.push([y,x-1]);}\n  if (x < 39 && grid[y][x+1] === 'z') {zombies.push([y,x+1]);}\n  return zombies;\n};\n\nconst getHumans = (grid,y,x) => {\n  let humans = [];\n  if (y > 0 && grid[y-1][x] === 'h') {humans.push([y-1,x]);}\n  if (y < 29 && grid[y+1][x] === 'h') {humans.push([y+1,x]);}\n  if (x > 0 && grid[y][x-1] === 'h') {humans.push([y,x-1]);}\n  if (x < 39 && grid[y][x+1] === 'h') {humans.push([y,x+1]);}\n  return humans;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L3N1cnZpdmFsLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9zdXJ2aXZhbC5qcz9kODkyIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXRab21iaWVzID0gKGdyaWQseSx4KSA9PiB7XG4gIGxldCB6b21iaWVzID0gW107XG4gIGlmICh5ID4gMCAmJiBncmlkW3ktMV1beF0gPT09ICd6Jykge3pvbWJpZXMucHVzaChbeS0xLHhdKTt9XG4gIGlmICh5IDwgMjkgJiYgZ3JpZFt5KzFdW3hdID09PSAneicpIHt6b21iaWVzLnB1c2goW3krMSx4XSk7fVxuICBpZiAoeCA+IDAgJiYgZ3JpZFt5XVt4LTFdID09PSAneicpIHt6b21iaWVzLnB1c2goW3kseC0xXSk7fVxuICBpZiAoeCA8IDM5ICYmIGdyaWRbeV1beCsxXSA9PT0gJ3onKSB7em9tYmllcy5wdXNoKFt5LHgrMV0pO31cbiAgcmV0dXJuIHpvbWJpZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SHVtYW5zID0gKGdyaWQseSx4KSA9PiB7XG4gIGxldCBodW1hbnMgPSBbXTtcbiAgaWYgKHkgPiAwICYmIGdyaWRbeS0xXVt4XSA9PT0gJ2gnKSB7aHVtYW5zLnB1c2goW3ktMSx4XSk7fVxuICBpZiAoeSA8IDI5ICYmIGdyaWRbeSsxXVt4XSA9PT0gJ2gnKSB7aHVtYW5zLnB1c2goW3krMSx4XSk7fVxuICBpZiAoeCA+IDAgJiYgZ3JpZFt5XVt4LTFdID09PSAnaCcpIHtodW1hbnMucHVzaChbeSx4LTFdKTt9XG4gIGlmICh4IDwgMzkgJiYgZ3JpZFt5XVt4KzFdID09PSAnaCcpIHtodW1hbnMucHVzaChbeSx4KzFdKTt9XG4gIHJldHVybiBodW1hbnM7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/survival.js\n");

/***/ }),

/***/ "./javascript/util.js":
/*!****************************!*\
  !*** ./javascript/util.js ***!
  \****************************/
/*! exports provided: valueValidity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"valueValidity\", function() { return valueValidity; });\nconst valueValidity = (equalInfection, equalKill, equalEscape, personInfection,personKill, personEscape, zombieInfection, zombieKill, zombieEscape) => {\n\nif(parseInt(equalInfection.value) + parseInt(equalKill.value) + parseInt(equalEscape.value) !== 100 || parseInt(personInfection.value) + parseInt(personKill.value) + parseInt(personEscape.value) !== 100 || parseInt(zombieInfection.value) + parseInt(zombieKill.value) + parseInt(zombieEscape.value) !== 100) {\n  return true;\n}\nreturn false;\n};\n\n// export const circle = (ctx,x,y) => {\n//     ctx.beginPath();\n//     ctx.arc(x, y, 20, 0, 2 * Math.PI);\n//     ctx.stroke();\n// };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L3V0aWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L3V0aWwuanM/NDM4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdmFsdWVWYWxpZGl0eSA9IChlcXVhbEluZmVjdGlvbiwgZXF1YWxLaWxsLCBlcXVhbEVzY2FwZSwgcGVyc29uSW5mZWN0aW9uLHBlcnNvbktpbGwsIHBlcnNvbkVzY2FwZSwgem9tYmllSW5mZWN0aW9uLCB6b21iaWVLaWxsLCB6b21iaWVFc2NhcGUpID0+IHtcblxuaWYocGFyc2VJbnQoZXF1YWxJbmZlY3Rpb24udmFsdWUpICsgcGFyc2VJbnQoZXF1YWxLaWxsLnZhbHVlKSArIHBhcnNlSW50KGVxdWFsRXNjYXBlLnZhbHVlKSAhPT0gMTAwIHx8IHBhcnNlSW50KHBlcnNvbkluZmVjdGlvbi52YWx1ZSkgKyBwYXJzZUludChwZXJzb25LaWxsLnZhbHVlKSArIHBhcnNlSW50KHBlcnNvbkVzY2FwZS52YWx1ZSkgIT09IDEwMCB8fCBwYXJzZUludCh6b21iaWVJbmZlY3Rpb24udmFsdWUpICsgcGFyc2VJbnQoem9tYmllS2lsbC52YWx1ZSkgKyBwYXJzZUludCh6b21iaWVFc2NhcGUudmFsdWUpICE9PSAxMDApIHtcbiAgcmV0dXJuIHRydWU7XG59XG5yZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBleHBvcnQgY29uc3QgY2lyY2xlID0gKGN0eCx4LHkpID0+IHtcbi8vICAgICBjdHguYmVnaW5QYXRoKCk7XG4vLyAgICAgY3R4LmFyYyh4LCB5LCAyMCwgMCwgMiAqIE1hdGguUEkpO1xuLy8gICAgIGN0eC5zdHJva2UoKTtcbi8vIH07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./javascript/util.js\n");

/***/ })

/******/ });