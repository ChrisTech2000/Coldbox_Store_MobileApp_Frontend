import React, {
  Component,
  isValidElement,
  type ComponentType,
  type ReactNode,
  type PropsWithChildren,
} from 'react';

import reportCrash from '#ui/lib/reportCrash';

export type FallbackOptions<T> = {
  error: unknown;
  tryAgain: () => void;
  childProps?: T;
};

type Options<T> = {
  onError?: (error: unknown) => void;
  fallback?: ReactNode;
  fallbackRender?: (props: FallbackOptions<T>) => ReactNode;
};

type Props<T> = {
  childProps?: T;
} & Options<T>;

interface State {
  error: null | unknown;
}

export class ErrorBoundary<T> extends Component<PropsWithChildren<Props<T>>, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch() {
    const _exception = this.state.error;
    if (_exception instanceof Error || typeof _exception === 'string') {
      reportCrash(_exception, { severity: 'fatal' });
    }
    this.props.onError?.(_exception);
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    const { fallback, fallbackRender, children, childProps } = this.props;
    const { error } = this.state;

    if (error !== null) {
      if (isValidElement(fallback)) {
        return fallback;
      } else if (typeof fallbackRender === 'function') {
        return fallbackRender({ error, tryAgain: this.reset, childProps });
      } else {
        throw new Error('Error Boundary Component requires a fallback or fallbackRender prop');
      }
    }

    return children;
  }
}

export function withErrorBoundary<T>(
  ComponentToWrap: ComponentType<T>,
  errorBoundaryProps: Options<T>
): ComponentType<T> {
  // eslint-disable-next-line
  const Wrapped: ComponentType<T> = (props: any) => (
    <ErrorBoundary {...errorBoundaryProps} childProps={props}>
      <ComponentToWrap {...props} />
    </ErrorBoundary>
  );

  const name = ComponentToWrap.displayName || ComponentToWrap.name || 'Unknown';
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
