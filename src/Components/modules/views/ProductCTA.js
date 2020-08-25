import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Button from '../components/Button';
import image from '../../../Assets/images/image6.jpg'
import './css/ProductCTA.css'
import emailjs from 'emailjs-com'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ProductCTA() {

  const [email,setEmail] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEmail = () => {
    setEmail("");
  }
 
  const handleSubmit = (event) =>{
      
      let moment = "";
  {moment = document.getElementById("mail").value;}
      event.preventDefault()
      const templateParams = {
        email: moment
      }
       emailjs.send(
        'gmail',
        'template_ii0Roqxo',
         templateParams,
        'user_MOSCUCzUTNRwgqfcKKeJb'
       )
       handleEmail();
     }
   

  
    return (
      <Container component="section">
        <Grid container m={2}>
          <Grid item xs={6} md={6} className="left-grid">
            <div>
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Најавете се за промоции
                </Typography>
                <input type="email" id="mail" required placeholder="вашиот мејл" className="mail-class"/>
                <Button type="submit" onClick={handleClickOpen} color="primary" variant="contained">
                  Зачувај
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={6} md={6} className="right-grid">
            <Hidden smDown>
              <div />
              <img className="image-class"
                src={image}
                alt="call to action"
              />
            </Hidden>
          </Grid>
        </Grid>
        <Grid container m={2}>
          <Grid item xs={2} md={2} className="left-grid-full">
            <div>
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Најавете се за промоции
                </Typography>
                <input type="email" id="mail" required placeholder="вашиот мејл" className="mail-class"/>
                <Button type="submit" onClick={handleClickOpen} color="primary" variant="contained">
                  Зачувај
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"Успешно регистрирање на листа! "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Набрзо ќе добиете повеќе информации на вашата електронска пошта.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Во ред
          </Button>
        </DialogActions>
      </Dialog> 
      </Container>
    );
  }


