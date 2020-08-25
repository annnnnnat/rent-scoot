import React,{useState} from 'react';
import ReactMap,{Marker,Popup} from 'react-map-gl';
// import * as PointData from '../../../Data/vehicle-locations.json';
import {Button} from '@material-ui/core';
import LocImg from '../../../Assets/images/scooter-svgrepo-com (1).svg';
import './Mapbox.css';

export default function Map({handleSelect,locations}){
    const[viewport, setViewport] = useState({
        latitude: 41.994010,
        longitude: 21.435920,
        width: '100%',
        height: '80vh',
        zoom: 10
    });
    const styles = {
       borderRadius: "3px"
    };

    const[selectedPlace, setSelectedPlace] = useState(null);

    
    return (<div style={{margin: '1em 2em'}}>
        <ReactMap {...viewport}
         mapboxApiAccessToken="pk.eyJ1IjoiaHJpc3RpamFuc3JtIiwiYSI6ImNrMmNmdGhnejA0aXgzYm8wbXlzcGdjcXcifQ.u48U8MvhK5IPyoiyci6jXw"
         mapStyle = "mapbox://styles/hristijansrm/ck2cwqhel0fta1co4nkwkadlz"
         onViewportChange ={(viewport)=>{setViewport(viewport);}}
         >
         <div className='map-insturctions'>
            <h3>Начин на користење на мапата</h3>
            <p>
                За повеќе детали, притиснете на локациите, каде ве чека голем избор на тротинети.
            </p>
         </div>
             {locations.map((point)=>(
                 <Marker key={point.id}
                    latitude={point.coordinates.x}  longitude={point.coordinates.y}>
                     <Button size="small" style={styles} 
                        onClick = {e => {
                         e.preventDefault();
                         setSelectedPlace(point);
                         handleSelect(point);
                     }}>
                     <img src={LocImg} style={{width:"3.2em",height:"3.2em"}} alt="Rental locations"></img>
                     </Button>
                 </Marker>
             ))}
             {selectedPlace ? ( <Popup latitude={selectedPlace.popupCoordinates.x} 
                       longitude={selectedPlace.popupCoordinates.y}
                       onClose= {()=>{
                           setSelectedPlace(null);
                       }}
                       >
                    <div>
                        <h2>{selectedPlace.name}</h2>
                        <p>{selectedPlace.description}</p>
                        {/* <p>{selectedPlace.vehicles.count} available vehicles.</p> */}
                    </div>
                </Popup>
             ) : null}
         </ReactMap>
    </div>
    );
}