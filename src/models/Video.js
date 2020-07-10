const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    videoPath: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
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
    videoName: {
      type: String,
      required: true,
    },
    videoThumbnail: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
    },
    videoType: {
      type: String,
      enum: ["draft", "public", "private"],
      default: "draft",
    },
    category: {
      type: [String],
    },
    videoStatus: {
      type: String,
      enum: ["trending", "popular", "normal"],
      default: "normal",
    },
    hashTags: {
      type: [String],
    },
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
    status: {
      type: String,
      enum: ["pending", "enabled", "disabled", "removed"],
      default: "pending",
    },
    isConverted: {
      type: Boolean,
      default: false,
    },
    streamingLink: {
      type: String,
      required: true,
    },
    users: {
      liked: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      shared: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
    comments: [
      {
        message: {
          type: String,
        },
        replies: [
          {
            message: String,
          },
        ],
      },
    ],
    jobId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["admin", "user", "anonymous"],
      default: "user",
    },
    videoType: {
      type: String,
      enum: ["normal", "business", "event", "advertisement"],
      default: "normal",
    },
    isEvent: {
      type: Boolean,
      default: false,
    },
    event: {
      eventDate: {
        type: Date,
      },
      expired: {
        type: Boolean,
        default: false,
      },
      publishDay: {
        type: [Number], // [0, 1, 2, 3, 4, 5, 6]
      },
      publishStartTime: {
        type: Date,
      },
      publishEndTime: {
        type: Date,
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: "updatedTimestamp",
    },
  }
);

module.exports = mongoose.model("Video", videoSchema);
