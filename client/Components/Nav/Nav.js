import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const loggedInLinks = [
  {
    path: '/data',
    type: 'Reports'
  },
  {
    path: '/play',
    type: 'Play'
  }
]

const loggedOutLinks = [
  {
    path: '/login',
    type: 'Login'
  }
]

const Nav = ({ user }) => {
  return (
    <div>
      {user
        ? loggedInLinks
        : loggedOutLinks.map(link => (
            <Link to={link.path} key={link.path}>
              {link.type}
            </Link>
          ))}
    </div>
  )
}

export default connect(mapStateToProps)(Nav)
