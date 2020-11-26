import React from 'react';
import { shallow } from 'enzyme';
import CreateModels from './createModels';

describe('CreateModels', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateModels />);
    expect(wrapper).toMatchSnapshot();
  });
});
