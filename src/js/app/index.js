require("less/index.less");
var noteManager=require("../mod/note-manager.js");
var waterfall=require("../mod/waterfall.js");
var event=require("../mod/event.js");
noteManager.load();
$(".add").on("click",function () {
    console.log("adddd");
    noteManager.add();
});

event.on("waterfall",function () {
    waterfall.init($("#content"))
});
