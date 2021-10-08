import React from 'react';
import { withRouter } from "react-router";
import * as Router from 'react-router-dom';
import _ from 'lodash';

import parseLinkHeader from '../../lib/parseLinkHeader';

import GitHubFeedItem from '../../components/GitHubFeedItem';
import LoadingAnimation from '../../components/LoadingAnimation';

export const GitHubFeed = (): JSX.Element => {
  const githubToken = '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';
  const perPage = 25;
  const history = Router.useHistory();
  const { owner, repo }: { owner: string, repo: string } = Router.useParams();
  const disableLoad = React.useRef(false);

  let [feedItems, setFeedItems] = React.useState([]);

  let [feedItemsLoading, setFeedItemsLoading] = React.useState(true);

  let [link, setLink] = React.useState(
    `https://api.github.com/repos/${owner}/${repo}/commits?page=1&per_page=${perPage}`
  );

  let [newFeedItems, setNewFeedItems] = React.useState([]);

  React.useEffect((): void => {
    const url: string = link;
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
        const linkResponseHeader = parseLinkHeader(response.headers.get('link'));
        if (_.isEmpty(_.get(linkResponseHeader, 'next', ''))) {
          disableLoad.current = true;
        }
        // @ts-expect-error
        setLink(linkResponseHeader.next);
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setNewFeedItems(data);
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
    feedItems,
    history,
  ])

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
                disabled={disableLoad.current}
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
