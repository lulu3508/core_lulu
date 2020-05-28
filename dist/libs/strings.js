libs.string_getHost = function (url) {
    var hostName = url.match(/^:?\/\/|https?:\/\/([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/i);
    if (!hostName || hostName.length == 0) {
        return "";
    }
    hostName = hostName[2].replace("www.", "");
    return hostName.replace(/\.[A-z]+$/, "");
};
libs.string_btoa = function (input) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var str = input;
    var output = '';
    for (var block = 0, charCode = void 0, i = 0, map = chars; str.charAt(i | 0) || (map = '=', i % 1); output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
        charCode = str.charCodeAt(i += 3 / 4);
        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
    }
    return output;
};
libs.string_atob = function (input) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var str = input.replace(/=+$/, '');
    var output = '';
    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (var bc = 0, bs = 0, buffer = void 0, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        buffer = chars.indexOf(buffer);
    }
    return output;
};
