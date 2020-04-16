const mongoose = require("mongoose");
const schema = mongoose.Schema;

export const scoreSchema = new schema({
  moral: Number, // 德育分
  humanity: Number, // 人文分
  innovation: Number, // 创新分
  volunteer: Number // 志愿时
});

const studentSchema = new schema({
  name: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  score: {
    type: scoreSchema,
    required: true
  },
  collections: [String]
});

let studentModel = mongoose.model("student", studentSchema);
export default studentModel;
