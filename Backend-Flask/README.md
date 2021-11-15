### Prerequisites
You have Python installed.  
You have MySQL server installed  
Navigate to the `backend` directory  

# Initial Setup
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
6. Init database  
`python -m flask db init`  
7. Populate the database  
`flask db upgrade`  
8. Start the server  
`> python -m flask run`  
9. Navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/)  

## Starting the server
`> python -m flask run`  

## Getting the latest database changes
 `flask db upgrade`  
