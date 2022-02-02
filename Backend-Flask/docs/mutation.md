# Mutation


| Mutation Name | Arguments           | Description                                                       | Return Type | Authentication Required* |
|:-------------:|---------------------|-------------------------------------------------------------------|-------------|-------------------------|
| NewReview     | authorId: ID! <br/>landlordId: ID!<br/> propertyId: ID<br/> overallStarRating: Int!<br/> communicationStarRating: Int <br/> maintenanceStarRating: Int <br/> text: String| Create a new review | ReviewResult | Yes |
| NewLandlord   | firstName: String! <br/>lastName: String!<br/> zipCode: String!<br/> | Create a new landlord | LandlordResult | Yes |
| NewProperty   | landlordId: ID! <br/>address1: String!<br/> address2: String<br/> city: String!<br/> zipCode: String! <br/> state: String! <br/> country: String! | Create a new property | PropertyResult | Yes |
| NewUser       | phone: String! <br/>firstName: String!<br/> lastName: String!<br/> email: String!<br/> password: String! | Create a new user | UserResult | No |
| Login         | phone: String! <br/>password: String! | Log a user in and get their access token | UserResult | No |
| UpdateUser**    | firstName: String <br/>lastName: String <br /> email: String | Update a users account info | UserResult | Yes |  

\* Read about authentication [here](authentication.md)  
** Does not return a token

### Sample Mutation:

```
mutation {
  NewLandlord(firstName: "New", lastName: "Landlord", zipCode: "05401") {
    success
    landlord {
      id
    }
  }
}
```