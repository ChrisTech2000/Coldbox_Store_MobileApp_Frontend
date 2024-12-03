import React from 'react';

export default function LoadingConditionalRenderer(
  props: React.PropsWithChildren<{
    isLoading: boolean;
    fallback: React.ReactNode;
  }>
) {
  const { isLoading, fallback, children } = props;
  return <React.Fragment>{isLoading ? fallback : children}</React.Fragment>;
}
