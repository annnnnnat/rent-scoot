import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import './css/ProductValues.css'

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <i className="fas fa-calendar-alt"></i>
              <Typography variant="h6" className={classes.title}>
                Чекор 1: Резервирај
              </Typography>
              <Typography variant="h5">
                {`Изнајмете електричен тротинет преку нашиот формулар за резервација. 
                  По приемот на вашето барање за резервација, ќе Ве контактираме за да ја потврдиме истата.`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <i className="fas fa-location-arrow"></i>
              <Typography variant="h6" className={classes.title}>
                Чекор 2: Подигни
              </Typography>
              <Typography variant="h5">
                {`Одвозете со вашиот електричен тротинет од избраната локација. Пред закажаниот термин за изнајмување 
                ќе Ви пратиме код за верификација потребен за подигнувањето.`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <i className="fas fa-exchange-alt"></i>
              <Typography variant="h6" className={classes.title}>
                Чекор 3:Користење и враќање
              </Typography>
              <Typography variant="h5">
                {`На крајот на времето за изнајмување, потребно е изнајмениот електричен 
                  тротинет да се врати на една од постоечките локации за изнајмување.`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
