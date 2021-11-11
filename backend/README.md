#Setup
Navigate to the `backend` directory
1. Create virtual environment
`> python -m venv venv`
2. Activate Virtual Environment
`> venv\Scripts\activate`
3. Install packages
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
