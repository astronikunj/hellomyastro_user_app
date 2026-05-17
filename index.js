/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './gesture-handler';
import './ReactotronConfig'; // Ensure this is imported before any other code that uses Reactotron

if (__DEV__) {
  require("./ReactotronConfig");
}

AppRegistry.registerComponent(appName, () => App);
