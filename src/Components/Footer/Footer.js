import React from 'react';
import './Footer.css';
import Grid from '@material-ui/core/Grid';
import logo from '../../Assets/images/logo.png'
 

function Footer() {
  return (
	<footer className='footer'>
		<Grid container style={{padding: '1em 4em'}}>
	        <Grid item xs={6} className='footer-image'>
	          	<img src={logo} alt=" "/>
	        </Grid>		
	        <Grid item xs={2} className='footer-item'>
	          	<i className="fas fa-map-marker-alt"></i> 
	          	Џон Кенеди 19а, Скопје 1000, Македонија
	        </Grid>
	        <Grid item xs={2} className='footer-item'>
	          	<i className='fas fa-envelope'></i>
	          	info@rentscoot.com
	        </Grid>
	        <Grid item xs={2} className='footer-item'>
	          	<i className="fas fa-phone"></i> 
	          	+389-075-500-000
	        </Grid>
	      </Grid>
	    <Grid container>
	    	<Grid item xs={12} className='footer-item-last'>
	          	<i className="fab fa-facebook-f"></i>
	          	<i className="fab fa-instagram"></i>
	          	<i className="fab fa-twitter-square"></i>
	          	<i className="fab fa-youtube"></i>
	          	<p>Сите права задржани RentScoot ©2019</p>
	        </Grid>
	    </Grid>
	</footer>
  );
}

export default Footer;
