import React from 'react';
import PropTypes from 'prop-types';

const goBack = (history) => {
  if (!(history.location.state && history.location.state.redirectFromHome)) {
    history.goBack();
  }
};

const BackButton = ({ history }) => (
  <button
    className="back-button border-none"
    onClick={() => goBack(history)}
    ref={(domElem) => { this.buttonRef = domElem; }}
  >
    <i className="fa icon-arrow-left h1" />
  </button>
);

BackButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};


export default BackButton;
