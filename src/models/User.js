const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    mobile: {
      countryCode: {
        type: String,
      },
      mobile: {
        type: Number,
      },
    },
    otp: {
      type: String,
    },
    isLoggedIn: {
      type: Boolean,
    },
    isRegistered: {
      type: Boolean,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    email: { type: String },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalShares: {
      type: Number,
      default: 0,
    },
    authenticatedToken: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    userType: {
      type: String,
      enum: ["normal", "special", "support", "admin"],
      default: "normal",
    },
    totalFollowers: {
      type: Number,
      default: 0,
    },
    totalFollowings: {
      type: Number,
      default: 0,
    },
    totalBlockedUsers: {
      type: Number,
      default: 0,
    },
    interests: {
      type: [String],
    },
    followers: [
      {
        _id: { type: Schema.Types.ObjectId },
        userName: { type: String },
        fullName: { type: String },
        profilePicture: { type: String },
        createdTimestamp: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    followings: [
      {
        _id: { type: Schema.Types.ObjectId },
        userName: { type: String },
        fullName: { type: String },
        profilePicture: { type: String },
        createdTimestamp: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    blockedUsers: [
      {
        _id: { type: Schema.Types.ObjectId },
        userName: { type: String },
        fullName: { type: String },
        profilePicture: { type: String },
        createdTimestamp: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    currentDevice: {
      deviceId: {
        type: String,
        required: true,
      },
      deviceModel: {
        type: String,
        required: true,
      },
      deviceOS: {
        type: String,
        required: true,
      },
      deviceOSVersion: {
        type: String,
        required: true,
      },
      apiVersion: {
        type: String,
        required: true,
      },
      deviceName: {
        type: String,
        required: true,
      },
      createdTimestamp: {
        type: Date,
        default: Date.now(),
      },
    },
    devices: [
      {
        deviceId: {
          type: String,
        },
        deviceModel: {
          type: String,
        },
        deviceOS: {
          type: String,
        },
        deviceOSVersion: {
          type: String,
        },
        apiVersion: {
          type: String,
        },
        deviceName: {
          type: String,
        },
        createdTimestamp: {
          type: Date,
        },
      },
    ],
    currentLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      region: {
        type: String,
      },
    },
    locations: [
      {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
        country: {
          type: String,
        },
        state: {
          type: String,
        },
        region: {
          type: String,
        },
      },
    ],
    tokens: {
      loginType: {
        type: String,
        enum: ["mobile", "email", "google", "facebook", "twitter", "instagram"],
        required: true,
      },
      socialToken: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "disabled"],
      default: "active",
    },
    interestedLanguages: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: "updatedTimestamp",
    },
  }
);

module.exports = mongoose.model("User", userSchema);

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
