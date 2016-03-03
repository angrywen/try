var utils = require("./utils.js");
var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function (req, res) {
    var p = url.parse(req.url, true);

    //长地址转短地址接口
    if (p.pathname == "/toShort") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        var _longUrl = new Buffer(p.query.longUrl, "base64").toString();//解码特殊格式的参数
        if (utils.isUrl(_longUrl)) {
            var shortUrl = utils.setLongUrl(_longUrl);
            res.end(shortUrl);
        } else {
            res.end("Not A URL");
        }
    }
    //短地址转长地址接口
    else if (p.pathname == "/toLong") {
        //解码特殊格式的参数
        var longUrl = utils.getLongUrl(new Buffer(p.query.shortUrl, "base64").toString());
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        if (longUrl) {
            res.end(longUrl);
        }
        else {
            res.end("Not Found");
        }
    }
    //首页
    else if (p.pathname == "/index.html") {
        fs.readFile("./index.html", function (error, data) {
            if (error) {
                // TODO
            } else {
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end(data);
            }
        });
    }
    //短地址重定向到长地址
    else {
        res.writeHead(302, {"Location": utils.getLongUrl(utils.prefix + req.url)});
        res.end();
    }
});

server.listen(80);
