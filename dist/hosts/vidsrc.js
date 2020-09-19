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
hosts["vidsrc"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var urlReal, htmlDetail, parseDetail, tokens, headers, urlEmbed, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlReal = url.replace('vidsrc', 'v2.vidsrc');
                return [4, libs.request_get(urlReal)];
            case 1:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                tokens = [];
                parseDetail(".source").each(function (key, item) {
                    var token = parseDetail(item).attr("data-hash");
                    if (token) {
                        tokens.push(token);
                    }
                });
                headers = {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                };
                urlEmbed = "https://vidsrc.xyz/api/source/jlr1yid6e8pl2mx";
                arrMap = tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                    var urlToken, body, result, embeds, _i, embeds_1, embed;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlToken = "https://v2.vidsrc.me/src/" + token;
                                body = qs.stringify({
                                    r: urlToken,
                                    d: 'vidsrc.xyz'
                                });
                                return [4, libs.request_post(urlEmbed, headers, body, 'json')];
                            case 1:
                                result = _a.sent();
                                embeds = result && result.data ? result.data : [];
                                for (_i = 0, embeds_1 = embeds; _i < embeds_1.length; _i++) {
                                    embed = embeds_1[_i];
                                    callback({
                                        file: embed.file,
                                        size: 0,
                                        host: "VIDSRC",
                                        quality: embed.label,
                                        provider: config.provider
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };