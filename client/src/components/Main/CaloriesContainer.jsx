import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Paper, TableContainer, Table, TableHead, TableRow, Fab, TableCell, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Line } from 'rc-progress'
import { setCalories } from '../../actions'
import { bindActionCreators } from 'redux'

const useStyles = makeStyles((theme) => ({
  papar: {
    margin: theme.spacing(1),
    width: '80vw',
    height: '50vh',
    position: 'absolute',
    opacity: 0.9,
    top: '25vh',
    left: '7.5vw',
  },
  gridContainer: {
    marginTop: theme.spacing(1),
  },
  tableCell: {
    borderBottom: "none",
    paddingBottom: '5px',
    paddingTop: '40px',
    fontSize: '15px',
  },
  customInput: {
    fontSize: '15px',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    width: '25px',
  },
  EditIcon: {
    color: 'black',
  },
  buttonGridItem: {
    marginTop: '6vh',
  },
  customButtonColor: {
    color: 'white',
    backgroundColor: 'rgba(70, 25, 150)',
    '&:hover': {
      backgroundColor: 'rgba(70, 25, 150)',
    },
  },
}))

function CalorieName(props) {
  const {
    classes,
    name,
    amount,
    max,
    editMode,
    anchor,
    handleChangeGoals,
    goalCalories,
  } = props

  return (
    <Grid container justify="center" spacing={2}>
      <TableContainer>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} >{name}</TableCell>
              {!editMode ? <TableCell className={classes.tableCell} align="right">{`${Math.floor(amount)}/${max} (g)`}</TableCell> :
                <TableCell className={classes.tableCell} align="right">
                  {Math.floor(amount)}/<input type="number" className={classes.customInput} value={goalCalories[anchor]} onChange={(e) => handleChangeGoals(anchor, e.target.value)} /> (g)
                </TableCell>}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Grid>

  )
}

function Buttons(props) {
  const { classes, toggleDialog, toggleEditMode } = props

  return (
    <Grid container justify="center" spacing={2}>
      <TableContainer>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} >
                <IconButton className={classes.EditIcon} onClick={toggleEditMode} >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <Fab color="primary" aria-label="add" className={classes.customButtonColor} onClick={toggleDialog} >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Grid>

  )
}

function CalorieLine(props) {
  const { amount, max, color } = props

  return (
    <Grid item xs={12}>
      <Line percent={Math.floor((amount * 100) / max)} strokeWidth="5" trailWidth="5" strokeColor={color} />
    </Grid>
  )

}

function CaloriesContainer(props) {
  const {
    toggleDialog,
    calories,
    resetAddInitialValue,
    handleSetCalories,
  } = props

  const {
    protein,
    carbs,
    fat,
    goalProtein,
    goalCarbs,
    goalFat,
  } = calories

  const [editMode, setEditMode] = useState(false)
  const [goalCalories, setGoalCalories] = useState({
    goalProtein,
    goalCarbs,
    goalFat,
  })

  const classes = useStyles()

  const openDialog = () => {
    resetAddInitialValue()
    toggleDialog()
  }

  const toggleEditMode = () => {
    if (editMode) handleSetCalories(goalCalories)
    setEditMode(!editMode)
  }

  const handleChangeGoals = (key, value) => setGoalCalories({ ...goalCalories, [key]: value })

  return (
    <Paper elevation={6} className={classes.papar} >
      <Container className={classes.gridContainer} maxWidth="sm">
        <Grid container>
          {/* CARBS */}
          <CalorieName
            editMode={editMode}
            classes={classes}
            name="Carbs"
            amount={carbs}
            max={goalCarbs}
            anchor={'goalCarbs'}
            handleChangeGoals={handleChangeGoals}
            goalCalories={goalCalories}
          />
          <CalorieLine color="rgb(83, 57, 188)" amount={carbs} max={goalCarbs} />
          {/* PROTEIN */}
          <CalorieName
            editMode={editMode}
            classes={classes}
            name="Protein"
            amount={protein}
            max={goalProtein}
            anchor={'goalProtein'}
            handleChangeGoals={handleChangeGoals}
            goalCalories={goalCalories}
          />
          <CalorieLine color="rgb(181, 16, 16)" amount={protein} max={goalProtein} />
          {/* FAT */}
          <CalorieName
            editMode={editMode}
            classes={classes}
            name="Fat"
            amount={fat}
            max={goalFat}
            anchor={'goalFat'}
            handleChangeGoals={handleChangeGoals}
            goalCalories={goalCalories}
          />
          <CalorieLine color="rgb(219, 194, 0)" amount={fat} max={goalFat} />
          {/* BUTTONS */}
          <Buttons classes={classes} toggleDialog={openDialog} toggleEditMode={toggleEditMode} />
        </Grid>
      </Container>
    </Paper>
  )
}


const mapStateToProps = ({ calories }) => ({
  calories,
})

const mapActionsToProps = dispatch => ({
  handleSetCalories: bindActionCreators(setCalories, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(CaloriesContainer))