var Sequelize=require("sequelize");
var path=require('path');
var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
});

// sequelize.authenticate().then(function (err) {
//     console.log('Connection has been unioned successful')
// }).catch(function (err) {
//     console.log("unable to connect"+err)
// });

//对应一个表
//id text uid creatdate updatedate
var Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    uid:{
        type:Sequelize.STRING
    }
});

Note.sync();
// Note.sync({force: true}).then(function () {
//     // Table created
//     return Note.create({
//         text: 'Hello node'
//     });
// });
// Note.findAll().then(function (note) {
//     console.log(note);
// });
module.exports=Note;