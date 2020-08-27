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
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var url, resultSearch, link, _i, resultSearch_1, item, title, year, type, htmlDetail, parseDetail, iframe, htmlIframe, parseIframe_1, lengthServer, linkIframeRedirect, sourceToken_1, urlSource_1, headers_1, linkEmbeds, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://putlocker123.me/typeahead/" + slugify(movieInfo.title, { lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(url, {}, 'json')];
            case 1:
                resultSearch = _a.sent();
                resultSearch = resultSearch ? resultSearch : [];
                link = "";
                console.log(url, resultSearch, "----------- PUTLOCKER SEARCH RESULT ----------");
                for (_i = 0, resultSearch_1 = resultSearch; _i < resultSearch_1.length; _i++) {
                    item = resultSearch_1[_i];
                    title = item.title;
                    year = item.release_date;
                    year = year.match(/([0-9]+)/i);
                    year = year ? year[0] : 0;
                    type = item.type;
                    console.log(title, year, type, "----------- PUTLOCKER SEARCH INFO ----------");
                    if (slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g })) {
                        if (type && type.toLowerCase() == 'movie' && movieInfo.type == "movie" && year == movieInfo.year) {
                            link = item.link;
                            break;
                        }
                        if (type && type.toLowerCase() == 'series' && movieInfo.type == 'tv') {
                            link = item.link;
                            break;
                        }
                    }
                }
                console.log(link, "----------- PUTLOCKER LINK ----------");
                if (!link) return [3, 7];
                if (movieInfo.type == 'tv') {
                    link += "/seasons/" + movieInfo.season + "/episodes/" + movieInfo.episode;
                }
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                iframe = parseDetail("iframe").attr("src");
                console.log(iframe, "----------- PUTLOCKER IFRAME DETAIL ----------");
                if (!iframe) return [3, 7];
                return [4, libs.request_get(iframe)];
            case 3:
                htmlIframe = _a.sent();
                parseIframe_1 = cheerio.load(htmlIframe);
                lengthServer = parseIframe_1(".server .btnt").length;
                if (!(lengthServer === 0)) return [3, 5];
                linkIframeRedirect = parseIframe_1("iframe").attr("src");
                return [4, libs.request_get(linkIframeRedirect)];
            case 4:
                htmlIframe = _a.sent();
                parseIframe_1 = cheerio.load(htmlIframe);
                _a.label = 5;
            case 5:
                sourceToken_1 = [];
                console.log(parseIframe_1(".server .btnt").length, "----------- PUTLOCKER SERVER LENGTH ----------");
                parseIframe_1(".server .btnt").each(function (keyIframe, itemIframe) {
                    var dataId = parseIframe_1(itemIframe).attr("data-id");
                    var dataServer = parseIframe_1(itemIframe).attr("data-server");
                    if (dataId && dataServer) {
                        sourceToken_1.push({
                            id: dataId,
                            server: dataServer
                        });
                    }
                });
                console.log(sourceToken_1, "----------- PUTLOCKER SOURCE TOKEN ----------");
                urlSource_1 = "https://putlocker123.me/playerv1/result.php";
                headers_1 = {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                };
                linkEmbeds = [];
                arrMap = sourceToken_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var body, resultSource, parseSource, embedSource, htmlEmbed, parseEmbed, embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = qs.stringify({
                                    id: item.id,
                                    server: item.server
                                });
                                return [4, libs.request_post(urlSource_1, headers_1, body)];
                            case 1:
                                resultSource = _a.sent();
                                parseSource = cheerio.load(resultSource);
                                embedSource = parseSource('iframe').attr('src');
                                console.log(url, headers_1, body, embedSource, "----------- PUTLOCKER EMBED SOURCE ----------");
                                if (!embedSource) return [3, 4];
                                return [4, libs.request_get(embedSource)];
                            case 2:
                                htmlEmbed = _a.sent();
                                parseEmbed = cheerio.load(htmlEmbed);
                                embed = parseEmbed("iframe").attr("src");
                                if (!embed) return [3, 4];
                                return [4, libs.request_getFileSize(embed)];
                            case 3:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "PUTLOCKER" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "PUTLOCKER"
                                    });
                                }
                                _a.label = 4;
                            case 4: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2];
        }
    });
}); };
