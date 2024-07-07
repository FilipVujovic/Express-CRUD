# Express CRUD App
This is a simple CRUD application that works on a two table database user-task.

## Startup

To start the app you need to run `docker compose up`. This will spin up the docker container with the postgres database.

You should see a message that the server has started successfuly on port 3000.

You can view the swagger documentation at `localhost:3000/docs`.

## Usage

### Account Creation

1. In order to start using the API you first need to make an account. 
This is done by sending a `POST` request to `localhost:3000/user/signup` with a example body as shown below:

    ```
    {
        "email" : "test@gmail.com",
        "password" : "pass123",
        "passwordConfirmation" : "pass123"
    }
    ```
*Make sure that the password and passwordConfirmation are the same!*

If the requrest is successful you will get a `201` response.

2. Next step is to login and get the JWT token.
This is done by sending a `POST` request to `localhost:3000/user/signin` with a example body as shown below:

    ```
    {
        "email" : "test@gmail.com",
        "password" : "pass123"
    }
    ```

As a response from this request you will get a JWT token. This token is used to authenticate the user when performing CRUD operations.
This token is sent as a `Authorization` header and it **MUST** be sent with every request from now on!

If you are testing the API from Postman, paste the JWT token in the Auth/Bearer section of each CRUD request. Make sure that the prefix is set to `Bearer `.

**If you are sending this token manually make sure to add `Bearer ` infront of it!**

Example: 

`Authorization - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlMDFlOTg4LWE2MTUtNDJhYi05ZDEyLTEzMTkxNzc5OTJiZCIsImVtYWlsIjoiZmlsaXAudnVqb3ZpY0BnbWFpbC5jb20iLCJpYXQiOjE3MjAzNDg1NDh9.99PnV-_XiJ8GUyMjCQiTPd3XRAnGMmFFMMIm48YfNu4`

### Using the API

**1.** To create a task you need to send a `POST` request to `localhost:3000/task` with a example body as shown below and add the JWT token to the `Authorization` header with the prefix `Bearer `.

    ```
    {
        "title" : "Task title",
        "description" : "Task Description",
        "priority" : "low",
        "status" : "done"
    }
    ```

Now you can test out the `get-all`, `get-by-id`, `update` and `delete` endpoints.

**2.** To get all tasks for a user send a `GET` request to: `localhost:3000/task`. Make sure to add the JWT
token in the `Authorization` header because the API collects user info from the header.

You will get an array of tasks as a response.

```
[
  {
    "id": "f69e85a4-0fcd-4ac0-9397-d73d0b43b96a",
    "title": "taskTitle1",
    "description": "taskDescription1",
    "priority": "low",
    "status": "done",
    "userId": "1253a76d-cb25-4ac4-bfdb-cbfb729ce99c"
  },
  {
    "id": "3b084470-1f12-4921-9fb6-3db80e76b60d",
    "title": "taskTitle2",
    "description": "taskDescription2",
    "priority": "high",
    "status": "in progress",
    "userId": "1253a76d-cb25-4ac4-bfdb-cbfb729ce99c"
  }
]
```

**3.** To get a single task you need to send a `GET` request to `localhost:3000/task/:id` and pass the id
of the request as a path parameter and the JWT token in the header. 

Example endpoint:

`localhost:3000/task/f69e85a4-0fcd-4ac0-9397-d73d0b43b96a`

If the result is successful you will get a single task as a response.

```
{
  "id": "f69e85a4-0fcd-4ac0-9397-d73d0b43b96a",
  "title": "taskTitle1",
  "description": "taskDescription1",
  "priority": "low",
  "status": "done",
  "userId": "1253a76d-cb25-4ac4-bfdb-cbfb729ce99c"
}
```

**4.** To update a task you need to send a `PUT` requrest to `localhost:3000/task` with the JWT token in the header and a body as shown below:

```
  {
    "id": "2648f679-314d-4645-aa4f-e39b44279208",
    "title": "titulataskataskira",
    "description": "taskDescription1",
    "priority": "low",
    "status": "done"
  }
```

All fields in the body that are different than before will be updated.

If the requrest is successful you will get a `200` response with a `rowCount:1` message.

**5.** To delete a task you need to send a `DELETE` requrest to `localhost:3000/task/:id` and pass the 
id of the task in as a path parameter. Add the JWT token in the header. 

Example endpoint:

`localhost:3000/task/f69e85a4-0fcd-4ac0-9397-d73d0b43b96a`

If the request is successful you will get a response `200` with a `rowCount:1` message.