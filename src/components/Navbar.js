import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Home from './Home.js'
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";
import { getAuth } from 'firebase/auth' ;
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebaseCredentials';


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const ResponsiveAppBar = (props) => {
  const { setActiveComponent } = props;
  
  let labels = [];

  let labelsLogin = [{
    key: "Accueil",
    action: () => setActiveComponent(<Home/>),
    title: "Accueil",
    icon: <IconButton/>,
  },
  {
    key: "deconnexion",
    action: () => setActiveComponent(<Logout setActiveComponent={setActiveComponent} />),
    title: "Déconnexion",
  }];

  let labelsLogout = [{
    key: "Accueil",
    action: () => setActiveComponent(<Home/>),
    title: "Accueil",
    icon: <IconButton/>,
  },
  {
    key: "connexion",
    action: () => setActiveComponent(<Login setActiveComponent={setActiveComponent} />),
    title: "Connexion",
    
  },
  {
    key: "profile",
    action: () => setActiveComponent(<SignUp title="Inscription" />),
    title: "Inscription",
  }];
  

  useEffect(() => {
    setActiveComponent(<Home title="Home" />);
  }, [setActiveComponent]);

  
  const createMenuItem = (label) => {
    return (
      <Button key={label.key} onClick={label.action} color="inherit">{label.icon} {label.title}</Button>
    );
  };

  let [user, setUser] = useState();

  auth.onAuthStateChanged((userConnected) =>{
    if(userConnected){
      setUser(true);
    }else{   
      setUser(false);
    }
  });

  if(user == true){
    labels = labelsLogin;
  } else {
    labels = labelsLogout
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Toolbar>
        {labels.map((label) => createMenuItem(label))}
      </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;