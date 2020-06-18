import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'

function Main() {
  return (
    <div>
      hello
    </div>
  )
}


const mapStateToProps = () => ({
})

const mapActionsToProps = dispatch => ({
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(Main))