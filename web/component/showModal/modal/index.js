import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";
import "./index.less";

class NewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || "",
      show: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.instance = null;
  }

  show(config) {
    this.setState({
      show: true,
      ...config,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  render() {
    let { show, text } = this.state;
    return (
      <Modal
        footer={null}
        visible={show}
        onCancel={() => {
          this.setState({
            show: false,
          });
        }}
      >
        {text}
      </Modal>
    );
  }
}
let DOM = null;
export function getInstance(config) {
  if (!DOM) {
    DOM = document.createElement("div");
    window.document.body.appendChild(DOM);
  }
  return ReactDOM.render(<NewModal {...config}></NewModal>, DOM);
}

export function unmountModal() {
  let DOM = document.getElementById("modal");
  ReactDOM.unmountComponentAtNode(DOM);
}
