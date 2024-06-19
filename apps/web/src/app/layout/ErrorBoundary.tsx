import { apiPostError } from "@eco/redux";
import { Component, ErrorInfo, ReactNode } from "react";
import { ConnectedProps, connect } from "react-redux";
import { ErrorPage } from "./ErrorPage";

const mapDispatch = {
  postError: apiPostError
};

const connector = connect(null, mapDispatch);

type ErrorBoundaryProps = {
  children?: ReactNode;
} & ConnectedProps<typeof connector>;

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryCmp extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log({error, info});
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = connector(ErrorBoundaryCmp);
