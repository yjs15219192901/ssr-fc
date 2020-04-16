const mongoose = require("mongoose");
import { scoreSchema } from "./student";
const schema = mongoose.Schema;

const ActivityAttendanceSchema = new schema({
  actId: {
    type: String,
    require: true,
  },
  attendance: [
    {
      name: String,
      ID: String,
      score: {
        type: scoreSchema,
      },
    },
  ],
});

const activityAttendanceModel = new mongoose.model(
  "activityAttendance",
  ActivityAttendanceSchema
);
export default activityAttendanceModel;
