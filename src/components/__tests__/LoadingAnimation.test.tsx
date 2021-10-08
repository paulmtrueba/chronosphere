import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import LoadignAnimation from "../LoadingAnimation";

configure({ adapter: new Adapter() });

describe("LoadingAnimation", (): void => {
 it("renders correctly", (): void => {
   shallow(<LoadignAnimation />);
 });

 it("includes a single loadign animation element", (): void => {
   const wrapper = shallow(<LoadignAnimation />);
   expect(wrapper.find('.lds-ellipsis').length).toEqual(1);
 });

});
