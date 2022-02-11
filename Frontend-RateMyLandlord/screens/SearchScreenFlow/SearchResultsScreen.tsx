/*
  Author: Hayden Stegman

  About: This page is the Search Results Page, here all of a landlords reviews that
  that have been left about them are displayed.
*/
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { LandlordComponent } from '../../components/LandlordListComponent';
import ILandlords from '../../interfaces/landlords';

// Icons
import{ FontAwesome } from '@expo/vector-icons'

const baseURL = "http://10.0.0.18:5000/api/v0";
//const baseURL = "http://10.0.0.165:5000/api/v0";

/* 
  Search Results Screen
*/
function SearchResultsScreen({ route, navigation }) {

  const { zipcode } = route.params;

  const [landlords, setLandlords] = useState<ILandlords[] | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${baseURL}/landlords/z/${zipcode}`)
      .then(res => { 
        setLandlords(res.data.landlords); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* Populate the Review list with the data from the search */}
      {landlords?.map(landlord => <LandlordComponent key={landlord.id} url={landlord.url} name={`${landlord.first_name} ${landlord.last_name}`} rating={landlord.overall_rating} />)}
    </>
  );
};

export default SearchResultsScreen;