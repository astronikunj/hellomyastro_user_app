/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './gesture-handler';
if (__DEV__) {
  require('./ReactotronConfig'); // Ensure this is imported before any other code that uses Reactotron
}

AppRegistry.registerComponent(appName, () => App);
