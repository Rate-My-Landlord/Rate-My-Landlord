# Initial Setup
### Prerequisites
You have Python installed.  
You have MySQL server installed  
Navigate to the `backend` directory  
1. Create virtual environment  
`> python -m venv venv`  
2. Activate Virtual Environment  
`> venv\Scripts\activate`  
3. Install packages  
`> python -m pip install -r requirements.txt`  
4. Create database  
`> mysql -u root -p`  
`mysql> create schema rml`  
5. Add rml user to database  
`mysql> create user 'rml'@'localhost' identified by 'rml';`  
`mysql> grant all privileges on * . * to 'rml'@'localhost';`  
`mysql> flush privileges;`  
Now check that it worked  
`mysql> exit`  
`> mysql -u rml -p`  
7. Populate the database  
`> python -m flask db upgrade`  
8. Start the server  
`> python -m flask run`  
9. Navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/)  

## Starting the server
`> python -m flask run`  

## Getting the latest database changes
 `> python -m flask db upgrade`  


# Routes  
### Reviews   
* GET `/reviews/` - returns list of all reviews  
* GET `/reviews/id` (int) - returns a review or 404  
* POST `/reviews` - post a review  
⋅⋅⋅Format for Posting: (example)  
⋅⋅⋅`{"body": {`  
    `"author_id": 1, `(not required for now since we have not implemented users)  
    `"landlord_id": 1, `(required)  
    `"property_id": 1, `(optional)  
    `"overall_star_rating": 2, `(optional)  
    `"communication_star_rating": 2, `(optional)  
    `"maintenance_star_rating": 2, `(optional)  
    `"text": "text", (optional)`  
    `}`  
`}`  


### Landlords  
* GET `/landlords/` - returns list of all landlords  
* GET `/landlords/id` (int) - returns a landlord with their reviews and properties or 404  
* POST `/landlords` - post a landlord  
⋅⋅⋅Format for Posting: (example)  
⋅⋅⋅`{"body": {`  
    `"first_name": "first", `(required)  
    `"last_name": "last", `(required)  
    `"user_id": 1, `(optional)  
    `}`  
`}`