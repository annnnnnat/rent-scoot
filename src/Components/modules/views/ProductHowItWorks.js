import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import Link from 'react-router-dom/Link';


const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 255,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src=""
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Некои од нашите тротинети
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0063/2714/0425/products/left-side-folded-v2_750x.progressive.jpg?v=1572005937"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  <p>Xiaomi M365</p>
                  <ul>
                    <li>
                      Максимална брзина:25км/ч
                    </li>
                    <li>
                      Растојание со полна батерија: 30 км
                    </li>
                    <li>
                      Максимална дозволена носивост: 100 кг
                    </li>
                  </ul>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src="https://i5.walmartimages.com/asr/83047767-e785-4f29-8177-4a722076a837_1.1b231aed5d16cb0bb2a9943a543684cd.jpeg?odnWidth=450&odnHeight=450&odnBg=ffffff"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  <p>Power Core E100</p>
                  <ul>
                    <li>
                      Максимална брзина:18км/ч
                    </li>
                    <li>
                      Растојание со полна батерија: 16 км
                    </li>
                    <li>
                      Максимална дозволена носивост: 54 кг
                    </li>
                  </ul>                
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0014/0371/5678/products/LS7_-1_1000x.png?v=1567102884"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  <p>NANROBOT LS7</p>
                  <ul>
                    <li>
                      Максимална брзина:85км/ч
                    </li>
                    <li>
                      Растојание со полна батерија: 90 км
                    </li>
                    <li>
                      Максимална дозволена носивост: 150 кг
                    </li>
                  </ul>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component={Link} to="/Rent"
        >
          Резервирај сега!
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
