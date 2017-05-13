"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mem = require("mem");
var Bimage = (function () {
    function Bimage(path, attr) {
        this.path = path;
        this.attr = attr;
        // Automatically load the image from path given
        this.load();
    }
    /**
     * Load image from given path
     *
     * @returns
     *
     * @memberof Bimage
     */
    Bimage.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loader, memoize, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        loader = function (path) { return new Promise(function (resolve, reject) {
                            var image = new Image();
                            image.crossOrigin = 'Anonymous'; // To hijack the CORS if possible
                            image.onload = function () { return resolve(image); };
                            // Set attribute to image
                            if (_this.attr) {
                                Object.keys(_this.attr).forEach(function (attrName) {
                                    var attrValue = _this.attr[attrName];
                                    if (attrValue) {
                                        image.setAttribute(attrName, String(attrValue));
                                    }
                                });
                            }
                            image.src = path;
                        }); };
                        memoize = mem(loader);
                        _a = this;
                        return [4 /*yield*/, memoize(this.path)];
                    case 1:
                        _a.image = _b.sent();
                        return [2 /*return*/, this.image];
                }
            });
        });
    };
    /**
     * Get base64 data from image
     *
     * @returns
     *
     * @memberof Bimage
     */
    Bimage.prototype.base64 = function () {
        try {
            var canvas = document.createElement('canvas');
            canvas.height = this.height;
            canvas.width = this.width;
            var context = canvas.getContext('2d');
            if (context) {
                context.drawImage(this.image, 0, 0);
            }
            return canvas.toDataURL('image/jpeg');
        }
        catch (e) {
            throw new Error("Bimage: " + e);
        }
    };
    Object.defineProperty(Bimage.prototype, "width", {
        /**
         * Get image width
         *
         * @readonly
         *
         * @memberof Bimage
         */
        get: function () {
            return this.image.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bimage.prototype, "height", {
        /**
         * Get image height
         *
         * @readonly
         *
         * @memberof Bimage
         */
        get: function () {
            return this.image.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bimage.prototype, "node", {
        /**
         * Get image element node
         *
         * @readonly
         *
         * @memberof Bimage
         */
        get: function () {
            return this.image;
        },
        enumerable: true,
        configurable: true
    });
    return Bimage;
}());
if (typeof window) {
    window.Bimage = Bimage;
}
else if (typeof global) {
    global.Bimage = Bimage;
}
module.exports = Bimage;
