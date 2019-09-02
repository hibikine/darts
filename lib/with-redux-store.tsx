import React from 'react';
import AppType, { AppContext, AppProps } from 'next/app';
import { State, initializeStore } from '../store';

const NEXT_REDUX_STORE = '__NEXT_REDUX_STORE__';

interface Window {
  [NEXT_REDUX_STORE]: ReturnType<typeof initializeStore>;
}

// eslint-disable-next-line
declare var window: Window;

const isServer = typeof window === 'undefined';

function getOrCreateStore(initialState?: State) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[NEXT_REDUX_STORE]) {
    window[NEXT_REDUX_STORE] = initializeStore(initialState);
  }
  return window[NEXT_REDUX_STORE];
}

export default <P extends {} = {}, CP = {}, S = {}>(
  App: new () => AppType<
    P & { reduxStore: ReturnType<typeof initializeStore> },
    CP,
    S
  >
) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext: AppContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // eslint-disable-next-line no-param-reassign
      (appContext.ctx as any).reduxStore = reduxStore;

      let appProps = {};
      if (typeof (App as any).getInitialProps === 'function') {
        appProps = await (App as any).getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    reduxStore: ReturnType<typeof initializeStore>;

    constructor(props: P & AppProps) {
      super(props);
      this.reduxStore = getOrCreateStore((props as any).initialReduxState);
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <App {...(this.props as any)} reduxStore={this.reduxStore} />;
    }
  };
};
