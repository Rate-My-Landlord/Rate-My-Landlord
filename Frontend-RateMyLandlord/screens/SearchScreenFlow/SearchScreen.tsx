/*
  Author: Hayden Stegman
*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ILandlords from '../../interfaces/landlords';

// Components
import { LandlordComponent } from '../../components/LandlordListComponent';

// Icons
import{ Octicons, Fontisto } from '@expo/vector-icons'

// Form Handeler
import { Formik } from 'formik';


const baseURL = "http://10.0.0.18:5000/api/v0";
//const baseURL = "http://10.0.0.165:5000/api/v0";


/*
  Search Screen
*/
const SearchScreen = ({ navigation }) => {
  // const navigation = useNavigation<HomeScreenProp>()
  
  const { zipcode }

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

// Search Bar Component
const MyTextInput = ( props:any ) => {
  return (
    <></>
  );
}

export default SearchScreen;