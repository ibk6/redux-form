import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import {
  App,
  Code,
  Markdown,
  Values,
  generateExampleBreadcrumbs
} from 'redux-form-website-template'

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)

let render = () => {
  const RemoteSubmitForm = require('./RemoteSubmitForm').default
  const RemoteSubmitButton = require('./RemoteSubmitButton').default
  const readme = require('./RemoteSubmit.md')
  const raw = require('!!raw-loader!./RemoteSubmitForm')
  const rawButton = require('!!raw-loader!./RemoteSubmitButton')
  const rawSubmit = require('!!raw-loader!./submit')
  ReactDOM.hydrate(
    <Provider store={store}>
      <App
        /**
         * This <App/> component only provides the site wrapper.
         * Remove it on your dev server if you wish. It will not affect the functionality.
         */
        version="8.2.1"
        path="/examples/remoteSubmit"
        breadcrumbs={generateExampleBreadcrumbs(
          'remoteSubmit',
          'Remote Submit Example',
          '8.2.1'
        )}
      >
        <Markdown content={readme} />

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://codesandbox.io/s/ElYvJR21K"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.5em' }}
          >
            <i className="fa fa-codepen" /> Open in Sandbox
          </a>
        </div>

        <h2>Form</h2>

        <RemoteSubmitForm />

        <RemoteSubmitButton />

        <Values form="remoteSubmit" />

        <h2>Code</h2>

        <h4>submit.js</h4>

        <Code source={rawSubmit} />

        <h4>RemoteSubmitForm.js</h4>

        <Code source={raw} />

        <h4>RemoteSubmitButton.js</h4>

        <Code source={rawButton} />
      </App>
    </Provider>,
    dest
  )
}

render()
