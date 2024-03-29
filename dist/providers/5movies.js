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
    var domain, urlSearch, htmlSearch, parseSearch, link, token, urlDetail, responseDetail, parseDetail, tokenIds, embeds, arrMap, arrHost;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://5movies.cloud";
                urlSearch = domain + "/movie/search/" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".ml-item").length, "-------- 5MOVIES SEARCH INFO -------");
                parseSearch(".ml-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".mli-info h2").text();
                    title = title.replace(/\( *[0-9]+ *\)/i, '').trim();
                    var season = title.toLowerCase().match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/\- *season [0-9]+/i, "").trim();
                    var href = parseSearch(itemSearch).find(".ml-mask").attr("href");
                    console.log(title, season, href, "-------- 5MOVIES DETAIL INFO -------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie") {
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season) {
                            link = href;
                        }
                    }
                });
                console.log(link, "-------- 5MOVIES DETAIL INFO -------");
                if (!link) {
                    return [2];
                }
                link = "" + domain + link;
                token = link.match(/\-([0-9]+)\/$/i);
                token = token ? token[1] : 0;
                console.log(token, "-------- 5MOVIES TOKEN -------");
                if (!token) {
                    return [2];
                }
                urlDetail = domain + "/ajax/movie_episodes/" + token;
                return [4, libs.request_get(urlDetail, {}, 'json')];
            case 2:
                responseDetail = _a.sent();
                console.log(urlDetail, responseDetail, "-------- 5MOVIES DETAIL -------");
                if (responseDetail.status != 1 || !responseDetail.html) {
                    return [2];
                }
                parseDetail = cheerio.load(responseDetail.html);
                tokenIds = [];
                if (movieInfo.type == 'movie') {
                    parseDetail('a.btn-eps').each(function (keyDetail, itemDetail) {
                        var id = parseDetail(itemDetail).attr('data-id');
                        if (id) {
                            tokenIds.push(id);
                        }
                    });
                }
                else {
                    parseDetail('a.btn-eps').each(function (keyDetail, itemDetail) {
                        var episode = parseDetail(itemDetail).text();
                        episode = episode.match(/episode *([0-9]+)/i);
                        episode = episode ? episode[1] : 0;
                        var id = parseDetail(itemDetail).attr('data-id');
                        console.log(episode, id, "-------- 5MOVIES TOKEN EPISODE ID -------");
                        if (id && episode == movieInfo.episode) {
                            tokenIds.push(id);
                        }
                    });
                }
                console.log(tokenIds, "-------- 5MOVIES TOKEN IDS -------");
                embeds = [];
                arrMap = tokenIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var urlEmbed, resultEmbed;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlEmbed = domain + "/ajax/movie_embed/" + id;
                                return [4, libs.request_get(urlEmbed, {}, 'json')];
                            case 1:
                                resultEmbed = _a.sent();
                                console.log(urlEmbed, resultEmbed, "-------- 5MOVIES REQUEST EMBED -------");
                                if (resultEmbed.status && resultEmbed.src) {
                                    embeds.push(resultEmbed.src);
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _a.sent();
                console.log(embeds, "-------- 5MOVIES EMBEDS -------");
                arrHost = embeds.map(function (urlHost) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host, html, source, parse, length_1, i, file, quality;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_getFileSize(urlHost)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(urlHost);
                                console.log(urlHost, fileSize, host, "embed.u--------------------");
                                if (!(host.indexOf('stream365') != -1)) return [3, 3];
                                return [4, libs.request_get(urlHost, {
                                        Referer: domain
                                    }, "html")];
                            case 2:
                                html = _a.sent();
                                source = html.match(/sources *\: *([^\]]+)/i);
                                source = source ? source[1] + "]" : "[]";
                                parse = [];
                                source = "parse = " + source;
                                eval(source);
                                console.log(parse, urlHost, "------------ SOURCES STREAM 5MOVIES -------------");
                                length_1 = parse.length;
                                for (i = 0; i < length_1; i++) {
                                    file = parse[i].file;
                                    quality = parse[i].label;
                                    console.log(parse[i], "------------ SOURCE DETAIL STREAM 5MOVIES -------------");
                                    callback({
                                        file: file,
                                        host: 'Stream365',
                                        provider: "5Movies",
                                        quality: quality,
                                    });
                                }
                                _a.label = 3;
                            case 3:
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](urlHost, movieInfo, _.merge(config, { provider: "5Movies", urlDetail: link }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: urlHost,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "5Movies"
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrHost)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); };
