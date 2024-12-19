Authentication and Performing CRUD Operation on Task

Features
Secure user registration, login, and logout.
JSON Web Tokens (JWT) for session management.
Passwords securely hashed using bcrypt.
Middleware for route protection 
automatic server run use nodemon

Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Security: bcrypt, CORS

API Endpoints
POST /auth/register - Register a user
POST auth/login - User login
POST auth/tasks - login User add Task
GET auth/tasks - login User get All Task
GET auth/tasks/:id - login User get Particular Task on the basis of id
DELETE auth/tasks/:id - login User delete Particular Task on the basis of id
PUT auth/tasks/:id - login User update Particular Task on the basis of id

start Server
npm start

complete Api 
1:http://localhost:3000/auth/register -> register Api
2:http://localhost:3000/auth/login -> login APi
3:http://localhost:3000/auth/tasks -> add task
4:http://localhost:3000/auth/tasks -> get All task
5: http://localhost:3000/auth/tasks/:id -> get particular task (in a postman select GET)
6: http://localhost:3000/auth/tasks/:id -> delete particular task (in a postman select DELETE)
7:http://localhost:3000/auth/tasks/:id -> update particular task (in a postman select PUT)

mongodb local Server URl: mongodb://127.0.0.1/registrationProjet

HOW to Use
1:You have to use Postman for api testing just first register yourself add(name,email,password) field 
2:add same email and password which you have filled at a time of registration in a login to get Authntication 
and you will get a response of token 
3: for adding a task you have to just use token as bearer in a postman and add the task
4: same for all api end points you have to use token in a bearer which is available in a postman

Note:
i have also deploy backend on render but a mongodb database could not deploy it shows some error of configuration
in my side of cloud mongodb database but i am sharing my render link as per you mentioned in a task

https://taskbackend-timb.onrender.com
