import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../lib/firebaseCredentials";
import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core';
import AlertDialog from "./AlertDialog";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

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

const SignUp = () => {
  const classes = useStyles();
  const [password, setPassword] = useState(false);
  const [state, setState] = useState();
  const inputLabels = [
    {
      label: "Nom",
      name: "name",
      required: true,
      message: "Veuillez saisir votre nom",
      type: "text",
      action: (e) => {
        setState({ ...state, name: e.target.value });
      },
      variant: "filled",
    },
    {
      label: "Prénom",
      name: "firstname",
      required: true,
      message: "Veuillez saisir votre prénom",
      type: "text",
      action: (e) => {
        setState({ ...state, firstname: e.target.value });
      },
      variant: "filled",
    },
    {
      label: "Âge",
      name: "age",
      required: true,
      message: "Veuillez saisir votre Âge",
      type: "number",
      action: (e) => {
        setState({ ...state, age: e.target.value });
      },
      variant: "filled",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      message: "Veuillez saisir votre email",
      type: "email",
      action: (e) => {
        setState({ ...state, email: e.target.value });
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
  const onFinish = () => {
    createUserWithEmailAndPassword(auth, state.email, password)
      .then((credentials) => {
        addDoc(collection(db, "users"), state).then((doc) => console.log(doc));
      })
      .then(() => {
        alert('Inscription terminée');
        window.location.href = "./";
      })
      .catch((err) => {  
        alert("Email déjà utilisé");
        console.log(err);
      });
  };
  return (
    <form className={classes.root}>
        {inputLabels.map((label) => createInputLabels(label))}
        <Button onClick={onFinish} variant="contained" color="primary">
          Signup
        </Button>
    </form>
        
  );
};

export default SignUp;
