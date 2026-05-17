import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RootApp from './RootApp';

type Props = {};

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
};

export default App;
