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



# Captain Registration Endpoint

## Endpoint Details
- **URL:** `/captain/register`
- **Method:** POST
- **Description:** Registers a new captain in the system

## Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Field Validations

### Fullname
- `firstname`:
  - Required
  - Minimum length: 3 characters
  - Error message: "Name must be at least 3 characters long"

- `lastname`:
  - Optional
  - Minimum length: 3 characters if provided
  - Error message: "Lastname must be at least 3 characters long"

### Email
- Required
- Must be a valid email format
- Unique (no duplicate emails allowed)
- Error message: "Invalid Email"

### Password
- Required
- Minimum length: 6 characters
- Error message: "Password must be at least 6 characters long"

### Vehicle Details
- `color`:
  - Required
  - Minimum length: 3 characters
  - Error message: "Color must be at least 3 characters long"

- `plate`:
  - Required
  - Minimum length: 3 characters
  - Error message: "Plate must be at least 3 characters long"

- `capacity`:
  - Required
  - Minimum value: 1
  - Must be an integer
  - Error message: "Capacity must be at least 1"

- `vehicleType`:
  - Required
  - Allowed values: 'car', 'motorcycle', 'auto'
  - Error message: "Invalid vehicle type"

## Successful Registration Response
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "uniqueMongoDBObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Error Responses

### Validation Errors
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

### Duplicate Email Error
- **Status Code:** 400 Bad Request
- **Response Body:**
```json
{
  "message": "Captain already exist"
}
```

## Additional Notes
- Passwords are hashed before storing in the database
- A JWT token is generated upon successful registration
- Initial captain status is set to "inactive"
- Token expires after 24 hours

## Example Curl Request
```bash
curl -X POST http://your-api-domain/captain/register \
     -H "Content-Type: application/json" \
     -d '{
           "fullname": {
             "firstname": "John", 
             "lastname": "Doe"
           },
           "email": "johndoe@example.com",
           "password": "securepassword123",
           "vehicle": {
             "color": "Blue",
             "plate": "ABC123",
             "capacity": 4,
             "vehicleType": "car"
           }
         }'
```

## Security Considerations
- Email is stored in lowercase
- Passwords are never stored in plain text
- Unique email constraint prevents duplicate registrations
- JWT token provides authentication mechanism

I'll create comprehensive documentation for the captain authentication routes and functionality based on the provided code. I'll structure this as a Markdown document covering the key endpoints and their details.

# Captain Authentication API Documentation

## Overview
This documentation covers the authentication routes and functionality for captain registration, login, profile retrieval, and logout in the transportation management system.

## Endpoints

### 1. Captain Registration
- **Route:** `/captain/register`
- **Method:** `POST`
- **Description:** Register a new captain account

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Validation Rules
- `email`: Must be a valid email address
- `fullname.firstname`: Minimum 3 characters long
- `password`: Minimum 6 characters long
- `vehicle.color`: Minimum 3 characters long
- `vehicle.plate`: Minimum 3 characters long
- `vehicle.capacity`: Minimum 1
- `vehicle.vehicleType`: Must be 'car', 'motorcycle', or 'auto'

#### Responses
- **Success (201):** 
  ```json
  {
    "token": "jwt_authentication_token",
    "captain": {
      // Captain details
    }
  }
  ```
- **Error (400):** Validation errors or captain already exists
  ```json
  {
    "errors": [/* Validation error details */],
    "message": "Captain already exist"
  }
  ```

### 2. Captain Login
- **Route:** `/captain/login`
- **Method:** `POST`
- **Description:** Authenticate a captain and generate an authentication token

#### Request Body
```json
{
  "email": "captain@example.com",
  "password": "securePassword123"
}
```

#### Validation Rules
- `email`: Must be a valid email address
- `password`: Minimum 6 characters long

#### Responses
- **Success (200):** 
  ```json
  {
    "token": "jwt_authentication_token",
    "captain": {
      // Captain details
    }
  }
  ```
- **Error (401):** Invalid credentials
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### 3. Get Captain Profile
- **Route:** `/captain/profile`
- **Method:** `GET`
- **Description:** Retrieve the authenticated captain's profile
- **Authentication Required:** Yes (JWT token)

#### Responses
- **Success (200):** 
  ```json
  {
    "captain": {
      // Captain profile details
    }
  }
  ```
- **Error (401):** Unauthorized
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### 4. Captain Logout
- **Route:** `/captain/logout`
- **Method:** `GET`
- **Description:** Log out the authenticated captain
- **Authentication Required:** Yes (JWT token)

#### Responses
- **Success (200):** 
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

## Authentication Mechanism
- JSON Web Tokens (JWT) are used for authentication
- Tokens expire after 24 hours
- Tokens are validated using a secret key
- Blacklisted tokens are tracked to prevent reuse
