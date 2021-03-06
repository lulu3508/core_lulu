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
hosts["docs.google"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var id, urlEmbed, html, parse, fmt_stream_map, status, listLink, i, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = url.match(/\/d\/([^\/]+)/i);
                id = id ? id[1] : '';
                urlEmbed = "https://docs.google.com/get_video_info?docid=" + id + "&authuser=0";
                return [4, libs.request_get(urlEmbed, {
                        "User-Agent": libs.request_getRandomUserAgent(),
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                        'Cache-Control': 'max-age=0',
                        'Connection': 'keep-alive',
                        'Host': 'docs.google.com',
                        'Upgrade-Insecure-Requests': 1,
                    }, "html")];
            case 1:
                html = _a.sent();
                parse = qs.parse(html);
                fmt_stream_map = parse.fmt_stream_map, status = parse.status;
                console.log(fmt_stream_map, status, parse, "-------- GOOGLE DOCS STREAM --------");
                listLink = fmt_stream_map.split(",");
                for (i = 0; i < listLink.length; i++) {
                    file = decodeURIComponent(listLink[i].substring(3));
                    if (listLink[i].indexOf("18|") == 0) {
                        callback({
                            file: file,
                            size: "",
                            quality: "360p",
                            host: "GOOGLE.VIDEO",
                            provider: config.provider
                        });
                    }
                    if (listLink[i].indexOf("22|") == 0) {
                        callback({
                            file: file,
                            size: "",
                            quality: "720p",
                            host: "Google Video",
                            provider: config.provider
                        });
                    }
                    if (listLink[i].indexOf("59|") == 0) {
                        callback({
                            file: file,
                            size: "",
                            quality: "480p",
                            host: "Google Video",
                            provider: config.provider
                        });
                    }
                    if (listLink[i].indexOf("37|") == 0) {
                        callback({
                            file: file,
                            size: "",
                            quality: "1080p",
                            host: "Google Video",
                            provider: config.provider
                        });
                    }
                }
                return [2];
        }
    });
}); };
