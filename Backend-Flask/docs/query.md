
# Query

### Sample Query:
```
query {
    AllReviews {
        success,
        errors,
        reviews {
          id,
          overallStarRating,
          landlord {
              id,
              firstName
          }  
        }
    }
} 
```



| Query Name          | Arguments           | Description                                                   | Return Type   |
|:-------------:      |---------------------|---------------------------------------------------------------|---------------|
| AllReviews          | none                | get all reviews                                               | ReviewsResult |
| ReviewById          | reviewId: ID!       | get the review associated with reviewId                       | ReviewResult  |
| ReviewsByLandlordId | landlordId: ID!     | get all reviews associated with landlordId                    | ReviewsResult |
| ReviewByPropertyId  | propertyId: ID!     | get all reviews associated with propertyId                    | ReviewsResult |
| ReviewByZipCode     | zipCode: String!    | get all reviews whose landlord's zip code is equal to zipCode | ReviewsResult |
| AllLandlords        | none                | get all landlords                                             |LandlordsResult|
| LandlordById        | landlordId: ID!     | get the landlord with landlordId                              |LandlordResult |
| LandlordByZipCode   | zipCode: String!    | get all landlords matching the provided zipCode               |LandlordsResult|
| LandlordByPropertyId| propertyId: ID!     | get the landlord who owns the property with propertyId        |LandlordResult |