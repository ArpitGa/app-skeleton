import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../web'

if(document) {
  try {
    ReactDOM.render(<Page />, document.getElementById('main'));
  }
  catch(err) {
    alert('Something went wrong!');
  }
}
