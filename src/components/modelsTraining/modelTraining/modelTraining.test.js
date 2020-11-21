import React from 'react';
import { shallow } from 'enzyme';
import ModelTraining from './modelTraining';

describe('ModelTraining', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ModelTraining />);
    expect(wrapper).toMatchSnapshot();
  });
});
