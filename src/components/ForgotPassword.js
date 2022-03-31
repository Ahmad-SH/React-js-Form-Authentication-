import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../authenticationContext/AuthContext";
const ForgotPassword = () => {
  const classes = styles();
  const history = useHistory()
  const emailRef = useRef();
 

  const {  passwordReset } = useAuth();
  const [error, seterror] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

 

  const formSubmitHandler = async (e) => {
      e.preventDefault();
   
    try {
        seterror('')
        setLoading(true)
        await passwordReset(emailRef.current.value)
        setMessage('check your inbox for password reset')
    }catch{
        seterror('Failed to reset password, wrong email address')
    }
    setLoading(false)
  };
  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={formSubmitHandler}>
        <p className={classes.formMain}>Reset Password</p>
       {error && <p>{error}</p> }
       {!error && <p>{message}</p>}
        <div className={classes.textInput}>
          <TextField
          inputRef={emailRef}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="dense"
            required
          />
          
        </div>
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
          style={{ width: "30%" }}
          disabled={loading}
        >
        Send Link
        </Button>
      </form>
      <Typography className={classes.text} variant="h6">
        <Link to="/signin">Sign in</Link>.
      </Typography>
      <Typography styles={{fontSize:'10px'}}>
         Need an account?<Link to="/signup">Sign up</Link>.
      </Typography>
    </div>
  );
};

export default ForgotPassword;
const styles = makeStyles((theme) => ({
  form: {
    margin: "auto",
    width: "100%",
    textAlign: "center",
  },
  formMain: {
    textAlign: "center",
    color: "#2a57c9",
    fontWeight: "600",
    fontSize: "50px",
    [theme.breakpoints.down("md")]: {
      fontWeight: "600",
      fontSize: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontWeight: "600",
      fontSize: "20px",
    },
  },
  button: {
    ...theme.contactMe,
    marginTop: "2rem",
  },
  formInput: {
    display: "inline-block",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "60%",
    },
  },
  textError: {
    color: "#b80d1b",
    fontSize: "15px",
    textAlign: "left",
  },
  text: {
    marginTop: "2rem",
    fontSize: "17px",
  },
}));
