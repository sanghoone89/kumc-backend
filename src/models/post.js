const mongoose = require("mongoose");
//const ObjectId = require('mongodb').ObjectID;

const { Schema } = mongoose;

/* const User = new Schema({
    name: {type: String, required: true},
    email: String,
}) */

const Vacation = new Schema({
  name: { type: String, required: true },
  email: String,
  title: String,
  body: String,
  vacationType: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  officialHoliday: Boolean,
  useVacationCount: Number,
  useOfficialHolidayCount: Number
});

const Post = new Schema({
  //post_id : ObjectId,
  //user: [User],
  vacation: [Vacation],
  publishedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", Post);
