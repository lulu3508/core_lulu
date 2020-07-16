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
    var urlSearch, resultSearch, link, _i, resultSearch_1, item, title, linkDetail_1, htmlDetail, parseDetail_1, htmlEpisode, parseEpisode_1, sources_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (movieInfo.type == 'movie') {
                    return [2];
                }
                urlSearch = "https://www.watchepisodes4.com/search/ajax_search?q=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch, {}, 'json')];
            case 1:
                resultSearch = _a.sent();
                resultSearch = resultSearch.series ? resultSearch.series : [];
                console.log(urlSearch, resultSearch, "--------------- WATCHEPISODE SEARCH INFO -----------");
                link = '';
                for (_i = 0, resultSearch_1 = resultSearch; _i < resultSearch_1.length; _i++) {
                    item = resultSearch_1[_i];
                    title = item.label;
                    if (slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g })) {
                        link = item.seo;
                    }
                }
                console.log(link, "--------------- WATCHEPISODE LINK -----------");
                if (!(link != "")) return [3, 5];
                link = "https://www.watchepisodes4.com/" + link;
                linkDetail_1 = "";
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                console.log(link, parseDetail_1(".el-item").length, "--------------- WATCHEPISODE ITEM SEASON -----------");
                parseDetail_1(".el-item").each(function (keyDetail, itemDetail) {
                    var season = parseDetail_1(itemDetail).find(".season").text();
                    season = season.match(/([0-9]+)/i);
                    season = season ? season[1] : 0;
                    var episode = parseDetail_1(itemDetail).find(".episode").text();
                    episode = episode.match(/([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    console.log(season, episode, "--------------- WATCHEPISODE SEASON EPISODE -----------");
                    if (season == movieInfo.season && episode == movieInfo.episode) {
                        linkDetail_1 = parseDetail_1(itemDetail).find("a").attr("href");
                    }
                });
                console.log(linkDetail_1, "--------------- WATCHEPISODE LINK DETAIL -----------");
                if (!(linkDetail_1 != "")) return [3, 5];
                return [4, libs.request_get(linkDetail_1)];
            case 3:
                htmlEpisode = _a.sent();
                parseEpisode_1 = cheerio.load(htmlEpisode);
                sources_1 = [];
                console.log(parseEpisode_1(".site-link").length, "--------------- WATCHEPISODE SITE LINK LENGTH -----------");
                parseEpisode_1(".site-link").each(function (keyEpisode, itemEpisode) {
                    var hrefEpisode = parseEpisode_1(itemEpisode).attr("href");
                    if (hrefEpisode) {
                        sources_1.push(hrefEpisode);
                    }
                });
                console.log(sources_1, "--------------- WATCHEPISODE SOURCES -----------");
                arrMap = sources_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var htmlEmbed, parseEmbed, embed, fileSize, host, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                return [4, libs.request_get(item)];
                            case 1:
                                htmlEmbed = _a.sent();
                                parseEmbed = cheerio.load(htmlEmbed);
                                embed = parseEmbed(".detail-w-button").attr("data-actuallink");
                                console.log(embed, "--------------- WATCHEPISODE EMBED -----------");
                                if (!embed) return [3, 3];
                                return [4, libs.request_getFileSize(embed)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "WATCHEPISODE" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "WATCHEPISODE"
                                    });
                                }
                                _a.label = 3;
                            case 3: return [3, 5];
                            case 4:
                                e_1 = _a.sent();
                                return [3, 5];
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2];
        }
    });
}); };
