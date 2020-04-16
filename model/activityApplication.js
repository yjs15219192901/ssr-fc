const mongoose = require("mongoose");
const schema = mongoose.Schema;

const activityApplicationSchema = new schema({
  activityID: String,
  applicantMessage: [
    {
      studentId: Number,
      applyFormValue: [
        {
          title: String,
          value: [String],
        },
      ],
    },
  ],
});

const activityApplicationModel = mongoose.model(
  "activityApplicationModel",
  activityApplicationSchema
);
export default activityApplicationModel;
