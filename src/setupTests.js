import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'polyfills/localStorage'


configure({
  adapter: new Adapter(),
});

// Hide console messages
// console.log = e => e;
// console.error = e => e;
