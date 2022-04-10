# How to use the API
This is a GraphQL API. If you're not familiar with GraphQL, go check out this [introduction article](https://graphql.org/learn/)

If you want to explore the API, just start the server and navigate to http://127.0.0.1:5000/api/graphql

## Reporting Issues
If you find an issue with an API, please open an issue on GitHub and tag me or [email me](mailto:jacob.capra@mymail.champlain.edu) at jacob.capra@mymail.champlain.edu

## Making API calls
All API calls can be sent to a single endpoint: **http://127.0.0.1:5000/api/graphql**  
### All API calls **MUST** be **POST** requests

### Authentication
For all queries, you do no have to worry about authentication. However, there are a few mutations that do require authentication. Authentication is outlined in the [authentication docs](authentication.md).

## [Query Docs](query.md)  
## [Mutation Docs](mutation.md)

# Types

## Data types

### CostOfRentRating (ENUM):
| Value | Description   |
| ----- | ------------- |
| Cheap | Rent is cheap |
| Fair  | Rent is fair  |
| Pricy | Rent is pricy |

### User:  
| Name      | Type                | Description                                                                                                   |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| id        | ID                  | Unique identifier of the user                                                                                 |
| phone     | String              | Phone number of the user in [E. 164 format](https://en.wikipedia.org/wiki/E.164)                              |
| firstName | String              | First name of the user                                                                                        |
| lastName  | String              | Last name of the user                                                                                         |
| email     | String              | Email of the user                                                                                             |
| reviews   | [[Review](#review)] | Array of [reviews](#review) by the user                                                                       |
| createdAt | String              | Date of the user account creation (in [UTC format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)) |

### Review:
| Name                    | Type                                       | Description                                                                                             |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| id                      | ID                                         | Unique identifier of the review                                                                         |
| author                  | [User](#user)                              | User of the author of the review                                                                        |
| landlord                | [Landlord](#landlord)                      | Landlord that the review is associated with                                                             |
| property                | [Property](#property)                      | Property associated with the review (optional)                                                          |
| overallStarRating       | Int                                        | 1-5 rating of the overall quality                                                                       |
| communicationStarRating | Int                                        | 1-5 rating of the communication quality                                                                 |
| maintenanceStarRating   | Int                                        | 1-5 rating of the maintenance quality                                                                   |
| entryWithoutNotice      | Boolean                                    | Did the landlord enter without giving 48 hours notice                                                   |
| costOfRentRating        | [CostOfRentRating](#costofrentrating-enum) | cheap, fair, pricy are the 3 options. Rating of the cost of rent                                        |
| text                    | String                                     | Comments for the review (optional)                                                                      |
| createdAt               | String                                     | Date of the review creation (in [UTC format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)) |


### Landlord: 
| Name          | Type                  | Description                                                                                                       |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| id            | ID                    | Unique identifier of the landlord                                                                                 |
| user          | [User](#user)         | User account accosted with the landlord                                                                           |
| firstName     | String                | First name of the landlord                                                                                        |
| lastName      | String                | Last name of the landlord                                                                                         |
| zipCode       | String                | Zip code of the landlord                                                                                          |
| overallRating | Float                 | 1-5 rating that is the average of all of the landlords reviews (only accounting for overallStarRatings in review) |
| properties    | [Property](#property) | Array of [properties](#property) associated with the landlord                                                     |
| reviews       | [[Review](#review)]   | Array of [reviews](#review) on the landlord                                                                       |

### Property:  
| Name     | Type                  | Description                               |
| -------- | --------------------- | ----------------------------------------- |
| id       | ID                    | Unique identifier of the property         |
| landlord | [Landlord](#landlord) | Landlord associated with the property     |
| address1 | String                | Address of the property                   |
| address2 | String                | Second address of the property (optional) |
| city     | String                | City of the property                      |
| zipCode  | String                | Zip code of the property                  |
| state    | String                | State of the property                     |
| country  | String                | Country of the property                   |

### Tokens:
| Name         | Type   | Description                                                                                               |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------- |
| accessToken  | String | A [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) used for authenticating the user         |
| refreshToken | String | A [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) used for refreshing the user accessToken |


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
&emsp; review: [Review](#review)  

### LandlordsResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; landlords: [[Landlord]](#landlord)  

### LandlordResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; landlord: [Landlord](#landlord)  

### PropertyResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; property: [Property](#property)  

### UserResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; user: [User](#user)  
&emsp; tokens: [Tokens](#tokens)

### RefreshTokenResult:
&emsp; success: Boolean  
&emsp; errors: [String]  
&emsp; token: String,  
&emsp; id: ID  