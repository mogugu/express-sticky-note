require("less/load.less");

var loader=(function () {
    function init() {
        var opts = "<div id='loadingDiv'><div class='circle-loader'>";
        opts += "<div class='circle-line'><div class='circle circle-blue'></div><div class='circle circle-blue'></div><div class='circle circle-blue'></div></div>";
        opts += "<div class='circle-line'><div class='circle circle-green'></div><div class='circle circle-green'></div><div class='circle circle-green'></div></div>";
        opts += "<div class='circle-line'><div class='circle circle-red'></div><div class='circle circle-red'></div><div class='circle circle-red'></div></div>";
        opts += "<div class='circle-line'><div class='circle circle-yellow'></div><div class='circle circle-yellow'></div><div class='circle circle-yellow'></div></div>";
        opts += "</div></div>"
        $("body").append(opts);
    }
    return{
        init:init
    }
})();
module.exports=loader;

