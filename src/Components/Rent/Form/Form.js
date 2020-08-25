import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, useField } from "formik";
import * as Yup from "yup";
import moment from "moment";
// import emailjs from 'emailjs-com'
import "./Form.css";
import {
  FormControl,
  Grid,
  OutlinedInput,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
  useTheme,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReservationService from "../../../repository/axiosReservationsRepository";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
    maxWidth: 400,
  },
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

// const ITEM_HEIGHT = 60;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

const MyNumberInput = ({ id, InputProps, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      type="number"
      id={id}
      label="Број"
      variant="outlined"
      InputProps={InputProps}
      InputLabelProps={{ shrink: true }}
      error={!!errorText}
    />
  );
};

function getStyles(name, vehicleName, theme) {
  return {
    fontWeight:
      vehicleName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const myEmailValidation = (email) => {
  let errMsg;
  if (email !== "user@email.com" && email !== "admin@rentScoot.com")
    errMsg =
      "За тестирање користете ги следните адреси: user@email.com и admin@rentScoot.com";
  return errMsg;
};
//custom validation to validate every elemnet of FieldArray
const myValidation = (amount, maxAmount, initMax, index) => {
  let errMsg;
  if (index !== 0) {
    if (amount > maxAmount)
      errMsg =
        "За жал нема повеќе слободни возила од овој модел. Изберете друг модел на возило!";
  } else {
    if (amount > initMax)
      errMsg =
        "За жал нема повеќе слободни возила од овој модел. Изберете друг модел на возило!";
  }
  return errMsg;
};

const RentSchema = Yup.object().shape({
  firstName: Yup.string().max(50, "Премногу долго!").required("Задолжително!"),
  lastName: Yup.string()
    .min(2, "Премногу кратко!")
    .max(50, "Премногу долго!")
    .required("Задолжително!"),
  email: Yup.string().email("Невалиден формат!").required("Задолжително!"),
  phone: Yup.number()
    .min(70000000, "Невалиден формат!")
    .max(78999999, "Невалиден формат!")
    .required("Задолжително!"),
  models: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Мора да изберете модел на возило!"),
      amount: Yup.number()
        .required("Изберете едно или повеќе возила!")
        .min(1, "Изберете едно или повеќе возила!")
        .max(
          50,
          "За жал нема повеќе слободни возила од овој модел. Изберете друг модел на возило!"
        ),
    })
  ),
});
export default function FormFields({
  dateStart,
  dateEnd,
  location,
  vehicles,
  promotions,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [discount, setDiscount] = useState(0);

  const [models, setModels] = useState([]);

  const [price, setPrice] = useState(100);

  useEffect(() => {
    //calculate price every model change
    //console.log(models);
    if (Object.keys(location).length > 0) {
      let momentPrice = 0;
      let deadline = moment(dateEnd);
      let pickupTime = moment(dateStart);
      const totalMinutes = deadline.diff(pickupTime, "minutes");
      momentPrice = models
        .map((model) => {
          return (
            location.vehicles.find((veh) => veh.model.modelName === model.name)
              .model.pricePerMinute * model.amount
          );
        })
        .reduce((a, b) => a + b, 0);
      // console.log(`vkCenaZaMin: ${momentPrice}`);
      // console.log(`vkMin: ${totalMinutes}`);
      const totalPrice = momentPrice * totalMinutes;
      setPrice(totalPrice - totalPrice * discount);
    }
  }, [models, dateStart, dateEnd, discount, location]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: "",
          lastName: "",
          email: "user@email.com",
          phone: "",
          dateStart: "",
          dateEnd: "",
          hourStart: "",
          hourEnd: "",
          location: location.name,
          models: [
            {
              name: vehicles[0].name,
              amount: 1,
              maxAmount: vehicles[0].amount,
            },
          ],
          promotion: "None",
        }}
        validationSchema={RentSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          // same shape as initial values
          values.dateStart = moment(dateStart).toISOString().substring(0, 10);
          values.dateEnd = moment(dateEnd).toISOString().substring(0, 10);
          values.hourStart = moment(dateStart).toISOString().substring(11, 16);
          values.hourEnd = moment(dateEnd).toISOString().substring(11, 16);
          // Needed parameters
          let allVehicles = [];
          values.models.forEach((model) => {
            for (let i = 0; i < model.amount; i++) {
              allVehicles.push(model.name);
            }
          });
          const listVehicles = allVehicles.join(",");
          let promotion = values.promotion;
          if (promotion === "None") promotion = "Regular";
          // RESERVE
          const reservation = {
            userEmail: values.email, //Should be userId or email taken from State or Redux
            locationId: location.id,
            modelNames: listVehicles, // Should be [model1,model1,model3...]
            promotion: promotion, // CURRENTLY THERE ARE NO PROMOTIONS values.promotion (Give him a list of promotions if any is available)
            startDate: values.dateStart,
            startTime: values.hourStart,
            endDate: values.dateEnd,
            endTime: values.hourEnd,
          };
          console.log(reservation);
          ReservationService.createReservation(reservation)
            .then((res) => {
              //Show succes DIALOG
              handleClickOpen();
              console.log(res.data);
              //Take him to Reservations
            })
            .catch((err) => {
              console.log(err.message);
            });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values, handleChange }) => {
          setModels(values.models);
          values.promotion === "None"
            ? setDiscount(0)
            : setDiscount(
                promotions.find((p) => p.name === values.promotion).discount
              );
          return (
            <Form>
              {/* <MySelectionList className='form-field' name="vehicle" value={vehicle} listItems={vehicles}
          /> */}

              <FieldArray name="models">
                {(arrayHelpers) => (
                  <Grid
                    item
                    container
                    xs={12}
                    direction="column"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        size="medium"
                        color="primary"
                        onClick={() => {
                          const uniqueModels = vehicles.filter(
                            (m) =>
                              values.models.filter((m1) => m1.name === m.name)
                                .length === 0
                          );
                          if (values.models.length < vehicles.length) {
                            arrayHelpers.push({
                              name: uniqueModels[0].name,
                              amount: 1,
                              maxAmount: uniqueModels[0].amount,
                            });
                            // setModels(values.models); // - Values are not updated immediately after arrayHelpers.push
                          }
                        }}
                      >
                        Додај возила
                      </Button>
                    </Grid>
                    {values.models.map((model, index) => {
                      return (
                        <Grid
                          item
                          container
                          key={index}
                          justify="center"
                          alignItems="center"
                        >
                          <Field
                            name={`models.${index}.name`}
                            className={classes.margin}
                            type="select"
                            as={Select}
                            onChange={(e) => {
                              handleChange(e);
                              model.maxAmount = vehicles.find(
                                (vh) => vh.name === model.name
                              ).maxAmount;
                            }}
                          >
                            {" "}
                            {/* Will Formik rerender after a change happens here ? It should happen. */}
                            {
                              // Show only options(VHmodels) that are not already choosen
                              vehicles &&
                                vehicles
                                  .filter(
                                    (opt) =>
                                      values.models.filter((ml) =>
                                        model.name === ml.name
                                          ? false
                                          : ml.name === opt.name
                                      ).length === 0
                                  )
                                  .map((vh) => (
                                    <MenuItem
                                      key={vh.name}
                                      value={vh.name}
                                      style={getStyles(
                                        vh.name,
                                        vehicles,
                                        theme
                                      )}
                                    >
                                      {vh.name}
                                    </MenuItem>
                                  ))
                            }
                          </Field>
                          <MyNumberInput
                            name={`models.${index}.amount`}
                            validate={() =>
                              myValidation(
                                model.amount,
                                model.maxAmount,
                                vehicles[0].amount,
                                index
                              )
                            }
                            id={`standard-number-${index}`}
                            InputProps={{
                              inputProps: {
                                min: "1",
                                max: `${model.maxAmount}`,
                              },
                            }}
                          />

                          <IconButton
                            area-label="delete"
                            className={classes.margin}
                            onClick={() => {
                              if (values.models.length > 1) {
                                arrayHelpers.remove(index);
                                // console.log("Form models just after delete, just before injecting");
                                // console.log(values.models);
                                // setModels(values.models);
                              } else {
                                // show error
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </FieldArray>
              {errors.models ? (
                <Grid item>
                  <span className="validator">
                    {
                      errors.models.find(
                        (m) =>
                          m && (m.amount !== undefined || m.amount !== null)
                      ).amount
                    }
                  </span>
                </Grid>
              ) : null}
              <Grid item>
                <Field
                  name="promotion"
                  className={classes.margin}
                  type="select"
                  as={Select}
                >
                  <MenuItem key="None" value="None">
                    Промоција
                  </MenuItem>
                  {promotions &&
                    promotions.map((promo) =>
                      promo.name === "Regular" ? null : (
                        <MenuItem
                          key={promo.name}
                          value={promo.name}
                          style={getStyles(
                            promo.name,
                            promotions.map((p) => p.name),
                            theme
                          )}
                        >
                          {promo.name}
                        </MenuItem>
                      )
                    )}
                </Field>
              </Grid>

              <Grid item>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outline-amount">Цена</InputLabel>
                  <OutlinedInput
                    id="outline-amount"
                    value={price}
                    startAdornment={
                      <InputAdornment position="start">ден</InputAdornment>
                    }
                    labelWidth={40}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Field
                  className="form-field"
                  name="firstName"
                  placeholder="Име"
                />
                {errors.firstName && touched.firstName ? (
                  <span className="validator">{errors.firstName}</span>
                ) : null}
                <Field
                  className="form-field"
                  name="lastName"
                  placeholder="Презиме"
                />
                {errors.lastName && touched.lastName ? (
                  <span className="validator">{errors.lastName}</span>
                ) : null}
                <Field
                  className="form-field"
                  name="email"
                  validate={() => myEmailValidation(values.email)}
                  type="email"
                  placeholder="Електронска пошта"
                />
                {errors.email && touched.email ? (
                  <span className="validator">{errors.email}</span>
                ) : null}
                <Field
                  className="form-field"
                  name="phone"
                  type="number"
                  placeholder="Телефон"
                />
                {errors.phone && touched.phone ? (
                  <span className="validator">{errors.phone}</span>
                ) : null}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<Icon>send</Icon>}
                  disabled={isSubmitting}
                >
                  РЕЗЕРВИРАЈ
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Вашата нарачка беше успешна! "}
        </DialogTitle>
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
    </div>
  );
}
