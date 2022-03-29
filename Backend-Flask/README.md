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
8. Install and configure Elasticsearch (windows instructions)  
   1. Navigate to [Elasticsearch download page](https://www.elastic.co/guide/en/elasticsearch/reference/current/zip-windows.html) and download the package `.zip` package.
   2. Extract it
   3. Open your terminal and navigate to that newly extracted folder. (`cd elasticsearch-8.1.1`)
   4. Install Elasticsearch as a service by doing `bin\elasticsearch-service.bat install`
   5. Disable authentication for Elasticsearch (this is temporary) by opening `config\elasticsearch.yml` and then changing `xpack.security.enabled: true` to `xpack.security.enabled: false`. If you don't see the `xpack.security.enabled: true` line, the you can just add `xpack.security.enabled: false`
   6. Start it by doing `bin\elasticsearch-service.bat start`
   7. Verify that it is running by going to [localhost:9200](http://localhost:9200). You should see some json that looks something like this: 
   ```json
   {
   "name" : "CLOSET-HEATER",
   "cluster_name" : "elasticsearch",
   "cluster_uuid" : "t_WtdX3VR5iaNzVI9HUN3g",
   "version" : {
      "number" : "8.1.1",
      "build_flavor" : "default",
      "build_type" : "zip",
      "build_hash" : "d0925dd6f22e07b935750420a3155db6e5c58381",
      "build_date" : "2022-03-17T22:01:32.658689558Z",
      "build_snapshot" : false,
      "lucene_version" : "9.0.0",
      "minimum_wire_compatibility_version" : "7.17.0",
      "minimum_index_compatibility_version" : "7.0.0"
   },
   "tagline" : "You Know, for Search"
   }
   ```
9.  Start the server  
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

