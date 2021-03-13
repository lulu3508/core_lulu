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
    var domain, urlGetLink, urlSearch, htmlSearch, parseSearch, link, linkDetail, htmlTv, parseTv_1, htmlDetail, parseDetailTv, embedIds, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://5movies.to";
                urlGetLink = "https://5movies.to/getlink.php";
                urlSearch = domain + "/search.php?q=" + slugify(movieInfo.title.toLowerCase(), { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(urlSearch, parseSearch('.movie-list').length, '------- 5Movies Search Info --------');
                parseSearch('.movie-list').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.ml-data h1 a').text();
                    var href = "https:" + parseSearch(itemSearch).find('.ml-data h1 a').attr("href");
                    var year = title.match(/\( *([0-9]+) * \)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "");
                    if (href && _.startsWith(href.trim(), "/")) {
                        href = "https:" + href;
                    }
                    console.log(title, href, year, slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }), '------------- 5Movies SEARCH DATA --------');
                    if (slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g })) {
                        if (movieInfo.type == "movie" && (year == movieInfo.year || !year)) {
                            link = href;
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, '------ 5Movies link');
                if (!link) {
                    return [2];
                }
                linkDetail = "";
                if (!(movieInfo.type == "tv")) return [3, 3];
                return [4, libs.request_get(link)];
            case 2:
                htmlTv = _a.sent();
                parseTv_1 = cheerio.load(htmlTv);
                console.log(parseTv_1("ul[data-id=" + movieInfo.season + "] li").length, '------- 5Movie Tv Length');
                parseTv_1("ul[data-id=" + movieInfo.season + "] li").each(function (keySeason, itemSeason) {
                    var episodeInfo = parseTv_1(itemSeason).find('a').text();
                    var hrefTv = "https:" + parseTv_1(itemSeason).find('a').attr("href");
                    console.log(episodeInfo, hrefTv, '-------- 5Movie TV Info');
                    if (episodeInfo) {
                        episodeInfo = episodeInfo.toLowerCase().match(/episode *([0-9.,]+)/i);
                        var episode = episodeInfo ? episodeInfo[1] : 0;
                        console.log(episode, hrefTv, '-------- 5Movie TV Episode');
                        if (episode == movieInfo.episode) {
                            linkDetail = hrefTv;
                        }
                    }
                });
                return [3, 4];
            case 3:
                linkDetail = link;
                _a.label = 4;
            case 4:
                console.log(linkDetail, '--------- 5Movie Link Detail');
                if (!linkDetail) {
                    return [2];
                }
                return [4, libs.request_get(linkDetail)];
            case 5:
                htmlDetail = _a.sent();
                parseDetailTv = cheerio.load(htmlDetail);
                embedIds = [];
                console.log(parseDetailTv(".links .link-button").length, '-------- 5Movie List Link');
                parseDetailTv(".links .link-button").each(function (keyDetail, itemDetail) {
                    var hrefEmbed = parseDetailTv(itemDetail).find("a").attr("href");
                    if (hrefEmbed) {
                        embedIds.push(hrefEmbed.replace("?lk=", ""));
                    }
                });
                arrMap = embedIds.map(function (embedItem) { return __awaiter(_this, void 0, void 0, function () {
                    var embedData, embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_post(urlGetLink + "?Action=get&lk=" + embedItem, {}, {}, 'html')];
                            case 1:
                                embedData = _a.sent();
                                embed = "";
                                if (embedData && _.startsWith(embedData.trim(), "h")) {
                                    embed = embedData;
                                }
                                else if (embedData && _.startsWith(embedData.trim(), "/")) {
                                    embed = "https:" + embedData;
                                }
                                console.log(embed, "----- 5Movie embed--------------------");
                                if (!embed) return [3, 3];
                                return [4, libs.request_getFileSize(embed)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "5Movies" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "5Movies"
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 6:
                _a.sent();
                return [2];
        }
    });
}); };
