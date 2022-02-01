# How to use the API
This is a GraphQL API. If you're not familiar with GraphQL, go check out this [introduction article](https://graphql.org/learn/)

If you want to explore the API, just start the server and navigate to http://127.0.0.1:5000/api/graphql

## Reporting Issues
If you find an issue with an API, please open an issue on GitHub and tag me or [email me](mailto:jacob.capra@mymail.champlain.edu) at jacob.capra@mymail.champlain.edu

## Making API calls
All API calls can be sent to a single endpoint: **http://127.0.0.1:5000/api/graphql**  
### All API calls **MUST** be **POST** requests

## [Query Docs](query.md)  
## [Mutation Docs](mutation.md)

# Types

## Data types

### User:  
&emsp; id: ID  
&emsp; phone: String  
&emsp; firstName: String  
&emsp; lastName: String  
&emsp; email: String  
&emsp; createdAt: String (in [UTC format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time))

### Review:
&emsp; id: ID  
&emsp; author: User  
&emsp; landlord: Landlord  
&emsp; property: Property  
&emsp; overallStarRating: Int  
&emsp; communicationStarRating: Int  
&emsp; maintenanceStarRating: Int  
&emsp; text: String  
&emsp; createdAt: String (in [UTC format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)) 

### Landlord:  
&emsp; id: ID  
&emsp; user: User  
&emsp; firstName: String  
&emsp; lastName: String  
&emsp; zipCode: String  
&emsp; overallRating: String  
&emsp; properties: [Property]  
&emsp; reviews: [Review]  

### Property:  
&emsp; id: ID  
&emsp; landlord: Landlord  
&emsp; address1: String  
&emsp; address2: String  
&emsp; city: String  
&emsp; zipCode: String  
&emsp; state: String  
&emsp; country: String  



## Result Types
Result types will be what is returned to you with any call you make

*IMPORTANT NOTE: for ReviewsResult and ReviewResult the landlord type will not include reviews or properties due to recursion an the way relationships are setup*

### ReviewsResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; reviews: [Review]  

### ReviewResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; review: Review  

### LandlordsResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; landlords: [Landlord]  

### LandlordResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; landlord: Landlord  

### PropertyResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; property: Property  