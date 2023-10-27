# API documentation for a Hospital Appointment Scheduler

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Implementation details](#implementation-details)
4. [Endpoints & Routes](#endpoints--routes)
     - [User routes](#user-routes)
        - [Doctor endpoints](#doctor-endpoints)
        - [Patient endpoints](#patient-endpoints)
        - [Admin endpoints](#admin-endpoints)
     - [Specialty endpoints](#specialty-endpoints)
     - [Disease endpoints](#disease-endpoints)
     - [Appointment endpoints](#appointment-endpoints)
     - [Review endpoints](#review-endpoints)
     - [Conflict endpoints](#conflict-endpoints)
5. [Installation](#installation)
6. [Dockerization](#dockerization)
7. [Database schema](#database-schema)


## Description

This API is an Hospital Appointment Scheduler REST API built with Node.js, using the Model–View–Controller (MVC) architectural pattern. It allows users to book, update, retrieve and delete appointments with doctors. Users need to be authenticated to access these features, ensuring that all appointment routes are secure.

## Technologies

- JavaScript
- Node.js (Express Framework)
- JSON Web Token (authentication)
- MySQL (Database)
- Docker container

## Implementation details

Base URL: http://localhost:3000/

This API follows a RESTful principles, providing endpoints for the standard CRUD operations: create, read, update, and delete.The API is versioned with "api/v1/" as the prefix.

## Endpoints & Routes

### User routes

- **Request GET** __`/users`__ - Get all users.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
    {
      "user_id": "1",
      "role_type": "Admin",
      "email": "admin@gmail.com",
      "first_name": Admin",
      "last_name: "Admin",
    },
    {
      "user_id": "2",
      "role_type": "Doctor",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",

    },
    {
      "user_id": "3",
      "role_type": "Patient",
      "email": "Ivana@gmail.com",
      "first_name": Ivan",
      "last_name: "Vakulenko",
    },
    ...
    ]
```

- **Request GET** __`/users/{user_Id}`__ - Get a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_Id`  | string | Yes      | The user ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === user_Id exists:

    200 OK success status response
    
    [{
      "user_id": "{user_Id}",
      "role_type": "Doctor",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
    }]

    If user_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid user ID."
    }]

    If the record with id === user_Id doesn't exist:

   404 Not Found
    
    [{
      "error": "User not found."
    }]
```

- **Request POST** __`/users`__ - create a new user (id will be added automatically).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `role_type`  | string | Yes      |  User's role ('Doctor', 'Patient' or 'Admin'). |
| `email`  | string | Yes      |  User's email. |
| `first_name`  | string | Yes      | User's first name. |
| `last_name`  | string | Yes      |  User's last name. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "user_id": "4",
      "role_type": "Doctor",
      "email": "kolpakov@gmail.com",
      "first_name": "Oleg",
      "last_name": "Kolpakov",
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/users/{user_Id}`__ - Update user's properties.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `last_name`  | string | Yes      | Change the last name from "Vakulenko" to "Kopytko". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "User account with ID {userID} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid email address format"
  }]
```

- **Request DELETE** __`/users/{user_Id}`__ - Delete a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      | The user ID to delete user's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "User account with ID {user_ID} has been deleted successfully"
  }]

  400 Bad Request: if the user_Id parameter is invalid.
  [{
    "error": "Invalid user ID"
  }]

  404 Not Found: if the record with the given user_Id does not exist in the database.
  [{
    "error": "User ID does not exist"
  }]

```

## Doctor endpoints

- **Request GET** __`/users/doctors`__ - Get all doctors.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "doctor_id": "1",
      "user_id": "2",
      "specialty_id": "1",
      "working_hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
      "availability": "true"
    },
    ...
    ]
```
- **Request GET** __`/users/doctors/{doctor_id}`__ - Get a doctor by ID.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `doctor_id`  | string | Yes      | The doctor ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === doctor_Id exists:

    200 OK success status response
    
    [{
      "doctor_id": "{doctor_id}",
      "user_id": "2",
      "specialty_id": "1",
      "working_hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
      "availability": "true"
    }]

    If doctor_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid doctor ID."
    }]

    If the record with id === doctor_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Doctor not found."
    }]
```


- **Request GET** __`/users/doctors/{specialty_id}`__ - filter doctors by specialty.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_id`  | string | Yes      | Doctor's specialty. |


**Response**: 
Content-Type: application/json.

```
    200 OK success status response
    
    [{
      "doctor_id": "1",
      "user_id": "2",
      "specialty_id": "{specialty_id}",
      "working_hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
      "availability": "true"
    }]

    404 Not Found
    
    [{
      "error": "Specialty does not found."
    }]
```

- **Request POST** __`/users/doctors`__ - create a new doctor (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      |  User ID. |
| `specialty_id`  | string | Yes      |  Specialty's ID. |
| `working_hours`  | string | Yes      | Doctor's working hours. |
| `availability`  | boolean | Yes      |  Doctor's availability. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "doctor_id": "2"
      "user_id": "4",
      "specialty_id": "2",
      "working_hours": "{"Mon": "{ open: 9, close: 13 }", "Tue": "{ open: 13, close: 17 }", "Wed": "{ open: 9, close: 13 }", "Thu": "{ open: 13, close: 17 }", "Fri": "     { open: 9, close: 13 }", "Sat": "{ open: 13, close: 17 }", "Sun": "{ open: 11, close: 14 }"}",
      "availability": "true"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/users/doctors/{doctor_id}`__ - Update doctor's properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `doctor_id`  | string | Yes      | The doctor ID for change properties in necessary account. |
| `specialty_id`  | string | Yes      | Change the specialty from "1" to "3". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Doctor account with ID {doctor_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid specialty ID format"
  }]
```

- **Request DELETE** __`/users/doctors/{doctor_Id}`__ - Delete a doctor (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `doctor_id`  | string | Yes      | The doctor ID to delete doctor's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Doctor account with ID {doctor_id} has been deleted successfully"
  }]

  400 Bad Request: if the doctor_id parameter is invalid.
  [{
    "error": "Invalid doctor ID"
  }]

  404 Not Found: if the record with the given udoctor_id does not exist in the database.
  [{
    "error": "Doctor ID does not exist"
  }]

```
## Patient endpoints

- **Request GET** __`/users/patients`__ - Get all patients (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
    {
      "patient_id": "1",
      "user_id": "3",
      "disease_id": "1",
      "disease_id": "2",
      "info": "cough, fever, high blood pressure",
    },
    ...
    ]
```
- **Request GET** __`/users/patients/{patient_id}`__ - Get a patient by ID (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `patient_id`  | string | Yes      | The patient ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === patient_id exists:

    200 OK success status response
    
    [{
      "patient_id": "{patient_id}",
      "user_id": "3",
      "disease_id": "1",
      "disease_id": "2",
      "info": "cough, fever, high blood pressure",
    }]

    If patient_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid patient ID."
    }]

    If the record with id === patient_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Patient not found."
    }]
```

- **Request POST** __`/users/patients`__ - create a new patient (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      |  User ID. |
| `disease_id`  | string | Yes      |  Disease ID. |
| `info`  | string | Yes      |  Information about the patient. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "patient_id": "2",
      "user_id": "6",
      "disease_id": "2",
      "info": "high blood pressure",
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/users/patients/{patient_id}`__ - Update patient's properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `patient_id`  | string | Yes      | The patient ID for change properties in necessary account. |
| `info`  | string | Yes      | Change the info from "high blood pressure" to "chest pain and high blood pressure". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Patient account with ID {patient_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid specialty title format"
  }]
```

- **Request DELETE** __`/users/patients/{patient_id}`__ - Delete a patient (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `patient_id`  | string | Yes      | The patient ID to delete patient's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Patient account with ID {patient_id} has been deleted successfully"
  }]

  400 Bad Request: if the patient_id parameter is invalid.
  [{
    "error": "Invalid patient ID"
  }]

  404 Not Found: if the record with the given patient_id does not exist in the database.
  [{
    "error": "Patient ID does not exist"
  }]

```

## Admin endpoints

- **Request GET** __`/users/admins`__ - Get all admins (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
    {
      "admin_id": "1",
      "user_id": "1",
      "is_active": "true"
    },
    ...
    ]
```
- **Request GET** __`/users/admins/{admin_id}`__ - Get an admin by ID (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `admin_id`  | string | Yes      | The admin ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === admin_id exists:

    200 OK success status response
    
    [{
      "admin_id": "1",
      "user_id": "1",
      "is_active": "true"
    }]

    If admin_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid admin ID."
    }]

    If the record with id === admin_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Admin not found."
    }]
```

- **Request POST** __`/users/admins`__ - create a new admin (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      |  User ID. |
| `is_active`  | boolean | Yes      |  Information about the admin's current state. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "admin_id": "2",
      "user_id": "7",
      "is_active": "false"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/users/admins/{admin_id}`__ - Update admin's properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `admin_id`  | string | Yes      | The admin ID for change properties in necessary account. |
| `is_active`  | boolean | Yes      | Change the info from "false" to "true". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Admin account with ID {admin_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid specialty title format"
  }]
```

- **Request DELETE** __`/users/admins/{admin_id}`__ - Delete an admin (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `admin_id`  | string | Yes      | The admin ID to delete admin's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Admin account with ID {admin_id} has been deleted successfully"
  }]

  400 Bad Request: if the admin_id parameter is invalid.
  [{
    "error": "Invalid admin ID"
  }]

  404 Not Found: if the record with the given admin_id does not exist in the database.
  [{
    "error": "Admin ID does not exist"
  }]

```

### Specialty endpoints

- **Request GET** __`/specialties`__ - Get all specialties.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
    [
    {
      "specialty_id": "1",
      "specialty_title": "Pulmonology",
      "disease_id": "1",
    },
    {
      "specialty_id": "2",
      "specialty_title": "Cardiology",
      "disease_id": "2",
    },
    ...
    ]
```

- **Request GET** __`/specialties/{specialty_id}`__ -  Get a specialty by ID.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_id`  | string | Yes      | The disease ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === specialty_id exists:

    200 OK success status response
    
    [{
      "specialty_id": "{specialty_id}",
      "specialty_title": "Pulmonology",
      "disease_id": "1",
    }]

    If specialty_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid specialty ID."
    }]

    If the record with id === specialty_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Specialty not found."
    }]
```

- **Request POST** __`specialties`__ - create a new specialty (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_title`  | string | Yes      |  The specialty title. |
| `disease_id`  | string | Yes      |  Disease's belong to this specialty ID. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "specialty_id": "3",
      "specialty_title": "Internal medicine",
      "disease_id": "1",
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/specialties/{specialty_id}`__ - Update specialty's properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_id`  | string | Yes      | The specialty ID for change properties in necessary account. |
| `disease_id`  | string | Yes      | Change the diseases's ID from "2" to "4". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Specialty with ID {specialty_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid input data format"
  }]
```

- **Request DELETE** __`/specialties/{specialty_id}`__ - Delete a specialty (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_id`  | string | Yes      | The specialty ID to delete the specialty. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Specialty with ID {specialty_id} has been deleted successfully"
  }]

  400 Bad Request: if the specialty_id parameter is invalid.
  [{
    "error": "Invalid specialty ID"
  }]

  404 Not Found: if the record with the given specialty_id does not exist in the database.
  [{
    "error": "Specialty ID does not exist"
  }]

```

### Disease endpoints

- **Request GET** __`/diseases`__ - Get all diseases.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "disease_id": "1",
      "disease_title": "pneumonia",
      "specialty_id": "1",
    },
     {
      "disease_id": "2",
      "disease_title": "hypertension",
      "specialty_id": "2",
    },
    ...
    ]
```

- **Request GET** __`/diseases/{disease_id}`__ -  Get a disease.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The disease ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === disease_id exists:

    200 OK success status response
    
    [{
      "disease_id": "{disease_id}",
      "disease_title": "pneumonia",
      "specialty_id": "1"
    }]

    If disease_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid disease ID."
    }]

    If the record with id === disease_id doesn't exist:

   404 Not Found
    
    [{
      "error": "User not found."
    }]
```

- **Request POST** __`diseases`__ - create a new disease (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_title`  | string | Yes      |  The disease title. |
| `specialty_id`  | string | Yes      |  Specialty's ID. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "disease_id": "2",
      "disease_title": COPD",
      "specialty_id": "1"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/diseases/{disease_id}`__ - Update disease's properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `disease_title`  | string | Yes      | Change the diseases's title from "COPD" to "chronic obstructive pulmonary disease". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Disease with ID {disease_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid input data format"
  }]
```

- **Request DELETE** __`/diseases/{disease_id}`__ - Delete a disease (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The disease ID to delete disease's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Disease with ID {disease_id} has been deleted successfully"
  }]

  400 Bad Request: if the disease_id parameter is invalid.
  [{
    "error": "Invalid disease ID"
  }]

  404 Not Found: if the record with the given disease_id does not exist in the database.
  [{
    "error": "Disease ID does not exist"
  }]

```

### Appointment endpoints

- **Request GET** __`/appointments`__ - Retrieves a list of all appointments. (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "appointment_id": "2",
      "patient_id": "3",
      "doctor_id": "2",
      "status": "approved",
      "date": "20.10.2023",
      "start: "9.00",
      "end: "9.30"
    },
       {
      "appointment_id": "2",
      "patient_id": "3",
      "doctor_id": "4",
      "status": "approved",
      "date": "20.10.2023",
      "start: "9.30",
      "end: "10.00"
    },
    ...
    ]
```

- **Request GET** __`/appointments/{appointment_Id}`__ - Retrieves the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === appointment_Id exists:

    200 OK success status response
    
    [{
      "appointment_id": "2",
      "patient_id": "3",
      "doctor_id": "2",
      "status": "approved",
      "date": "20.10.2023",
      "start: "9.00",
      "end: "9.30"
    }]

    If appointment_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid appointment ID."
    }]

    If the record with id === appointment_Id doesn't exist:

   404 Not Found
    
    [{
      "error": "Appointment does not found."
    }]
```

- **Request POST** __`appointments`__ - Creates a new appointment (id will be added automatically). (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `patient_id`  | string | Yes      |  Patient ID. |
| `doctor_id`  | string | Yes      | Doctor ID. |
| `status`  | string | Yes      | The appointment status. |
| `date`  | string | Yes      |  Appointment's date. |
| `start`  | string | Yes      |  Time when appointment starts. |
| `end`  | string | Yes      |  Time when appointment ends. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
   [{
      "appointment_id": "2",
      "patient_id": "3",
      "doctor_id": "4",
      "status": "approved",
      "date": "20.10.2023",
      "start: "11.30",
      "end: "12.00"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`appointments/{appointment_Id}`__ - Updates the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID for change settings. |
| `date`  | string | Yes      | Change the date from "20.10.2023" to "21.10.2023". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Appointment with ID {appointment_Id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid date format"
  }]

     404 Not Found
    
    [{
      "error": "This date does not found."
    }]
```

- **Request DELETE** __`appointments/{appointment_Id}`__ - Delete a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID to delete this appointment. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Appointment with ID {appointment_ID} has been deleted successfully"
  }]

  400 Bad Request: if the appointment_Id parameter is invalid.
  [{
    "error": "Invalid appointment ID"
  }]

  404 Not Found: if the record with the given appointmentId does not exist in the database.
  [{
    "error": "Appointment ID does not exist"
  }]

```

### Review endpoints

- **Request GET** __`/reviews`__ - Get all users.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "review_id": "1",
      "appointment_id": "1",
      "creator": "Patient",
      "rate": "5 stars",
      "message": "Olena Kopytko in five days managed my pneumonia! exellent Doctor",
    },
    {
      "review_id": "2",
      "appointment_id": "2",
      "creator": "Patient",
      "rate": "3 stars",
      "message": "Unfortunately, my blood pressure remains uncontrolled. Despite the fact that the doctor was kind to me.",
    },
    ...
    ]
```

- **Request GET** __`/reviews/{review_id}`__ - Get a review by ID.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The review ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === review_id exists:

    200 OK success status response
    
    [{
      "review_id": "{review_id}",
      "creator": "Patient",
      "appointment_id": "1",
      "rate": "5 stars",
      "message": "Olena Kopytko in five days managed my pneumonia! exellent Doctor"
    }]

    If review_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid review ID."
    }]

    If the record with id === review_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Review not found."
    }]
```

- **Request POST** __`/reviews`__ - create a new review (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `creator`  | string | Yes      | Review's creator. |
| `appointment_id`  | string | Yes      | Appointment ID. |
| `rate`  | string | Yes      |  Appointment's rate. |
| `message`  | string | Yes      |  Review message. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "review_id": "3",
      "appointment_id": "3",
      "creator": "Patient",
      "rate": "5 stars",
      "message": "I am satisfied with the results"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/reviews/{review_id}`__ - Update review's properties.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `creator`  | string | Yes      | Change the creator from "Patient" to ""Admin". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Review entity with ID {review_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid user ID format"
  }]
```

- **Request DELETE** __`/reviews/{review_id}`__ - Delete a review.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The review ID to delete review's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Review's entity with ID {review_id} has been deleted successfully"
  }]

  400 Bad Request: if the review_id parameter is invalid.
  [{
    "error": "Invalid review ID"
  }]

  404 Not Found: if the record with the given review_id does not exist in the database.
  [{
    "error": "Review ID does not exist"
  }]

```

### Conflict endpoints

- **Request GET** __`/conflicts`__ - Get all conflicts (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "conflict_id": "1",
      "admin_id": "1",
      "appointment_id: 2",
      "reason": "bad treatment results",
      "status": "fulfilled",
   },
    ...
    ]
```


- **Request GET** __`/conflicts/{conflict_id}`__ - Get a conflict by ID (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The user ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === conflict_id exists:

    200 OK success status response
    
    [{
      "conflict_id": "1",
      "admin_id": "1",
      "appointment_id: 2",
      "reason": "bad treatment results",
      "status": "fulfilled",
    }]

    If conflict_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid conflict ID."
    }]

    If the record with id === conflict_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Conflict not found."
    }]
```

- **Request POST** __`/conflicts`__ - create a new conflict (id will be added automatically) (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `admin_id`  | string | Yes      |  Admin ID. |
| `appointment_id`  | string | Yes      |  Appointment ID. |
| `reason`  | string | Yes      |  The reason of the conflict. |
| `stasus`  | string | Yes      |  Conflict's status. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "conflict_id": "2",
      "admin_id": "1",
      "appointment_id: 4",
      "reason": "My appointment was cancelled",
      "status": "processing",
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/conflicts/{conflict_id}`__ - Update conflict's enyity properties (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `appointment_id`  | string | Yes      | Change the appointment ID  from "3" to "2". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Conflict entity with ID {conflict_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid user ID format"
  }]
```

- **Request DELETE** __`/conflicts/{conflict_id}`__ - Delete a conflict (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The conflict ID to delete conflict's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Conflict entity with ID {conflict_id} has been deleted successfully"
  }]

  400 Bad Request: if the conflict_id parameter is invalid.
  [{
    "error": "Invalid conflict ID"
  }]

  404 Not Found: if the record with the given conflict_id does not exist in the database.
  [{
    "error": "Conflict ID does not exist"
  }]

```

## Installation

Node.js needs to be installed on your machine.

Clone this repo with command

```
git clone git@github.com:AnastasiiaYaM/HospitalAppointmentAPI.git
```

Go to project folder

```
cd HospitalAppointmentAPI
```

Install dependencies

```
npm install
```

## Dockerization

For running application in Docker container you should have docker installed on your machine

Run app

```
docker compose up
```

Stop App

```
docker compose down
```

## Database schema

![db-schema](https://github.com/AnastasiiaYaM/HospitalAppointmentAPI/blob/main/db%20schema.png)
