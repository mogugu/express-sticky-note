require("less/index.less");
var noteManager=require("../mod/note-manager.js");
var waterfall=require("../mod/waterfall.js");
var event=require("../mod/event.js");
var loader=require("../mod/load.js");

loader.init();

document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState === "complete") {
        var loading=$("#loadingDiv");
        loading.remove();
        noteManager.load();
    }
}

//noteManager.load();
$(".add").on("click",function () {
    console.log("adddd");
    noteManager.add();
});

event.on("waterfall",function () {
    waterfall.init($("#content"))
});
