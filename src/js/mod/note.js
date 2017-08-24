require("less/note.less");

var toast=require("./toast.js").toast;
var event=require("./event.js");

function Note(opts) {
   this.initOpt(opts);
   this.creatNote();
   this.setStyle();
   this.bindEvent();
}
Note.prototype={
    colors:["#f197ca","#00B7FF","#09adab","#4bc3b9","#ee6357"],
    defaultOpts:{
        id: "",
        $ct: $("#content").length>0 ? $("#content"): $('body'),
        context: "input here"
    },
    initOpt: function (opts) {
       this.opts=$.extend({},this.defaultOpts,opts||{} );
       if(this.opts.id){
           this.id=this.opts.id
       }
    },
    creatNote:function () {
       var tpl="<div class='note'><div class='note-head'><a href='#' class='delete'>×</a></div>";
            tpl += "<div class='note-ct' contenteditable='true'></div>";
            tpl += "</div>";
       this.$note=$(tpl);
       this.$note.find(".note-ct").text(this.opts.context);
       this.opts.$ct.append(this.$note);
       if(!this.id)
           this.$note.css("bottom","10px") ;//新增的摆放
    },
    setStyle:function () {
        var color = this.colors[Math.floor(Math.random()*5)];
        this.$note.css("background-color",color);
    },
    render:function () {
        var self=this;
        if(self.clk){
            clearTimeout(self.clk);
        }
        self.clk=setTimeout(function () {
            event.fire("waterfall");
        },100)
    },
    bindEvent:function () {
        var self=this,
            $noteCt=this.$note.find(".note-ct"),
            $head=this.$note.find(".note-head"),
            $delete=this.$note.find(".delete");
        $delete.on("click",function (e) {
            e.preventDefault();
            self.delete();
        });
        //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
        $noteCt.on("focus",function () {
            if($noteCt.html()==='input here')
                $noteCt.html(' ');
            $noteCt.data('before',$noteCt.html())
        }).on("blur paste",function () {
            if($noteCt.data('before')!==$noteCt.html()){
                $noteCt.data('before',$noteCt.html());
                self.render();
                if(self.id){
                    self.edit($noteCt.html());
                }else{
                    self.add($noteCt.html());
                }
            }
        });

        //设置移动
        $head.on("mousedown",function (e) {
            var eventX=e.pageX-self.$note.offset().left,
                eventY=e.pageY-self.$note.offset().top;
            self.$note.addClass("draggable").data("evtPots",{x:eventX,y:eventY});
        }).on("mouseup",function () {
            self.$note.removeClass("draggable").removeData("evtPots");
        });
        $('body').on("mousemove",function (e) {
            $(".draggable").length && $(".draggable").offset({
                top: e.pageY-$(".draggable").data("evtPots").y,
                left: e.pageX- $(".draggable").data('evtPots').x
            });
            $(".draggable").css("bottom","");
        });
    },
    edit:function (msg) {
       $.post("/api/note/edit",{
           id: this.id,
           note:msg
       }).done(function (res) {
           if(res.status===0){
               toast("edit success")
           }else{
               toast(res.errorMsg);
           }
       })
    },
    add:function (msg) {
        console.log("added......");
       var self=this;
       $.post("/api/note/create",{note:msg}).done(function (res) {
           if(res.status===0){
               toast("add success");
           }else{
               self.$note.remove();
               event.fire("waterfall");
               toast(res.errorMsg);
           }
       });
    },
    delete:function () {
        var self=this;
       $.post("/api/note/delete",{id:this.id}).done(function (res) {
           if(res.status===0){
               toast("delete success");
               self.$note.remove();
               event.fire("waterfall");
           }else{
               totost("error wrong!");
           }
       });
    }
};
module.exports.Note=Note;