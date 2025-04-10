# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "email": "stanyslaushary@reusemart.my.id",
    "password": "rahasia",
    "role": "PEMBELI"
}
```

Response Body Success :

```json
{
    "data": {
        "email": "stanyslaushary@reusemart.my.id"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "stary",
    "password": "sejarah"
}
```

Response Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

-   Authorization : token

Request Body :

```json
{
    "name": "Programmer Ini", // optional
    "password": "new password" // optional
}
```

Response Body Success :

```json
{
    "data": {
        "username": "stary",
        "name": "Programmer Ini"
    }
}
```

Response Body Error :

```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "data": {
        "username": "stary",
        "name": "Saku Talu"
    }
}
```

Response Body Error :

```json
{
    "errors": "unathorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "errors": "Unathorized"
}
```
