# User Authentication Endpoints

## Registration Endpoint

### Endpoint Details
- **URL:** `/users/register`
- **Method:** POST
- **Description:** Registers a new user in the system

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

### Field Validations
- `fullname.firstname`:
  - Required
  - Minimum length: 3 characters
  - Error message: "Name must be at least 3 characters long"

- `email`:
  - Required
  - Must be a valid email format
  - Error message: "Invalid Email"

- `password`:
  - Required
  - Minimum length: 6 characters
  - Error message: "Password must be at least 6 characters long"

### Successful Registration Response
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "uniqueMongoDBObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Registration Error Responses
1. **Validation Errors**
   - **Status Code:** 400 Bad Request
   - **Response Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

## Login Endpoint

### Endpoint Details
- **URL:** `/users/login`
- **Method:** POST
- **Description:** Authenticates a user and provides an access token

### Request Body
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

### Field Validations
- `email`:
  - Required
  - Must be a valid email format
  - Error message: "Invalid Email"

- `password`:
  - Required
  - Minimum length: 6 characters
  - Error message: "Password"

### Successful Login Response
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "uniqueMongoDBObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Login Error Responses
1. **Validation Errors**
   - **Status Code:** 400 Bad Request
   - **Response Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```
   
2. **Authentication Errors**
   - **Status Code:** 401 Unauthorized
   - **Response Body:**
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

## User Profile Endpoint

### Endpoint Details
- **URL:** `/users/profile`
- **Method:** GET
- **Description:** Retrieves the authenticated user's profile
- **Authentication:** Required (Bearer Token)

### Request Headers
```
Authorization: Bearer <jwt_token>
```

### Successful Profile Retrieval
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "_id": "uniqueMongoDBObjectId",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

### Profile Endpoint Error Responses
1. **Unauthorized Access**
   - **Status Code:** 401 Unauthorized
   - **Response Body:**
   ```json
   {
     "message": "Unauthorized"
   }
   ```

## Authentication Middleware

### Token Verification
- Tokens can be passed via:
  1. Cookie (`token`)
  2. Authorization Header (`Bearer <token>`)

### Token Validation
- Verifies the JWT token using the `JWT_SECRET`
- Decodes the token to extract user ID
- Fetches the corresponding user from the database
- Attaches user object to the request for further use

## Notes
- Passwords are hashed before storing in the database
- A JWT token is generated upon successful registration and login
- The token can be used for subsequent authenticated requests
- Tokens are valid until they expire or are regenerated

## Example Curl Requests

### Registration
```bash
curl -X POST http://your-api-domain/users/register \
     -H "Content-Type: application/json" \
     -d '{
           "fullname": {
             "firstname": "John", 
             "lastname": "Doe"
           },
           "email": "johndoe@example.com",
           "password": "securepassword123"
         }'
```

### Login
```bash
curl -X POST http://your-api-domain/users/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "johndoe@example.com",
           "password": "securepassword123"
         }'
```

### Get Profile
```bash
curl -X GET http://your-api-domain/users/profile \
     -H "Authorization: Bearer <your_jwt_token>"
```

## Logout Endpoint

### Endpoint Details
- **URL:** `/users/logout`
- **Method:** GET
- **Description:** Logs out the authenticated user
- **Authentication:** Required (Bearer Token)

### Request Headers
```
Authorization: Bearer <jwt_token>
```

### Successful Logout Response
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "message": "Logged out successfully"
}
```

## Token Blacklisting

### Mechanism
- Logout invalidates the current JWT token
- Blacklisted tokens are stored in the database
- Blacklisted tokens expire after 24 hours
- Attempts to use a blacklisted token will be rejected

### Token Verification Process
1. Check if token exists in request (cookie or authorization header)
2. Verify token is not blacklisted
3. Validate token signature
4. Retrieve user information
5. Attach user to request for protected routes

## Error Responses for Authentication
- **401 Unauthorized**:
  - Invalid or expired token
  - Token not found
  - Blacklisted token

## Example Curl Requests

### Logout
```bash
curl -X GET http://your-api-domain/users/logout \
     -H "Authorization: Bearer <your_jwt_token>"
```

## Security Notes
- Tokens are invalidated immediately upon logout
- Each logout creates a temporary blacklist entry
- Tokens automatically expire from blacklist after 24 hours