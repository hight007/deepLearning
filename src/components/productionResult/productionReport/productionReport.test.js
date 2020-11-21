import React from 'react';
import { shallow } from 'enzyme';
import ProductionReport from './productionReport';

describe('ProductionReport', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ProductionReport />);
    expect(wrapper).toMatchSnapshot();
  });
});
