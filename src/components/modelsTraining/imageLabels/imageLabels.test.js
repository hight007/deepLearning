import React from 'react';
import { shallow } from 'enzyme';
import ImageLabels from './imageLabels';

describe('ImageLabels', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ImageLabels />);
    expect(wrapper).toMatchSnapshot();
  });
});
