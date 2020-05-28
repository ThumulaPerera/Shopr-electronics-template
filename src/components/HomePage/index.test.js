/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import {
  Header, List, Icon, Button,
} from 'semantic-ui-react';

import HomePage from './index';


afterEach(cleanup);
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomePage />, div);
});

test('renders headers', () => {
  const wrapper = shallow(<HomePage />);
  const mainHeader = (
    <Header
      as="h1"
      content="SHOPR"
      style={{
        fontSize: '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '.1em',
      }}
    />
  );
  const subHeader = (
    <Header
      as="h2"
      content="Your one stop shop to build your E-Commerce Website"
      style={{
        fontSize: '1.5em',
        fontWeight: 'normal',
        marginTop: '0.5em',
      }}
    />
  );
  const electronicsHeader = (
    <Header>
      Electronics Shop Template
    </Header>
  );
  expect(wrapper).toContainReact(mainHeader);
  expect(wrapper).toContainReact(subHeader);
  expect(wrapper).toContainReact(electronicsHeader);
});

test('renders message list', () => {
  const wrapper = shallow(<HomePage />);
  const messageList = [
    'Create a custom website using our built-in templates',
    'Sell your products online',
    'Manage Inventory',
    'Integrate your website with your Facebook Page',
  ];
  const list = (
    <List size="huge">
      {
        messageList.map((message) => (
          <List.Item key={message}>
            <Icon name="check" />
            <List.Content>
              <List.Header>{message}</List.Header>
            </List.Content>
          </List.Item>
        ))
      }
    </List>
  );
  expect(wrapper).toContainReact(list);
});

test('renders get started button', () => {
  const wrapper = shallow(<HomePage />);
  const button = (
    <Button
      as="a"
      href="https://www.shopr.cf/"
      primary
      size="massive"
    >
      Get Started
      <Icon name="right arrow" />
    </Button>
  );
  expect(wrapper).toContainReact(button);
});

test('get started button has correct redirect url', () => {
  render(<HomePage />);
  expect(document.querySelector('a').getAttribute('href')).toBe('https://www.shopr.cf/');
});
