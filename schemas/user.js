var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name : {
        unique : true,
        type : String,
    },
    password : String,
    meta : {
        createAt : {
            type : Date,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

//保存时的前置操作
UserSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    var user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            console.log(err);
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                console.log(err);
                return next(err);
            }
            user.password = hash;
            next(); //因为是异步，所以next()必需写在hash函数里面，要等待回调函数执行完，否则密码会是未加密的
        })
    });
});

UserSchema.statics = {
    fetch : function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById : function (id, cb) {
        return this.findOne({_id: id}).sort('meta.updateAt').exec(cb);
    }
};

module.exports = UserSchema;

