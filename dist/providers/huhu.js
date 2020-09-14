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
    var pingSecretUrl, headerPing, bodyPing, resultPing, signed, urlSources, headerSource, bodySource, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pingSecretUrl = "https://www.watched.com/api/box/ping";
                headerPing = {
                    "content-type": "application/json"
                };
                bodyPing = JSON.stringify({ "x": "aW9zOoqT+nDRoFtDLTKobBLF5Ks5TTj1jUFi26KbRlkAZf7WUsAcue6zyBSyLcO7KgFyM/qAGONI065KTy+l5Z5VbPcA2kAIBaTog24Olg2j/5Q4JfreO4vvuCByQsEhiLpXA9h80itsQfRRmXnyPm8pMyVXBv9v+25KkXFBuhznnTILIHJuNWuQH2q85irTrG0FI38HjYZY+V8OXgKj2rWoVmCRe9bvCYcEm0S+VO1mTtNwnHROgZXfDc3bwvjL2b5qxNiVErwqEEL+9zrooFeXdw7vIGN6gVsXr5tczjpFfy1mhnyZx/4rv5iGx4yGixpESwU2HpVkvPpYcCaFIeISKd9lvv0eM4qUri6LeCV4gZxj91qub9cBdiU4B02D5P39b8QUf0tyqw1tlrMOpD9+hioa0vTxGTZcKIEaIRxt8aMfG//xpnNFMhHnt6rggJ9uYZLwd/Nnr+uvqWyjM7uLLyLi06VeIG3wyAanN3aI1ESD1XZSpQntWrMpHopMgPehLyn3uLPqeynzBUBaZZFbiHHTT4+XAj7pNEdtT3R9jXRw+Gh5CIcz/bq7KNoq8u7BvCfgY2RARR5tymqFeJ+AbyMSRIlQrnmwQvbwP4zweZfiXHihFaRuR63hUO4Ki4DC3gSKyOXVkQbuLIsqBJQW3Hvta6ARNuB6C6I/RNF5q+7r1lO4MfvJ3A+JUN3XC4OZsTO5jLiRLKtJYdXJVIk4q9QYFdBIy65xxUboTcnt4+0rOxAxJJg5HkMQKcQIdIFqnn/4QN8HdBPqJiQ6Fuv6mRePRSVedjtCW20q+pzuOc7h" });
                return [4, libs.request_post(pingSecretUrl, headerPing, bodyPing, 'json')];
            case 1:
                resultPing = _a.sent();
                signed = resultPing ? resultPing.response.signed : '';
                console.log(movieInfo, headerPing, bodyPing, pingSecretUrl, resultPing, signed, '------------------- HUHU PING INFO --------------');
                urlSources = [
                    "https://huhu.to/hot-series-de/item.watched",
                    "https://huhu.to/hot-movies-de/source.watched",
                    "https://huhu.to/filmstoon/source.watched",
                    'https://huhu.to/english-hd-2/source.watched',
                    'https://huhu.to/french--stream/source.watched',
                    'https://huhu.to/kinox/source.watched',
                    'https://huhu.to/hot-movies-de-2/source.watched',
                    'https://huhu.to/hot/source.watched',
                    'https://huhu.to/english-hd-3/source.watched',
                    'https://huhu.to/all-french/source.watched',
                    'https://huhu.to/english-hd-4/source.watched'
                ];
                headerSource = {
                    'watched-sig': signed,
                    'content-type': 'application/json',
                    'Host': "huhu.to"
                };
                bodySource = JSON.stringify({ "language": "en", "type": movieInfo.type == 'tv' ? 'series' : 'movie', "ids": { "tmdb_id": movieInfo.tmdb_id, imdb_id: movieInfo.imdb_id }, "name": movieInfo.title });
                arrMap = urlSources.map(function (urlSource) { return __awaiter(_this, void 0, void 0, function () {
                    var resultSource, arrMapSource, sources, _i, _a, episodeInfo, season, episode, arrMapSource;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, libs.request_post(urlSource, headerSource, bodySource, 'json')];
                            case 1:
                                resultSource = _b.sent();
                                console.log(urlSource, headerSource, bodySource, resultSource, '------------------- HUHU SOURCE INFO --------------');
                                if (!resultSource) return [3, 5];
                                if (!(movieInfo.type == 'movie' && resultSource.length > 0)) return [3, 3];
                                arrMapSource = resultSource.map(function (source) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = source.url;
                                                if (!embed) return [3, 2];
                                                return [4, libs.request_getFileSize(embed)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embed);
                                                console.log(embed, fileSize, host, "embed--------------------");
                                                if (fileSize == 0) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "HUHU" }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "HUHU"
                                                    });
                                                }
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (!(movieInfo.type == 'tv' && resultSource.episodes && resultSource.episodes.length > 0)) return [3, 5];
                                sources = [];
                                for (_i = 0, _a = resultSource.episodes; _i < _a.length; _i++) {
                                    episodeInfo = _a[_i];
                                    season = episodeInfo.season;
                                    episode = episodeInfo.episode;
                                    if (season == movieInfo.season && episode == movieInfo.episode) {
                                        sources = resultSource.sources ? resultSource.sources : [];
                                    }
                                }
                                arrMapSource = sources.map(function (source) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = source.url;
                                                if (!embed) return [3, 2];
                                                return [4, libs.request_getFileSize(embed)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embed);
                                                console.log(embed, fileSize, host, "embed--------------------");
                                                if (fileSize == 0) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "HUHU" }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "HUHU"
                                                    });
                                                }
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5: return [2];
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
