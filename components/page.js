import React  from 'react';
import PropTypes from 'prop-types'

import Link from 'next/link'
import { connect } from 'react-redux'


function Page({
  error,
  linkTo,
  NavigateTo,
  posts,
  title,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {posts && (
        <pre>
          <code>{JSON.stringify(posts, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}

Page.propTypes = {
  error: PropTypes.any,
  linkTo: PropTypes.any,
  title: PropTypes.any,
  NavigateTo: PropTypes.any,
  posts: PropTypes.any
};


export default connect(state => state)(Page)
