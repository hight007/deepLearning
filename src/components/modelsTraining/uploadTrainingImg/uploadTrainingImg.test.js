import React from 'react';
import { shallow } from 'enzyme';
import UploadTrainingImg from './uploadTrainingImg';

describe('UploadTrainingImg', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UploadTrainingImg />);
    expect(wrapper).toMatchSnapshot();
  });
});
