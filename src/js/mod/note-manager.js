var Note=require("./note.js").Note;
var toast=require("./toast.js").toast;
var waterfall=require('./waterfall.js');
var event=require('./event.js');

var NoteManager=(function () {
    function load() {
        $.get("/api/notes").done(function (res) {
            if(res.status===0){
                $.each(res.data,function (idx,arc) {
                    new Note({
                        id: arc.id,
                        context: arc.text
                    })
                });
                event.fire('waterfall');
            }else {
                toast(res.errorMsg);
            }
        }).fail(function(){
            toast("网络异常");
        });
    }
    function add() {
        console.log("note");
        new Note();
    }
    return{
        add: add ,
        load: load
    }
})();

module.exports=NoteManager;
