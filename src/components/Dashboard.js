import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../authenticationContext/AuthContext";

const Dashboard = () => {
  const classes = styles();
  const [error, seterror] = useState("")
  const history = useHistory()
    const {currentUser,logout} = useAuth()
    const logoutHandler =async()=>{
       seterror('')
       try{
           await logout()
           console.log("logout Successfully");
          //  history.push("/signin")
       }catch{
           seterror('Failed to Logout')
       }
    }

  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={logoutHandler}>
        <p className={classes.formMain}>Profile</p>

        <div className={classes.textInput}>
          <TextField
            fullWidth
            id="outlined-basic"
            value={currentUser.email}
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
        >
          Log out
        </Button>
      </form>
      <Typography className={classes.text} variant="h6"></Typography>
    </div>
  );
};

export default Dashboard;
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
