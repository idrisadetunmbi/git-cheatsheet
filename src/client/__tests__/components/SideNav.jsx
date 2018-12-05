import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../components/SideNav';

describe('SideNav component', () => {
  test('renders without crashing', () => {
    shallow(<SideNav />);
  });
});
