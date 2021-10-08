import React, { useEffect, useRef } from 'react';
import { withRouter } from "react-router";
import * as Router from 'react-router-dom';
import _ from 'lodash';

import GitHubFeedItem from '../../components/GitHubFeedItem';
import LoadingAnimation from '../../components/LoadingAnimation';

export const GitHubFeed = (): JSX.Element => {
  const githubToken = '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';
  // const perPage = 100;
  const history = Router.useHistory();
  const { owner, repo }: { owner: string, repo: string } = Router.useParams();
  const didMountRef = useRef(false);

  let [feedItems, setFeedItems] = React.useState([]);

  let [feedItemsLoading, setFeedItemsLoading] = React.useState(true);

  let [newFeedItems, setNewFeedItems] = React.useState([]);

  let [pageNumber, setPageNumber] = React.useState(1);

  let [perPage, setPerPage] = React.useState(25);

  useEffect((): void => {
    const url: string = `https://api.github.com/repos/${owner}/${repo}/commits?page=${pageNumber}&per_page=${perPage}`;
    const requestHeaders: HeadersInit = new Headers();
    const token: string = `Bearer ${githubToken}`;
    requestHeaders.set('Authorization', token);
    const options = {
      headers: requestHeaders,
    };
    const getFeedItems = async() => fetch(
      url,
      options,
    ).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        // was messing around with ways to load in smaller chunks of data
        // and was using this to split the new items apart from the ones moved into feedItems
        const newFeedReturn = [...feedItems, ...data];
        const onlyUniques = _.filter(newFeedReturn, (value) => {
          return _.countBy(newFeedReturn, ['sha', value.sha]).true === 1;
        });
        // @ts-expect-error
        setNewFeedItems(onlyUniques);
      })
      .catch(error => {
        history.push('/chronosphere/does/not/exist');
      })
      .finally(() => {
        setFeedItemsLoading(false);
      })
      setFeedItemsLoading(true);
      getFeedItems();
  }, [
    history,
    pageNumber,
    owner,
    repo,
    perPage,
  ])

  useEffect((): void => {
    if (didMountRef.current) {
      if (perPage < 100) {
        setPerPage(perPage += 25);
      } else {
        setPageNumber(pageNumber += 1);
        setPerPage(25);
      }
    } else {
      didMountRef.current = true;
    }
  }, [feedItems])


  return(
    <div className="GitHubFeed">
      <div className="GitHubFeed__body">
        <div className="GitHubFeed__body__title">
          <h1>Commit Feed</h1>
        </div>
        <div className="GitHubFeed__body__info">
          <h2>{`Showing results for /${owner}/${repo}`}</h2>
        </div>
        <div className="GitHubFeed__body__prev">
          {feedItems.map((item, index) => (
            // @ts-expect-error
            <GitHubFeedItem commit={item.commit} key={index} />
          ))}
        </div>
        {feedItemsLoading && <LoadingAnimation />}
        {!feedItemsLoading
          && (
            <div className="GitHubFeed__body__content">
              {newFeedItems.map((item, index) => (
                // @ts-expect-error
                <GitHubFeedItem commit={item.commit} key={index} />
              ))}
              <button
                className="GitHubFeed__body__content__button"
                onClick={(): void => setFeedItems(newFeedItems)}
              >
                Load More
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default withRouter(GitHubFeed);
