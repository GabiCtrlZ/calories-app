import React from 'react'
import { connect } from 'react-redux'
import { TableContainer, Table, TableHead, TableRow, TableCell, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Line } from 'rc-progress'

const useStyles = makeStyles((theme) => ({
  tableCell: {
    borderBottom: "none",
    paddingBottom: '12px',
    fontSize: '20px',
    color: 'white',
  },
}))

function CalorieName(props) {
  const { classes, name, amount, max } = props

  return (
    <Grid container justify="center" spacing={2}>
      <TableContainer>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} >{name}</TableCell>
              <TableCell className={classes.tableCell} align="right">{`${Math.floor(amount)}/${max}`}</TableCell>
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

function TotalCalories(props) {
  const { calories } = props
  const {
    protein,
    carbs,
    fat,
    goalProtein,
    goalCarbs,
    goalFat,
  } = calories
  const classes = useStyles()

  const calcCalories = (p, c, f) => (p * 4 + c * 4 + f * 9)

  return (
    <Container maxWidth="sm">
      <Grid container >
        {/* CARBS */}
        <CalorieName classes={classes} name="Calories" amount={calcCalories(protein, carbs, fat)} max={calcCalories(goalProtein, goalCarbs, goalFat)} />
        <CalorieLine color="rgb(40, 188, 73)" amount={calcCalories(protein, carbs, fat)} max={calcCalories(goalProtein, goalCarbs, goalFat)} />
      </Grid>
    </Container>
  )
}


const mapStateToProps = ({ calories }) => ({
  calories,
})

export default (connect(
  mapStateToProps,
)(TotalCalories))