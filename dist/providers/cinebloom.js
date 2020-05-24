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
    var url, link, parse, parseDetail_1, sources_1, arrMap, linkTv_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "";
                if (movieInfo.type == "movie") {
                    url = "https://www.cinebloom.org/searched/movies?q=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                else {
                    url = "https://www.cinebloom.org/searched/tvshows?q=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                link = "";
                return [4, libs.request_getcaptcha(url, {}, "cheerio")];
            case 1:
                parse = _a.sent();
                console.log(parse(".grid-view.clearfix li").length, '--------- CINEBLOOM SEARCH PARSE ------');
                parse(".grid-view.clearfix li").each(function (key, item) {
                    var href = parse(item).find("a").first().attr("href");
                    var title = parse(item).find(".information .title strong").text();
                    var year = title.match(/\(([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    console.log(href, title, year, slugify(movieInfo.title, { lower: true }), slugify(title.trim(), { lower: true }), "---------- CINEBLOOM INFO MOVIE -----------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && year == movieInfo.year) {
                            link = href;
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, "--------------- CINEBLOOM LINK -----------");
                if (!(link != "")) return [3, 6];
                return [4, libs.request_getcaptcha(link, {}, "cheerio")];
            case 2:
                parseDetail_1 = _a.sent();
                if (!(movieInfo.type == "movie")) return [3, 4];
                sources_1 = [];
                console.log(parseDetail_1(".embed-details").length, "--------------- CINEBLOOM EMBED -----------");
                parseDetail_1(".embed-details").each(function (key, item) {
                    var href = parseDetail_1(item).find("a").attr("href");
                    sources_1.push(href);
                });
                console.log(sources_1, "--------------- CINEBLOOM EMBED -----------");
                arrMap = sources_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var loadSource_1, htmlCinema, token_1, parseCinema_1, sourceCinema_1, arrCinema, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 5];
                                if (!(embed.toLowerCase().trim().indexOf("cinebloom") != -1)) return [3, 3];
                                loadSource_1 = "https://oload.party/loadsource.php";
                                return [4, libs.request_getcaptcha(embed, {})];
                            case 1:
                                htmlCinema = _a.sent();
                                token_1 = htmlCinema.match(/token *\= *\"([^\"]+)/i);
                                token_1 = token_1 ? token_1[1] : "";
                                parseCinema_1 = cheerio.load(htmlCinema);
                                sourceCinema_1 = [];
                                console.log(htmlCinema, parseCinema_1(".item").length, embed, "--------- CINEBLOOM ITEM EMBED ---------");
                                parseCinema_1(".item").each(function (keyCinema, itemCinema) {
                                    var server = parseCinema_1(itemCinema).attr("data-server");
                                    sourceCinema_1.push(loadSource_1 + "?server=" + server + "&token=" + token_1);
                                });
                                console.log(sourceCinema_1, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------");
                                arrCinema = sourceCinema_1.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(itemCinema, {})];
                                            case 1:
                                                htmlLoadSource = _a.sent();
                                                parseLoadSource = cheerio.load(htmlLoadSource);
                                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                                host = libs.string_getHost(iframeLoadSource);
                                                if (hosts[host]) {
                                                    hosts[host](iframeLoadSource, movieInfo, _merge(config, { provider: "CINEBLOOM" }), callback);
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrCinema)];
                            case 2:
                                _a.sent();
                                return [3, 5];
                            case 3: return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _merge(config, { provider: "CINEBLOOM" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "CINEBLOOM"
                                    });
                                }
                                _a.label = 5;
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(movieInfo.type == "tv")) return [3, 6];
                linkTv_1 = [];
                console.log(parseDetail_1(".season").length, "--------------- CINEBLOOM SEASON -----------");
                parseDetail_1(".season").each(function (keySeason, itemSeason) {
                    var season = parseDetail_1(itemSeason).find(".title").text();
                    season = season.toLowerCase().match(/season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    console.log(season, movieInfo.season, "--------------- CINEBLOOM SEASON INFO -----------");
                    if (season == movieInfo.season) {
                        console.log(parseDetail_1(itemSeason).length, "--------------- CINEBLOOM episode -----------");
                        parseDetail_1(itemSeason).find(".episodes li").each(function (keyEpisode, itemEpisode) {
                            var episode = parseDetail_1(itemEpisode).find("h5").text();
                            episode = episode.toLowerCase().match(/ep *([0-9]+)/i);
                            episode = episode ? episode[1] : 0;
                            console.log(episode, movieInfo.episode, "--------------- CINEBLOOM episode info -----------");
                            if (episode == movieInfo.episode) {
                                parseDetail_1(itemEpisode).find(".streams-list li").each(function (keyS, itemS) {
                                    var hrefTv = parseDetail_1(itemS).find("a").attr("href");
                                    linkTv_1.push(hrefTv);
                                });
                            }
                        });
                    }
                });
                console.log(linkTv_1, "--------------- CINEBLOOM episode embed link -----------");
                arrMap = linkTv_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var loadSource_2, htmlCinema, token_2, parseCinema_2, sourceCinema_2, arrCinema, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 5];
                                console.log(embed, embed.toLowerCase().trim().indexOf("cinebloom") != -1, "--------- CINEBLOOM ITEM OLOAD ---------");
                                if (!(embed.toLowerCase().trim().indexOf("cinebloom") != -1)) return [3, 3];
                                loadSource_2 = "https://oload.party/loadsource.php";
                                return [4, libs.request_getcaptcha(embed, {})];
                            case 1:
                                htmlCinema = _a.sent();
                                token_2 = htmlCinema.match(/token *\= *\"([^\"]+)/i);
                                token_2 = token_2 ? token_2[1] : "";
                                parseCinema_2 = cheerio.load(htmlCinema);
                                sourceCinema_2 = [];
                                console.log(parseCinema_2(".item").length, "--------- CINEBLOOM ITEM EMBED ---------");
                                parseCinema_2(".item").each(function (keyCinema, itemCinema) {
                                    var server = parseCinema_2(itemCinema).attr("data-server");
                                    sourceCinema_2.push(loadSource_2 + "?server=" + server + "&token=" + token_2);
                                });
                                console.log(sourceCinema_2, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------");
                                arrCinema = sourceCinema_2.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(itemCinema, {})];
                                            case 1:
                                                htmlLoadSource = _a.sent();
                                                parseLoadSource = cheerio.load(htmlLoadSource);
                                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                                host = libs.string_getHost(iframeLoadSource);
                                                if (hosts[host]) {
                                                    hosts[host](iframeLoadSource, movieInfo, _merge(config, { provider: "CINEBLOOM" }), callback);
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrCinema)];
                            case 2:
                                _a.sent();
                                return [3, 5];
                            case 3: return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](url, movieInfo, _merge(config, { provider: "CINEBLOOM" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "CINEBLOOM"
                                    });
                                }
                                _a.label = 5;
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2];
        }
    });
}); };
