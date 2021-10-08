import { useState } from 'react';
import { useHistory } from "react-router";

export const GitHubForm = (): JSX.Element => {
  const history = useHistory();

  let [owner, setOwner] = useState('');

  let [repo, setRepo] = useState('');

  return(
    <div className="GitHubForm">
      <div className="GitHubForm__input">
        <label htmlFor="owner">Owner: </label>
        <input onChange={event => setOwner(event.target.value)} name="owner" />
      </div>
      <div className="GitHubForm__input">
        <label htmlFor="repo">Repo: </label>
        <input onChange={event => setRepo(event.target.value)} name="repo" />
      </div>
      <div className="GitHubForm__button">
        <button
          disabled={owner.length === 0 || repo.length === 0}
          onClick={(): void => history.push(`/chronosphere/${owner}/${repo}`)}
        >
          Grab Repo Commits
        </button>
      </div>
    </div>
  );
}

export default GitHubForm;
