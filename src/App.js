import React, { useState } from 'react';
import ResponsiveAppBar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';



const App = () => {
  const [activeComponent, setActiveComponent] = useState();
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <ResponsiveAppBar setActiveComponent={setActiveComponent}/>
        {activeComponent}
      </Container>
    </React.Fragment>
      
  );
}

export default App;
