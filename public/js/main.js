import App from '../../src/App.js';

const renderApp = () => {
  const appHtml = App();
  const body = document.body;
  if (body) {
    body.innerHTML = appHtml;
  }
};

window.addEventListener('hashchange', renderApp);
window.addEventListener('load', renderApp);