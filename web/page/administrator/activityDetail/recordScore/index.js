import React, { useState, useEffect } from "react";
import "./index.less";
import { Upload, Button, Table, Form, InputNumber, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import xlsx from "xlsx";
import { SCORE_MAP, EXCEL_MAP } from "../../../../utils";
import { studentAttendance } from "../../../../mockData";
import {
  logScore,
  getLogScore,
  deleteScore,
} from "../../../../service/api/admin";
export default function RecordScore(props) {
  let { actDetail, studentAttendance } = props;
  let fileReader = new FileReader();
  let [recordList, setRecordList] = useState(studentAttendance);
  let [record, setRecord] = useState({
    name: "",
    ID: "",
    score: actDetail.score,
  });
  async function handleDelete(data) {
    let res = await deleteScore(actDetail._id, data);
    if (res.data.error == 0) {
      let newRecordList = recordList.filter((record) => record.ID !== data.ID);
      setRecordList(newRecordList);
    } else {
      message.warn("删除失败");
    }
  }

  async function handleSubmit(data) {
    let res = await logScore(actDetail._id, [record]);
    if (res.data.error == 0) {
      let temp = JSON.parse(JSON.stringify(recordList));
      temp.push(record);
      setRecordList(temp);
      setRecord({ name: "", ID: "", score: actDetail.score });
      message.success("录入成功");
    } else {
      message.warn("录入失败");
    }
  }

  function getRecordList() {}

  function formatData(jsonData) {
    return jsonData.map((item) => {
      let formated = { name: "", ID: "", score: {} };
      Object.keys(item).forEach((k) => {
        if (k !== "姓名" && k !== "学号") {
          formated.score[EXCEL_MAP[k]] = item[k];
        } else {
          formated[EXCEL_MAP[k]] = item[k];
        }
      });
      return formated;
    });
  }

  const column = [
    {
      title: "学号",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "加分",
      dataIndex: "score",
      key: "score",
      render: (data) => {
        return (
          <div>
            {Object.entries(data).map(
              ([k, v]) =>
                SCORE_MAP[k] && (
                  <p
                    style={{ marginBottom: "0px" }}
                    key={k}
                  >{`${SCORE_MAP[k]}：${v}`}</p>
                )
            )}
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, data) => (
        <Button
          type="danger"
          onClick={() => {
            handleDelete(data);
          }}
        >
          删除记录
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={column}
        dataSource={recordList}
        pagination={false}
        scroll={{ y: 300 }}
        locale={{ emptyText: "暂无数据" }}
      ></Table>

      <Form layout="inline" style={{ margin: "10px" }}>
        <Form.Item label="学号">
          <Input
            value={record.ID}
            onChange={(e) => {
              // console.log(e.target.value);
              let temp = JSON.parse(JSON.stringify(record));
              temp.ID = e.target.value;
              setRecord(temp);
              // console.log(record);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="姓名">
          <Input
            value={record.name}
            onChange={(e) => {
              let temp = JSON.parse(JSON.stringify(record));
              temp.name = e.target.value;
              setRecord(temp);
            }}
          ></Input>
        </Form.Item>
        {Object.entries(record.score).map(([k, v]) => (
          <Form.Item key={k} label={SCORE_MAP[k]}>
            <InputNumber
              value={+v}
              onChange={(value) => {
                let temp = JSON.parse(JSON.stringify(record));
                temp.score[k] = value;
                setRecord(temp);
              }}
            ></InputNumber>
          </Form.Item>
        ))}
        <Form.Item>
          <Button onClick={handleSubmit}>录入</Button>
        </Form.Item>
      </Form>

      <Upload
        style={{ marginTop: "10px" }}
        name="file"
        action=""
        onChange={(info) => {
          if (info.fileList.length !== 0) {
            let file = info.file.originFileObj;
            fileReader.readAsBinaryString(file);
            fileReader.onload = async () => {
              // console.log(fileReader.result);
              let workBook = xlsx.read(fileReader.result, { type: "binary" });
              let sheets = workBook.Sheets;
              let sheet = sheets.Sheet1;
              let jsonData = xlsx.utils.sheet_to_json(sheet);
              let cleanData = formatData(jsonData);
              let res = await logScore(actDetail._id, cleanData);
              if (res.data.error == 0) {
                let temp = JSON.parse(JSON.stringify(recordList));
                temp = temp.concat(cleanData);
                // console.log(temp);
                setRecordList(temp);
              }
              // console.log(xlsx.utils.sheet_to_json(sheet));
            };
          }
        }}
      >
        <Button>
          <UploadOutlined /> 导入文件
        </Button>
      </Upload>

      {/* <input
        type="file"
        onInput={(e) => {
          console.log(e.nativeEvent);
        }}
      ></input> */}
    </div>
  );
}

RecordScore.prefetch = async (ctx) => {
  console.log("record score ctx", ctx);
  const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  let res = await getLogScore(actId);
  return { studentAttendance: res.data.data };
};
