import _ from 'lodash';
import moment from 'moment';

export const GitHubFeedItem = (commit: Object): JSX.Element => {
  const dateFormat = 'MMM D, YYYY at h:mm A';
  const date = _.get(commit, 'commit.author.date', '');
  const author = _.get(commit, 'commit.author.name', '');
  const message = _.get(commit, 'commit.message', '');
  const url = _.get(commit, 'commit.url', '');

  return(
    <div className="GitHubFeedItem">
      <div className="GitHubFeedItem__data">
        <div className="GitHubFeedItem__data__label">Date: </div>
        <div className="GitHubFeedItem__data__element">{moment(date).format(dateFormat)}</div>
      </div>
      <div className="GitHubFeedItem__data">
        <div className="GitHubFeedItem__data__label">Author: </div>
        <div className="GitHubFeedItem__data__element">{author}</div>
      </div>
      <div className="GitHubFeedItem__data">
        <div className="GitHubFeedItem__data__label">Message: </div>
        <div className="GitHubFeedItem__data__element">{message}</div>
      </div>
      <div className="GitHubFeedItem__data">
        <div className="GitHubFeedItem__data__label">URL: </div>
        <div className="GitHubFeedItem__data__element">{url}</div>
      </div>
    </div>
  );
}

export default GitHubFeedItem;
