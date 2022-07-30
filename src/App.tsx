import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home/Home"
import Welcome from "./pages/welcome/Welcome"
import Setup from "./pages/welcome/setup/Setup"
import SetupServer from "./pages/welcome/setup/SetupServer"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="welcome">
            <Route index element={<Welcome />} />
            <Route path="setup" element={<Setup />} />
            <Route path="setupServer" element={<SetupServer />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
