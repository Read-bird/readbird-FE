import { ErrorLayout } from '@components/common/ErrorBoundary/ErrorLayout';
import { Component, ErrorInfo, Fragment, ReactNode } from 'react';

type TState = {
  isError?: boolean;
};

type TProps = {
  children: ReactNode;
  handleClickRetry?: () => void;
};

export class ErrorBoundary extends Component<TProps, TState> {
  isError: boolean = false;

  constructor(props: TProps) {
    super(props);
    this.state = {
      isError: false
    };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { isError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.isError) {
      // You can render any custom fallback UI
      return <ErrorLayout handleClickRetry={this.props.handleClickRetry} />;
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}
