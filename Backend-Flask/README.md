# Want to know how to use the API? - [Read the docs](docs/graphql.md)


# Initial Setup
### Prerequisites
You have Python installed.  
You have MySQL server installed.  
MySQL Server is added to System Variables Path. [[Link to Guide](https://dev.mysql.com/doc/refman/8.0/en/mysql-installation-windows-path.html)]  
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

---  
### Insert some fake data
To insert some dummy data:  
`> python -m flask commands prototype`  
This command does **delete all data in your local database**, so be aware.  
This adds 3 landlords, who each have 2 properties and 3 reviews.  

