import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

const getComponent = (): void => {
  return shallow(
    <App.WrappedComponent />
  );
};

describe('<App />', (): void => {
  it("renders correctly", () => {
    getComponent();
  });

  it('has a single app container', (): void => {
    const wrapper = getComponent();
    expect(wrapper.find('.App')).toHaveLength(1);
  })

});
