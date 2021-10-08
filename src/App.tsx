import { withRouter } from "react-router";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import './sass/App.scss';

import GitHubFeed from './containers/GitHubFeed';
import GitHubForm from './containers/GitHubForm';
import ErrorPage from './containers/ErrorPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/chronosphere"
            component={GitHubForm}
          />
          <Route
            exact
            path="/chronosphere/does/not/exist"
            component={ErrorPage}
          />
          <Route
            path="/chronosphere/:owner/:repo"
            component={GitHubFeed}
          />
          <Redirect to="/chronosphere" />
        </Switch>
      </Router>
    </div>
  );
}

export default withRouter(App);
