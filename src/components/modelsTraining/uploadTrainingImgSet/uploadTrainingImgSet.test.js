import React from 'react';
import { shallow } from 'enzyme';
import UploadTrainingImgSet from './uploadTrainingImgSet';

describe('UploadTrainingImgSet', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UploadTrainingImgSet />);
    expect(wrapper).toMatchSnapshot();
  });
});
