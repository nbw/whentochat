import React from 'react'

import Layout from '../components/layout'
import search from '../images/whentochat.gif'

const FaqPage = () => (
  <Layout>
    <h1>Frequently Asked Questions</h1>
    <h2>1. Where's the search button?</h2>
    <p>
      There isn't one! Once you've selected two locations from the location input dropdowns, a search is automatically triggered. If you're not seeing dropdown results, then refer to #2. Sounds like a browser issue. <span role="img" aria-label="oops">🙃</span>
    </p>
    <h2>2. Search not working?</h2>
    <p>
      Sometimes the dropdown input fields don't work. This is typically due to a browser plugin that's mucking things up. <b>Try disabling your browser plugins, and/or trying a differnt browser entirely.</b> If you're having issues, please send me an email (with your setup). I'd appreciate it a lot.
    </p>
    <p>This is what you should be expecting to happen:</p>
    <img
      style={{
        border: '1px solid white'
      }}
      src={search} alt="search" />
    <p>In the meantime, it's an issue that I'm looking into.</p>
    <h2>Have a suggestion?</h2>
    <p>Send me an email or find me on Twitter!</p>
  </Layout>
)

export default FaqPage
