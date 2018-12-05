import React from 'react';
import { shallow, mount } from 'enzyme';

import Cheat from '../../components/Cheat';

describe('Cheat component', () => {
  test('renders without crashing', () => {
    shallow(<Cheat {...{ cheat: {} }} />);
  });

  test('renders the expected props  fields', () => {
    const props = {
      cheat: {
        description: 'Lorem ipsum',
        command: 'Lorem ipsum...',
      },
    };
    const wrapper = mount(<Cheat {...props} />);
    expect(wrapper.find('span').at(0).text())
      .toEqual(props.cheat.description);
    expect(wrapper.find('span').at(3).text())
      .toEqual(props.cheat.command);
  });
});
