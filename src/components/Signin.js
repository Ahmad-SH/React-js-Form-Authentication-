import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../authenticationContext/AuthContext";
const Signin = () => {
  const classes = styles();
  const history = useHistory()
  const emailRef = useRef();
  const passwordRef = useRef();

  const {  signin } = useAuth();
  const [error, seterror] = useState();
  const [loading, setLoading] = useState(false);

 

  const formSubmitHandler = async (e) => {
      e.preventDefault();
    let emailRefVal = emailRef.current.value;
    let passwordRefVal = passwordRef.current.value;
    
   
    try {
        seterror('')
        setLoading(true)
    await signin(emailRefVal, passwordRefVal)
    history.push("/")
    }catch{
        seterror('Failed to signin')
    }
    setLoading(false)
  };
  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={formSubmitHandler}>
        <p className={classes.formMain}>Sign in</p>
       {error && <p>{error}</p> }
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
          <TextField
            inputRef={passwordRef}
            fullWidth
            id="outlined-basic"
            label="Password"
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
          Sign in
        </Button>
      </form>
      <Typography className={classes.text} variant="h6">
        haven't signup yet? try <Link to="/signup">signup</Link>.
      </Typography>
      <Typography styles={{fontSize:'10px'}}>
         <Link to="/forgot_password">Forgot Password?</Link>.
      </Typography>
    </div>
  );
};

export default Signin;
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
