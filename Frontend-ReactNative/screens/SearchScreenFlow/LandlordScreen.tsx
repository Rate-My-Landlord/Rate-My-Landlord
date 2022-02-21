/*
  Author: Hayden Stegman

  About: This page is the landlord page, here all of a landlords reviews that
  that have been left about them are displayed.
*/
import React, { useState, useEffect } from 'react';

// List Item
import { ReviewComponent } from '../../components/ReviewListComponent';

import ILandlord from '../../interfaces/landlord';

//const baseURL = "http://10.0.0.165:5000";
const baseURL = "http://10.0.0.18:5000";

/* 
  Landlord Screen
*/
function LandlordScreen() {
  return (
      <>
        {//{landlord?.reviews.map(review => <ReviewComponent key={review.id} name={"-"} text={review.text} overall_star_rating={review.overall_star_rating} />)}
        }
      </>
  );
};

export default LandlordScreen;