const mongoose = require("mongoose");
const uuid = require("uuidjs");
const url = "mongodb://host.docker.internal:27017/test";
const db = mongoose.connection;
import studentModel from "./student";
import activityModel from "./activity";

export function initDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  db.once("open", async () => {
    console.log("connection open!");
    try {
      // console.log(await getActivityList());
    } catch (err) {
      console.log("insert error", err);
    }
  });
}

export async function getProfile(id) {
  try {
    let record = await studentModel.findOne({ ID: id });
    return record;
  } catch (err) {
    throw err;
  }
}

export async function insertProfile(data) {
  try {
    let existRecord = await studentModel.findOne({ ID: data.ID });
    console.log("existed record?", existRecord);
    if (existRecord) {
      throw new Error("重复数据！");
    }
    let newRecord = new studentModel(data);
    await newRecord.save();
  } catch (err) {
    throw err;
  }
}

// export async function updateProfile(data) {
//     try {
//         await studentModel.updateOne()
//     }
// }

export async function deleteProfile(id) {
  try {
    await studentModel.deleteOne({
      ID: id,
    });
  } catch (err) {
    throw err;
  }
}

export async function getActivityList() {
  try {
    let ActList = await activityModel.find();
    return ActList;
  } catch (err) {
    throw err;
  }
}

export async function adminGetActivityList(school) {
  try {
    let ActList = await activityModel.find({ publisher: school });
    return ActList;
  } catch (err) {
    throw err;
  }
}
