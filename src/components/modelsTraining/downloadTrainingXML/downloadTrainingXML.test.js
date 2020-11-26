import React from 'react';
import { shallow } from 'enzyme';
import DownloadTrainingXML from './downloadTrainingXML';

describe('DownloadTrainingXML', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DownloadTrainingXML />);
    expect(wrapper).toMatchSnapshot();
  });
});
