import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import source from '../../assets/ajaj.png'

const useStyles = makeStyles(() => ({
  root: {
    background: `url(${source}) no-repeat center center`,
    backgroundSize: 'contain',
  },
}))

export default ({ windowHeight }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} style={{ height: `${windowHeight}px` }} >
    </div>
  )
}
