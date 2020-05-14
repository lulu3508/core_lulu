var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var _this = this;
hosts["vidcloud9"] = function (movieInfo, url, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var vidCloudAjax, urlMatch, headers, json, _a, _b, _i, item, file, fileSize, _c, _d, _e, item, file, fileSize;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                vidCloudAjax = "https://vidcloud9.com/ajax.php";
                urlMatch = url.replace("https://vidcloud9.com/load.php", url);
                urlMatch = url.replace("https://vidcloud9.com/streaming.php", url);
                headers = {
                    "x-requested-with": "XMLHttpRequest"
                };
                return [4, libs.request_get(url, headers, "json")];
            case 1:
                json = _f.sent();
                _a = [];
                for (_b in json.source)
                    _a.push(_b);
                _i = 0;
                _f.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3, 5];
                item = _a[_i];
                file = json.source[item].file;
                return [4, libs.request_getFileSize(file)];
            case 3:
                fileSize = _f.sent();
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: "VIDCLOUD9",
                        provider: "123MOVIES"
                    });
                }
                _f.label = 4;
            case 4:
                _i++;
                return [3, 2];
            case 5:
                _c = [];
                for (_d in json.source_bk)
                    _c.push(_d);
                _e = 0;
                _f.label = 6;
            case 6:
                if (!(_e < _c.length)) return [3, 9];
                item = _c[_e];
                file = json.source_bk[item].file;
                return [4, libs.request_getFileSize(file)];
            case 7:
                fileSize = _f.sent();
                if (fileSize > 0) {
                    callback({
                        file: file,
                        size: fileSize,
                        host: "VIDCLOUD9",
                        provider: "123MOVIES"
                    });
                }
                _f.label = 8;
            case 8:
                _e++;
                return [3, 6];
            case 9: return [2];
        }
    });
}); };
