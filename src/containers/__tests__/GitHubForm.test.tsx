import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import GitHubForm from "../GitHubForm";

configure({ adapter: new Adapter() });

describe("GitHuBForm", () => {
 it("renders correctly", () => {
   shallow(<GitHubForm />);
 });

 it("includes two inputs", () => {
   const wrapper = shallow(<GitHubForm />);
   expect(wrapper.find('.GitHubForm__input').length).toEqual(2);
 });

 it("includes a single button", () => {
   const wrapper = shallow(<GitHubForm />);
   expect(wrapper.find('.GitHubForm__button').length).toEqual(1);
 });
});
