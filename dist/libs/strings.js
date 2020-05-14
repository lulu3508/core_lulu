libs.string_getHost = function (url) {
    var hostName = url.match(/^:?\/\/|https?:\/\/([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/i);
    if (!hostName || hostName.length == 0) {
        return "";
    }
    hostName = hostName[2].replace("www.", "");
    return hostName.replace(/\.[A-z]+$/, "");
};
