import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../client/reducers';

import { getAllPaths } from './services/corePaths';
import { getAllCourses } from './services/coreCourses';
import { getAllLessons } from './services/coreLessons';
import { getAllSubjects } from './services/coreSubjects';

import App from '../client/App';

import routes from '../client/routes';

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/style.css">`;

const renderPage = (reactHTML, initialState) => `
  <!DOCTYPE html>
  <html lang="en_US">
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      <meta name="description" content="React/Redux Front-end for DevGaido">
      <meta name="author" content="Chingu DevGaido Team">
      ${cssFile}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <title>DevGaido - Chingu Learning Path</title>
    </head>
    <body>
      <div id="root">${reactHTML}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
      <script src="${webRoot}/vendor.bundle.js"></script>
      <script src="${webRoot}/client.bundle.js"></script>
    </body>
  </html>
  `;

// We need to provide the serverMatch prop to <App /> since we are on the server side
// and can only render a single route with StaticRouter (Switch is not working like on client side)
const initialView = (req, match, store) => renderToString(
  <Provider store={store}>
    <StaticRouter context={{}} location={match.path}>
      <App serverMatch={match} />
    </StaticRouter>
  </Provider>,
  );

export default (req, res, next) => {
  let match = null;
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component, passdown: route.passdown };
    }
  });

  if (!match) {
    next();
  } else {
     // TODO: Add subjects list to initial store at this point.
    const user = req.user ? { name: req.user.nickname, authenticated: true }
                          : { name: '', authenticated: false };
    const curriculum = {
      subjects: getAllSubjects(),
      paths: getAllPaths(),
      courses: getAllCourses(),
      lessons: getAllLessons(),
    };

    const uiState = {
      Pages: {
        Paths: {
          pathStates: [],
        },
      },
    };

    const nPaths = curriculum.paths.length;
    for (let i = 0; i < nPaths; i += 1) {
      uiState.Pages.Paths.pathStates.push({
        id: i,
        opened: false,
      });
    }
    const state = { user, curriculum, uiState };
    const store = createStore(reducers, state);

    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match, store), state));
  }
};
