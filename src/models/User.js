const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cart : {
        items : [
            {

                productId : {
                    type : Schema.Types.ObjectId,
                    ref : 'Product',
                    required : true
                },
                quantity : {
                    type : Number, 
                    required : true
                }
            }
        ]
    }
});

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