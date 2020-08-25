import React, { Fragment, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from "moment";
import "./Rent.css";
import BoxMap from "../Mapbox/Mapbox";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormFields from "../Form/Form";
// import * as PointData from '../../../Data/vehicle-locations.json';
import LocationService from "../../../repository/axiosLocationsRepository";
import ModelService from "../../../repository/axiosModelsAndVehiclesRepository";

function Rent({ promotions }) {
  const [locations, setLocations] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState({});
  const handleSelect = (selected) => {
    setSelectedPlace(selected);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const [availableModels, setAvailableModels] = useState([
    {
      name: "XIAOMI M365",
      amount: 2,
    },
  ]);

  const loadLocations = async () => {
    //vidi so await neshto ...
    const loc = await LocationService.fetchLocations().then((res) => {
      return res.data;
    });
    setLocations(loc);
    setSelectedPlace(loc[0]);
  };
  //
  // Takes all the available vehicles on that location inside the reservation slot, and gets the model names for further use
  const loadAvailableModels = () => {
    const dateS = moment(selectedStartDate);
    const dateE = moment(selectedEndDate);
    let dateStart = dateS.toISOString().substring(0, 10);
    let dateEnd = dateE.toISOString().substring(0, 10);
    let timeStart = dateS.toISOString().substring(11, 16);
    let timeEnd = dateE.toISOString().substring(11, 16);
    ModelService.fetchAvailableVehicles(
      selectedPlace.id,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd
    ).then((data) => {
      let allVehicles = data.data;
      const duplicateModels = allVehicles.map(
        (vehicle) => vehicle.model.modelName
      );
      //   {
      //   if(!models.includes(vehicle.model.modelName)){

      //   }

      // })
      const modelList = Array.from(new Set(duplicateModels));
      const models = modelList.map((model) => ({
        name: model,
        amount: duplicateModels.filter((name) => name === model).length,
      }));
      setAvailableModels(models);
    });
  };

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toISOString()
  );

  const handleDateStartChange = (date) => {
    setSelectedStartDate(date);
  };
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date().toISOString()
  );

  const handleDateEndChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    //Date Time picker checks
    let pickupDate = moment(selectedStartDate);
    let deadline = moment(selectedEndDate);
    let now = moment();
    const differenceReserve = deadline.diff(pickupDate, "minutes");
    const startDiff = pickupDate.diff(now, "minutes");
    // const endDiff = deadline.diff(now, 'minutes');
    if (startDiff > 0) {
      //   if(endDiff > 0){
      if (differenceReserve > 0) {
        Object.keys(selectedPlace).length > 0
          ? loadAvailableModels()
          : console.log("There is no selected place at the moment");
      } else {
        setSelectedEndDate(pickupDate.add(10, "minutes").toISOString());
      }
      //   }
      //   else setSelectedEndDate(moment().add(60, 'minutes'))
    } else {
      setSelectedStartDate(moment().add(10, "minutes"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace, selectedStartDate, selectedEndDate]);

  const clickHandler = () => {
    console.log("Click happened");
    LocationService.fetchPrices().then((res) => {
      return res.data;
    });
  };

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-around"
      >
        <Grid item sm={12} style={{ margin: "0 2em !important" }}>
          <BoxMap handleSelect={handleSelect} locations={locations} />
        </Grid>
        <Grid item sm={10} container direction="column" alignItems="center">
          <Paper className="reservation-form">
            <Grid item>
              <h2 className="legend">РЕЗЕРВИРАЈ СЕГА!</h2>
              <Button
                onClick={() => clickHandler()}
                variant="outlined"
                //size="medium"
                //color="primary"
                class="custum-button"
              >
                Види цени
              </Button>
              <p>Локација: {selectedPlace.name}</p>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item container justify="space-around">
                <Grid item xs={12} sm={6} md={3}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog-start"
                    label="Датум на подигнување"
                    format="MM/dd/yyyy"
                    placeholder="06/16/2020"
                    value={selectedStartDate}
                    minDate={new Date()}
                    onChange={handleDateStartChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog-end"
                    label="Датум на враќање"
                    format="MM/dd/yyyy"
                    placeholder="06/16/2020"
                    value={selectedEndDate}
                    minDate={new Date()}
                    onChange={handleDateEndChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker-start"
                    label="Време на подигнување"
                    value={selectedStartDate}
                    onChange={handleDateStartChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker-end"
                    label="Време на враќање"
                    value={selectedEndDate}
                    onChange={handleDateEndChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>

            <FormFields
              vehicles={availableModels}
              promotions={promotions}
              dateStart={selectedStartDate}
              dateEnd={selectedEndDate}
              location={selectedPlace}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Rent;
