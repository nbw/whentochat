import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'
import './fontawesomestyles.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
            email
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Time zone difference tool for finding time to chat' },
            { name: 'keywords', content: 'time zone, time difference, time calculator, chat, time zone chat, when to chat, whentochat, time overlap' },
          ]}
        >
          <html lang="en" />
					<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
					<meta charset="utf-8"/>
					<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Helmet>
      <div className='mainContainer' >
        <Header siteTitle={data.site.siteMetadata.title} siteSubtitle={data.site.siteMetadata.subtitle} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1100,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
      <Footer
        siteTitle={data.site.siteMetadata.title}
        email={data.site.siteMetadata.email}
      />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
