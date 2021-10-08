import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import GitHubFeedItem from "../GitHubFeedItem";
import defaultGitHubFeedItem from '../../constants/defaultResponses/defaultGitHubFeedItemResponse';

configure({ adapter: new Adapter() });

const getMockedProps = (): GitHubFeedItemProps  => ({
  commit: {},
});

describe("GitHubFeedItem", (): void => {
  let mockedProps;

  beforeEach(() => {
    mockedProps = getMockedProps();
  });

 it("renders correctly", (): void => {
   shallow(<GitHubFeedItem />);
 });

 it("correctly renders the item data provided to the component", (): void => {
   mockedProps.commit = defaultGitHubFeedItem;
   const wrapper = shallow(<GitHubFeedItem { ...mockedProps }/>);
   expect(wrapper.find('.GitHubFeedItem__data').length).toEqual(4);
   expect(wrapper.find('.GitHubFeedItem__data__element').at(0).text()).toBe('Oct 6, 2021 amt 3:22 AM');
   expect(wrapper.find('.GitHubFeedItem__data__element').at(1).text()).toBe('Antanas');
   expect(wrapper.find('.GitHubFeedItem__data__element').at(2).text()).toBe('[coordinator] fix flaky test (#3822)');
   expect(wrapper.find('.GitHubFeedItem__data__element').at(3).text()).toBe('https://api.github.com/repos/m3db/m3/git/commits/1c72e40fec2cd7b2d67c12c6fbef06169d53205a');
 });

});
