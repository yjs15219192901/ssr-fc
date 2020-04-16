import React from "react";
import { getProfile } from "../service/api/student";
// export const ProfileCtx = React.createContext({});

export default function WithProfile(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.profile = null;
    }

    componentDidMount() {}

    static async getInitialProps(ctx) {
      let wrappedComponentProps = await WrappedComponent.getInitialProps(ctx);
      let res = await getProfile(ctx);
      if (res.data.error == 0) {
        this.profile = res.data.data;
      }
      return { profile: this.profile, ...wrappedComponentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
