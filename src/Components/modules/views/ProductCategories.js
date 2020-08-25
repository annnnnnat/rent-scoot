import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import image7 from '../../../Assets/images/image7.jpg';
import image8 from '../../../Assets/images/image8.jpg';
import image9 from '../../../Assets/images/image9.jpg';
import image10 from '../../../Assets/images/image10.jpg';
import image11 from '../../../Assets/images/image11.jpg';
import image12 from '../../../Assets/images/image12.jpg';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://cdn.shopify.com/s/files/1/0063/2714/0425/products/left-side-folded-v2_750x.progressive.jpg?v=1572005937',
      title: 'Xiaomi M365',
      width: '40%',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0063/2714/0425/products/ES2_New_1_750x.progressive.jpg?v=1571148517',
      title: 'Ninebot Segway ES2',
      width: '20%',
    },
    {
      url:image7,
      title: 'Inokim - Ox',
      width: '40%',
    },
    {
      url:
        'https://cdn.shopify.com/s/files/1/0063/2714/0425/products/0Z7A8100_750x.png?v=1559249238',
      title: 'Egret - Ten',
      width: '38%',
    },
    {
      url:image8,
      title: '',
      width: '38%',
    },
    {
      url: image9,
      title: 'E Prime',
      width: '24%',
    },
    {
      url: image10,
      title: 'Macwheel',
      width: '40%',
    },
    {
      url: image11,
      title: '',
      width: '20%',
    },
        {
      url: image12,
      title: 'Black Label Power A5',
      width: '40%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Галерија
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
