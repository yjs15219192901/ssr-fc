const mongoose = require("mongoose");
import { scoreSchema } from "./student";
const schema = mongoose.Schema;

const ActivitySchema = new schema({
  ID: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  description: {
    type: String
  },
  time: {
    type: Date
  },
  place: String,
  score: {
    type: scoreSchema,
    required: true
  },
  publisher: {
    type: String
  },
  qualification: {
    //参加条件
    type: [
      {
        major: String,
        grade: Number //1：大一，2：大二，3：大三，4：大四，5：研一，6：研二、0：不限
      }
    ],
    default: []
  },
  quato: Number,
  registrationMethod: String, //online或offline
  applyForm: [
    {
      title: {
        type: String,
        required: true
      },
      inputType: {
        type: String,
        required: true
      },
      placeholder: String,
      multiple: Boolean,
      options: [
        {
          optionName: String
        }
      ]
    }
  ]
});

const applyFormSchema = new schema({
  title: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  placeholder: String,
  multiple: Boolean,
  options: [
    {
      optionName: String
    }
  ]
});

let activityModel = mongoose.model("activity", ActivitySchema);

export default activityModel;
