import React from "react";
import Router from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import GitHubFeed from "../GitHubFeed";
import defaultGitHubFeedResponse from '../../constants/defaultResponses/defaultGitHubFeedResponse';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
 ...jest.requireActual('react-router-dom'),
 useParams: jest.fn(),
}))

const mockUseParamsValues = {
  owner: 'm3db',
  repo: 'm3',
}

const buildUseStateSpy = (...args): void =>
  jest.spyOn(React, 'useState')
    .mockImplementationOnce(() => [args[0], jest.fn()])
    .mockImplementationOnce(() => [args[1], jest.fn()])
    .mockImplementationOnce(() => [args[2], jest.fn()])
    .mockImplementationOnce(() => [args[3], jest.fn()]);

const getComponent = (): void => {
  return shallow(
    <GitHubFeed.WrappedComponent />
  );
};

describe("GitHubFeed", (): void => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue(mockUseParamsValues);
  })

  it('renders without error', (): void => {
     expect(() => {
       wrapper = getComponent();
     }).not.toThrow();
   });

 it("contains a single title with correct text", (): void => {
   wrapper = getComponent();
   expect(wrapper.find('.GitHubFeed__body__title').length).toEqual(1);
   expect(wrapper.find('.GitHubFeed__body__title').text()).toBe('Commit Feed');
 });

 it("contains a single info with correct text", (): void => {
   wrapper = getComponent();
   expect(wrapper.find('.GitHubFeed__body__info').length).toEqual(1);
   expect(wrapper.find('.GitHubFeed__body__info').text()).toBe('Showing results for /m3db/m3');
 });

 it("displays a loading animation by default", (): void => {
   wrapper = getComponent();
   expect(wrapper.find('LoadingAnimation').length).toEqual(1);
 });

 it("displays no previous feed items by default", (): void => {
   wrapper = getComponent();
   expect(wrapper.find('GitHubFeedItem').length).toEqual(0);
   expect(wrapper.find('.GitHubFeed__body__content').length).toEqual(0);
 });

 it("displays the correct number of new feed items when done loading", (): void => {
   buildUseStateSpy(defaultGitHubFeedResponse, false, '', []);
   wrapper = getComponent();
   expect(wrapper.find('GitHubFeedItem').length).toEqual(2);
 });

 it("displays a 'Load More' button when feed items are loaded", (): void => {
   buildUseStateSpy(defaultGitHubFeedResponse, false, '', []);
   wrapper = getComponent();
   expect(wrapper.find('button').length).toEqual(1);
   expect(wrapper.find('button').text()).toBe('Load More');
 });

 it("displays the correct number of previous feed items when not done loading new data", (): void => {
   buildUseStateSpy(defaultGitHubFeedResponse, true, '', defaultGitHubFeedResponse);
   wrapper = getComponent();
   expect(wrapper.find('GitHubFeedItem').length).toEqual(2);
 });

 it("successfully disabled Load More button on ref", (): void => {
   jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: true });
   buildUseStateSpy(defaultGitHubFeedResponse, false, '', []);
   wrapper = getComponent();
   expect(wrapper.find('button').prop('disabled')).toBeTruthy();
 });

});
