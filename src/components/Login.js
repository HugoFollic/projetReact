import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence} from 'firebase/auth' ;
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebaseCredentials';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core';
import { useState } from "react";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
  
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const [password, setPassword] = useState(false);
    const [email, setEmail] = useState();
    const inputLabels = [
        {
            label: "Email",
            name: "email",
            required: true,
            message: "Veuillez saisir votre email",
            type: "email",
            action: (e) => {
                setEmail(e.target.value);
              },
            variant: "filled",
          },
          {
            label: "Mot de passe",
            name: "password",
            required: true,
            message: "Veuillez saisir votre mot de passe",
            type: "password",
            action: (e) => {
                setPassword(e.target.value);
              },
            variant: "filled",
          },
      ];

      const createInputLabels = (label) => {
        return (
          <TextField
            key={label.name}
            label={label.label}
            variant={label.variant}
            name={label.name}
            required={label.required}
            type={label.type}
            onChange={label.action}
          >
          </TextField>
        );
      };
  
  const onFinish = (values) => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      console.log(auth + " " + email + " " + password);
        signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        window.location.href = "./";
      })
      .catch((err)=>{
        console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });    
    
      
  };
  return (
    <form className={classes.root}>
        {inputLabels.map((label) => createInputLabels(label))}
        <Button onClick={onFinish} variant="contained" color="primary">
          Se connecter
        </Button>
    </form>
        
  );
};

export default Login;