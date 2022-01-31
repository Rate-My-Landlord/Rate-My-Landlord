# Mutation


### Sample Mutation:


| Mutation Name | Arguments           | Description                                                       | Return Type |
|:-------------:|---------------------|-------------------------------------------------------------------|-------------|
| NewReview     | authorId: ID! <br/>landlordId: ID!<br/> propertyId: ID<br/> overallStarRating: Int!<br/> communicationStarRating: Int <br/> maintenanceStarRating: Int <br/> text: String| Create a new review | ReviewResult |
| NewLandlord   | firstName: String! <br/>lastName: String!<br/> zipCode: String!<br/> | Create a new landlord | LandlordResult |
| NewProperty   | landlordId: ID! <br/>address1: String!<br/> address2: String<br/> city: String!<br/> zipCode: String! <br/> state: String! <br/> country: String! | Create a new property | PropertyResult |