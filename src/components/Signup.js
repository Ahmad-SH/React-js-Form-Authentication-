import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../authenticationContext/AuthContext";
const Signup = () => {
  const classes = styles();
  const history = useHistory()
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, seterror] = useState();
  const [loading, setLoading] = useState(false);

 

  const formSubmitHandler = async (e) => {
      e.preventDefault();
    const emailRefVal = emailRef.current.value;
    const passwordRefVal = passwordRef.current.value;
    const passwordConfirmRefVal = passwordConfirmRef.current.value;
    if (passwordRefVal !== passwordConfirmRefVal) {
      return seterror("password did not match!");
    }
    try {
        seterror('')
        setLoading(true)
    await signup(emailRefVal, passwordRefVal)
    history.push("/")
    }catch{
        seterror('Failed to create an account')
    }
    setLoading(false)
  };
  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={formSubmitHandler}>
        <p className={classes.formMain}>Sign up</p>
       {error && <p>{error}</p> }
       {currentUser && currentUser.email}
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
          <TextField
            inputRef={passwordConfirmRef}
            fullWidth
            id="outlined-basic"
            label="Password Confirmation"
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
          Sign Up
        </Button>
      </form>
      <Typography className={classes.text} variant="h6">
        Already have an account? try <Link to="/signin" > signin</Link>
      </Typography>
    </div>
  );
};

export default Signup;
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
    fontSize: "15px",
  },
}));
