import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/home'
import Players from './components/players';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <BreadCrumbs crumbs={['Home']}/>,
    main: () => <Home/>
  },
  {
    path: "/games",
    sidebar: () =>  <BreadCrumbs crumbs={['Home', 'Games']}/>,
    main: () => <h2>Games</h2>
  },
  {
    path: "/newGame",
    sidebar: () =>  <BreadCrumbs crumbs={['Home', 'New Game']}/>,
    main: () => <h2>NewGame</h2>
  },
  {
    path: "/players",
    sidebar: () =>  <BreadCrumbs crumbs={['Home', 'Players']}/>,
    main: () => <Players/>
  }
];

const App = () => (
  <Router>
    <div id={'main'}>

      <div className={"nav-bar"}>
        <div className={'nav-buttons-container'}>
          <div className={'nav-button'}> <Link to="/">Home</Link> </div>
          <div className={'nav-button'}> <Link to="/games">Games</Link> </div>
          <div className={'nav-button'}> <Link to="/newGame">New Game </Link> </div>
          <div className={'nav-button'}> <Link to="/players">Players</Link> </div>
        </div>
      </div>

      {routes.map((route, index) => (
        // Render all the results(routes) for the components
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.sidebar}
        />
      ))}

      {routes.map((route, index) => (
        // Render all the results(routes) for the components
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}

    </div>
  </Router>
);

const crumb = (crumbName) => {
  const link = crumbName === 'Home' ? '/' : '/'+crumbName;
  return (
    <div key={crumbName} className={'crumb'}>
      <div className={'crumb-name'}><Link to={link}>{crumbName}</Link></div>
      <div className={'crumb-separator'}> /</div>
    </div>
  );
}

const BreadCrumbs = (crumbs) => {
  let allCrumbs = [];

  crumbs.crumbs.forEach((val)=>{
    allCrumbs.push(crumb(val))
  });

  return (
    <div className={'breadcrumbs-main'}>
      {allCrumbs}
    </div>
  )
}




export default App;