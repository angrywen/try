var crypto = require("crypto");
var url = require("url");
var chars = ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"];
var map = {};//长短地址映射，key=长地址，value=短地址
var utils = {
    /**
     * 计算字符串32位的md5值
     * @param string
     * @returns {undefined}
     */
    md5Hex: function (string) {
        return string ? crypto.createHash("md5").update(string).digest("hex") : undefined;
    },
    /**
     * 压缩string
     * @param string
     * @returns {string}
     */
    shortFor: function (string) {
        if (!string) {
            return;
        }

        var c = '', index = this.randomIndex();
        var subt = this.md5Hex(string).substring(index * 8, index * 8 + 8);
        var number = 0x3fffffff & parseInt("0x" + subt, 16);
        for (var j = 0; j < 5; j++) {
            c += chars[0x0000003d & number];
            number = number >> 6;
        }
        return c;
    },
    randomIndex: function () {
        //return parseInt(Math.random() * 4, 10);
        return 0;
    },
    /**
     * 简单判断是否为地址
     * @param string
     * @returns {*|string|string|null}
     */
    isUrl: function (string) {
        var u = url.parse(string);
        return u && u.protocol;
    },
    prefix: "http://localhost",
    /**
     * 根据短地址获取长地址
     * @param shortUrl
     * @returns {*}
     */
    getLongUrl: function (shortUrl) {
        return map[shortUrl];
    },
    /**
     * 根据长地址计算短地址并做映射
     * @param longUrl
     * @returns {string}
     */
    setLongUrl: function (longUrl) {
        var shortUrl = this.prefix + '/' + this.shortFor(longUrl);
        map[shortUrl] = longUrl;
        return shortUrl;
    }
}

module.exports = utils;

