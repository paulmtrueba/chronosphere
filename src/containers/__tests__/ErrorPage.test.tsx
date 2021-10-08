import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ErrorPage from "../ErrorPage";

configure({ adapter: new Adapter() });

describe("ErrorPage", (): void => {
 it("renders correctly", (): void => {
   shallow(<ErrorPage />);
 });

 it("includes a single error", (): void => {
   const wrapper = shallow(<ErrorPage />);
   expect(wrapper.find('.ErrorPage').length).toEqual(1);
 });

 it("contains the correct error text", (): void => {
   const wrapper = shallow(<ErrorPage />);
   expect(wrapper.find('.ErrorPage__text').text()).toBe('The Repo Feed That You Were Looking For Does Not Exist');
 });
});
