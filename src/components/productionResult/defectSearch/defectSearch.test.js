import React from 'react';
import { shallow } from 'enzyme';
import DefectSearch from './defectSearch';

describe('DefectSearch', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DefectSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
