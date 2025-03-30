const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "Need to apply",
        "Pending",
        "Interview",
        "Technical Test",
        "Accepted",
        "Rejected",
      ],
      default: "Need to apply",
    },
    datePostulation: {
      type: Date,
      default: Date.now(),
    },
    meetingDate: {
      type: Date,
    },
    testDate: {
      type: Date,
    },
    type: {
      type: String,
      required: false,
      enum: [
        "Internship",
        "Apprenticeship",
        "Full-time",
        "Contract",
        "Freelance",
      ],
      default: "Internship",
    },
    link: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    company: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ user_id: 1 });
jobSchema.index({ company: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ datePostulation: 1 });

jobSchema.statics.findJobsToRemind = function (userId, daysThreshold = 7) {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);

  return this.find({
    user_id: userId,
    status: "Pending",
    updatedAt: { $lt: thresholdDate },
  });
};

jobSchema.statics.getStats = function (userId) {
  return this.aggregate([
    { $match: { user_id: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
};

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
