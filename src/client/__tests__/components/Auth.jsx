import React from 'react';
import { mount, shallow } from 'enzyme';

import { AuthStatus, Auth } from '../../components/Auth';

describe('Auth Component', () => {
  test('renders without crashing', () => {
    shallow(<Auth />);
  });

  test('renders unauthenticated message when user is not signed in', () => {
    const wrapper = mount(<Auth />);
    expect(wrapper.find(AuthStatus).find('p').text())
      .toContain('You are currently not authenticated,');
  });

  test('does not initially show form', () => {
    const wrapper = mount(<Auth />);
    expect(wrapper.find('form').length).toEqual(0);
  });

  test('renders form when button to show form is clicked', () => {
    const wrapper = mount(<Auth />);
    expect(wrapper.find('form').length).toEqual(0);
    wrapper.find(AuthStatus).find('a').simulate('click');
    expect(wrapper.find('form').length).toEqual(1);
  });

  test('renders signed in user\'s username when user is authenticated', () => {
    const wrapper = mount(<Auth {...{ user: { username: 'johndoe' } }} />);
    expect(wrapper.find(AuthStatus).find('span').text())
      .toContain('johndoe');
  });

  test('calls the [signOutUser] prop function when signOut btn is clicked', () => {
    const props = {
      signOutUser: jest.fn(),
      user: { username: 'john doe' },
    };
    const wrapper = mount(<Auth {...props} />);

    const signOutBtn = wrapper.find(AuthStatus).find('a');
    signOutBtn.simulate('click');
    expect(props.signOutUser).toHaveBeenCalled();
  });

  test('[onChange] method', () => {
    const props = {
      clearError: jest.fn(),
    };
    const wrapper = mount(<Auth {...props} />);
    wrapper.setState({ showForm: true });
    const usernameInput = wrapper.find('input[name="username"]');
    usernameInput.simulate('change', { target: { value: 'johndoe', name: 'username' } });

    expect(props.clearError).toHaveBeenCalled();
    expect(wrapper.state().data.username).toEqual('johndoe');
  });

  test('[onSubmit] method', () => {
    const props = {
      authAction: jest.fn(),
    };
    const wrapper = mount(<Auth {...props} />);
    wrapper.setState({ showForm: true });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(props.authAction).toHaveBeenCalledWith('signin', wrapper.state().data);
  });
});
