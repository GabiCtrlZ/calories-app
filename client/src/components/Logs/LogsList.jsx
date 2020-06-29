import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}))

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const LogsListItem = ({
  history,
  item,
}) => {
  const date = new Date(item.date)
  return (<ListItem button onClick={() => history.push(`/logs/${item._id}`)} >
    <ListItemAvatar>
      <Avatar>
        {date.getDay() < 5 ? <WorkIcon /> : <BeachAccessIcon />}
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={days[date.getDay()]} secondary={date.toDateString()} />
  </ListItem>)
}

function LogsList(props) {
  const { logs } = props
  const classes = useStyles()

  const history = useHistory()

  return (
    <div>
      <List className={classes.root}>
        {logs.map(e => <LogsListItem key={e._id} history={history} item={e} />)}
      </List>
    </div>
  )
}

const mapStateToProps = ({ logs }) => ({
  logs
})

const mapActionsToProps = dispatch => ({
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(LogsList))