import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAuth } from 'firebase/auth' ;
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebaseCredentials';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { Button } from '@mui/material';


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();


function Home() {
    let [user, setUser] = useState();
    let [uid, setUid] = useState();
    let docu = null;

    auth.onAuthStateChanged((userConnected) =>{
      if(userConnected){
        setUid(userConnected.uid);
      }else{
        console.log("Pas connecté")
      }
    });

    let [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
  
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((document) => {
        if(uid != null){
          if(('"' + uid + '"') === document.data().uid){
            const userData = document.data();
            docu = document;
            setUser(userData);
            
            
          }
        }
        
      });
    };

    useEffect(() => {
      
      getUser();

      var addFavorite = async (coin) => {
        await updateDoc(doc(db, "users", docu.id), {favoriteCoins : arrayUnion(coin)});
      };
  
      var removeFavorite = async (coin) => {
        await updateDoc(doc(db, "users", docu.id), {favoriteCoins : arrayRemove(coin)});
      };
      
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        )
        .then(res => {
          if (uid){
            for (let i = 0; i < res.data.length; i++) {
              res.data[i]['star'] = <Button onClick={() => { addFavorite(res.data[i]['name']); }}>
                                      <StarBorderRoundedIcon />
                                    </Button>
              for (let j = 0; j < user.favoriteCoins.length; j++) {
                if(user.favoriteCoins[j] === res.data[i]['name']){
                  res.data[i]['star'] = <Button onClick={() => { removeFavorite(res.data[i]['name']); }}>
                                          <StarRoundedIcon/>
                                        </Button> 
                }
              }  
            }
          } else {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i]['star'] = <Button onClick={() => { alert("Veuillez vous connecter"); }}>
                                      <StarBorderRoundedIcon />
                                    </Button>
            }

          }
          
          setCoins(res.data);
        })
        .catch(error => console.log(error));
    }, [uid, user]);

    

    
  
    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const columns = [
      { id: 'star' },
      { id: 'image' },
      { id: 'name', label: 'Nom' },
      { id: 'current_price', label: 'Prix (€)' },
      { id: 'symbol', label: 'Symbole' },
      { id: 'market_cap', label: 'Capitalisation boursière (€)' },
      { id: 'total_volume', label: 'Volume' },
      { id: 'price_change_percentage_24h', label: 'Variation (%/24h)' },
    ];
  
  
    return (
      <div className='coin-app'>
  
        <div className='header'>
          <h1 className='coin-text'>Rechercher une cryptomonnaie</h1>
          <div>{user && user?.firstName}</div>
            <input
              className='coin-input'
              type='text'
              onChange={handleChange}
              placeholder='Rechercher'
            />
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table" sx={{ fontFamily: 'Nunito', fontSize:'24' }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={{height: 10}}>
                        {columns.map((column) => {
                          var value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value.toString().includes('png') || value.toString().includes('jpg') || value.toString().includes('jpeg') 
                              || value.toString().includes('JPG') ? value = <img src={value} alt='logo' width="20"/> : value}
                            </TableCell>
                            
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
  
  export default Home;