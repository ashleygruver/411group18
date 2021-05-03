import { Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './components/Home'
import Test from './components/Test'
import Playlists from './components/Playlists'
import GeneratedPlaylists from './components/GeneratedPlaylists'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/playlists" component={Playlists} />
      <Route exact path="/playlists/generated" component={GeneratedPlaylists} />
    </Router>
  );
}

export default App;
