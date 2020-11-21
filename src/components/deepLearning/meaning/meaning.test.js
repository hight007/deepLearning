import React from 'react';
import { shallow } from 'enzyme';
import Meaning from './meaning';

describe('Meaning', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Meaning />);
    expect(wrapper).toMatchSnapshot();
  });
});
