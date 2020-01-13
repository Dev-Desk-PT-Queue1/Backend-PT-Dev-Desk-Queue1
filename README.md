# Backend-UI-Landing-Page-PT-Dev-Desk-Queue1--Dev-Desk-PT-Queue1

### Heroku

https://dev-desk-queue.herokuapp.com/


## Ticket Routes 	            
	    	        

| Method | Endpoint            | Description                        |
| -------| ------------------- | ---------------------------------- |
| GET    | /tickets            | Returns all tickets                |
| GET    | /tickets/:id        | Returns ticket by id               |
| GET    | /tickets/user/:id   | Returns tickets assigned to user   |
| POST   | /tickets            | Creates a new ticket               |
| PUT    | /tickets/:id        | Updates ticket by id               |
| DELETE | /tickets/:id        | Deletes ticket by id               |


## Authentication Routes


| Method  |  Endpoint | Description               |
| ------- | --------- | ------------------------- |
| GET     | /users    |  Returns all users        | 
| GET     | /users/:id|  Returns user by id       | 
| POST    | /register |  Registers a new user     | 
| POST    | /login    |  Log in for existing user | 


## Users Table

```
{
     id: integer // Autoincrement by database
     username: String // unique, 50 chars max
     password: String 
     firstName: String
     lastName: String
     email: String // uniquie     
 }
```

## Sample Add user Data
```
 {
	"username": "bobsmith",
	"password": "Frontend",
	"firstName": "Bob",
	"lastName": "Smith",
	"email": "bob@smith.com"
}
```

## Tickets Table
```
{
    "title": String 255 char max
    "description": String 255 char max
    "category": String 255 char max
    "resolved": boolean
    "assigned": boolean
    "assigned_user": integer Default 0
    "created_at": String 255 Database created timestamp
    "user_id": integer User that created ticket
    "tried": String
}
```

## Sample Add Ticket
```
{
    "title": "Broken Some More stuff",
    "description": "Lots of Error messages",
    "category": "React",
    "resolved": "0",
    "assigned": "0",
    "assigned_user": "0" ,    
    "tried": "Hit with hammer"
}
```

