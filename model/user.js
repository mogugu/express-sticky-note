var Sequelize=require("sequelize");
var path=require('path');
var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname,'../database/userdata.sqlite')
});

// sequelize.authenticate().then(function (err) {
//     console.log('Connection has been unioned successful')
// }).catch(function (err) {
//     console.log("unable to connect"+err)
// });

//对应一个表
//id uid username creatdate updatedate
var User = sequelize.define('user', {
    uid: {
        type: Sequelize.STRING
    },
    username:{
        type:Sequelize.STRING
    }
});

User.sync();
// User.sync({force: true}).then(function () {
//     // Table created
//     return User.create({
//         uid: '1111',
//         username: "lidd"
//     });
// });
// User.findAll().then(function (user) {
//     console.log(user);
// });
module.exports= User;
