const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    firstName : { type : String },
    lastName : { type : String },
    fulName : { type : String },
    profilePicture : { type : String },
    email: { type : String },
    totalLikes : {
        type : Number,
        default: 0
    },
    totalViews : {
        type : Number,
        default: 0
    },
    totalFollowers : {
        type : Number,
        default: 0
    },
    totalFollowings : {
        type : Number,
        default: 0
    },
    totalBlockedUser : {
        type : Number,
        default: 0
    },
    intrests : {
        type: [String]
    },
    followers : {
        _id : { type : Schema.Types.ObjectId },
        userName : {type : String },
        fullName : {type : String },
        profilePicture : {type : String },
        followedTimestamp : {
            type : Date,
            default : Math.floor(Date.now() / 1000) // just trying to get timestamp value
        }
    },
    followings : {
        _id : { type : Schema.Types.ObjectId },
        userName : {type : String },
        fullName : {type : String },
        profilePicture : {type : String },
        followedTimestamp : {
            type : Date,
            default : Math.floor(Date.now() / 1000) // just trying to get timestamp value
        }
    },
    blockedUsers : {
        _id : { type : Schema.Types.ObjectId },
        userName : {type : String },
        fullName : {type : String },
        profilePicture : {type : String },
        followedTimestamp : {
            type : Date,
            default : Math.floor(Date.now() / 1000) // just trying to get timestamp value
        }
    },
    currentDevice : {
        deviceId:{
           type :  String,
           required : true
        },
        deviceModel:{
            type : String,
            required : true
        },	
        deviceOS:{
            type : String,
            required : true
        },	
        deviceOSVersion:{
            type : String,
            required : true
        },	
        apiVersion:{
            type : String,
            required : true
        },	
        deviceName:{
            type : String,
            required : true
        },	
        createdTimestamp:{
            type : Date,
            default : Math.floor(Date.now() / 1000) // just trying to get timestamp value
        }
    },
    devices : [
        {
            deviceId:{
                type :  String,
                required : true
            },
            deviceModel:{
                type : String,
                required : true
            },	
            deviceOS:{
                type : String,
                required : true
            },	
            deviceOSVersion:{
                type : String,
                required : true
            },	
            apiVersion:{
                type : String,
                required : true
            },	
            deviceName:{
                type : String,
                required : true
            },	
            createdTimestamp:{
                type : Date,
                default : Math.floor(Date.now() / 1000) // just trying to get timestamp value
            }
        }
    ],
    currentLocation : {
        type : String,
        required : true
    },
    locations : {
        type : [ String ],
        required : true
    },
    tokens : {
        trype : [String]
    },
    status : {
        type : String,
        enum : ['active', 'inactive', 'disabled'],
        default: 'active'
    },
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate',  },
    // createdTimestamp, updatedTimestamp Remaining to set in model
});

module.exports = mongoose.model('User', userSchema);

// old functionality is here
/* const mongodb =require('mongodb');

const { getDB} = require('../util/database');

const ObjectId = mongodb.ObjectId;
const db = getDB();
module.exports = class User {
    
    constructor(id, username, mobile, otherProp) {
        this.username = username;
        this.mobile = mobile;
        this._id = id;
    }

    save() {
        if (this._id) {
            return db.collection('users')
            .updateOne({_id : new ObjectId(this._id)},this);
        } else {
            return db.collection('users')
            .insertOne(this);
        }
    }

    static findById (user_id) {
        return db.collection('users')
            .find({_id: new ObjectId(user_id)})
            .next();
    }

    static find (user_id) {
        return db.collection('users')
            .find({_id: new ObjectId(user_id)})
            .next();
    }
} */