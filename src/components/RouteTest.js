import React from 'react'
import {Link} from 'react-router-dom'

function RouteTest() {
  return (
      <>
        <Link to={'/'}>Home</Link><br />
        <Link to={'/Diary'}>Diary</Link><br />
        <Link to={'/New'}>New</Link><br />
        <Link to={'/Edit'}>Edit</Link><br />
      </>
  )
}

export default RouteTest