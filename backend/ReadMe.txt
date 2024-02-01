contents:
---------
-Authorization with the application--------[{"rows": 039-095}];
--sign_up----------------------------------[{"rows": 043-078}];
--log_in-----------------------------------[{"rows": 079-095}];
--------------
-user requests-----------------------------[{"rows": 096-195}];
--get all users------------------------------[{"rows": 100-113}];
--get user by id-----------------------------[{"rows": 114-128}];
--edit user----------------------------------[{"rows": 129-166}];
--change isBusiness status-------------------[{"rows": 167-181}];
--delete user--------------------------------[{"rows": 182-195}];
--------------
-card requests-----------------------------[{"rows": 196-358}];
--all cards----------------------------------[{"rows": 200-212}];
--get user cards-----------------------------[{"rows": 213-226}];
--get card-----------------------------------[{"rows": 227-240}];
--create card--------------------------------[{"rows": 241-274}];
--edit card----------------------------------[{"rows": 275-309}];
--like card----------------------------------[{"rows": 310-324}];
--delete card--------------------------------[{"rows": 325-339}];
--change bizNumber---------------------------[{"rows": 340-357}];
--------------
user from server---------------------------[{"rows": 358-401}];
--------------
card from server---------------------------[{"rows": 402-433}];
--------------
-Blocking a user for 24 hours--------------[{"rows": 434-440}];
--------------
-logger requests---------------------------[{"rows": 441-446}];
--------------
-Initial data------------------------------[{"rows": 447-451}];
--------------
-log_in with google OAuth------------------[{"rows": 452-456}];
--------------
-Summary-----------------------------------[{"rows": 457-459}];
--------------

Authorization with the application:
-----------------------------------

--------------------------------
sign_up:
--------
url: http://localhost:4000/users
method: POST
headers:
    Authorization: none
demand: none

get back: user

need to get:
    {
        "name": {
            "first": "required", [Joi.string().min(3).max(15).required()]
            "middle": "not required", [Joi.string().optional().allow('')]
            "last": "required", [Joi.string().min(3).max(15).required()]
        },
        "phone": "required", [Joi.string().min(10).max(15).required()]
        "email": "required", [Joi.string().email({ tlds: false }).required()]
        "password": "required", [Joi.string().min(6).max(10).required()]
        "image": {
            "url": "not required", [Joi.string().optional().allow('')]
            "alt": "not required", [Joi.string().optional().allow('')]
        },
        "address": {
            "state": "not required", [Joi.string().min(3).max(20).optional().allow('')]
            "country": "required", [Joi.string().min(3).max(20).required()]
            "city": "required", [Joi.string().min(3).max(20).required()]
            "street": "required", [Joi.string().min(3).max(20).required()]
            "houseNumber": "required", [Joi.number().max(5).required()]
            "zip": "not required", [Joi.string().optional().allow('')]
        },
        "isBusiness": "false", [false as default only require if you want to change to true][Joi.boolean().default(false)]
    }

--------------------------------
log_in:
-------
url: http://localhost:4000/users/login
method: POST
headers:
    Authorization: none
demand: none

get back: user token

need to get:
    {
        "email": "required", [Joi.string().email({ tlds: false }).required()]
        "password": "required", [Joi.string().min(6).max(10).required()]
    }

--------------------------------
user requests
-------------

--------------------------------
get all users:
--------------
url: http://localhost:4000/users
method: GET
headers:
    Authorization: token
demond: 
    only admin

get back: array of users

need to get: none

--------------------------------
get user by id:
---------------
url: http://localhost:4000/users/:id
method: GET
headers:
    Authorization: token
demond:
    The user himself or admin

get back: user

need to get:
    id on URL

--------------------------------
edit user:
----------
url: http://localhost:4000/users/:id
method: PUT
headers:
    Authorization: token
demond:
    The user himself

get back: user

need to get:
    id on URL,
    {
        "name": {
            "first": "required", [Joi.string().min(3).max(15).required()]
            "middle": "not required", [Joi.string().optional().allow('')]
            "last": "required", [Joi.string().min(3).max(15).required()]
        },
        "phone": "required", [Joi.string().min(10).max(15).required()]
        "email": "required", [Joi.string().email({ tlds: false }).required()]
        "password": "required", [Joi.string().min(6).max(10).required()]
        "image": {
            "url": "not required", [Joi.string().optional().allow('')]
            "alt": "not required", [Joi.string().optional().allow('')]
        },
        "address": {
            "state": "not required", [Joi.string().min(3).max(20).optional().allow('')]
            "country": "required", [Joi.string().min(3).max(20).required()]
            "city": "required", [Joi.string().min(3).max(20).required()]
            "street": "required", [Joi.string().min(3).max(20).required()]
            "houseNumber": "required", [Joi.number().max(5).required()]
            "zip": "not required", [Joi.string().optional().allow('')]
        },
        "isBusiness": "false", [false as default only require if you want to change to true][Joi.boolean().default(false)]
    }

--------------------------------
change isBusiness status:
-------------------------
url: http://localhost:4000/users/:id
method: PATCH
headers:
    Authorization: token
demond:
    The user himself

get back: user

need to get:
    id on URL

--------------------------------
delete user:
url: http://localhost:4000/users/:id
method: DELETE
headers:
    Authorization: token
demond:
    The user himself or admin

get back: deleted user

need to get:
    id on URL

--------------------------------
card requests:
--------------

--------------------------------
all cards:
----------
url: http://localhost:4000/cards
method: GET
headers:
    Authorization: none
demond: none

get back: array of cards

need to get: none

--------------------------------
get user cards:
---------------
url: http://localhost:4000/cards/my-cards
method: GET
headers:
    Authorization: token
demond: 
    only the user who created the card

get back: array of user cards

need to get: none

--------------------------------
get card:
---------
url: http://localhost:4000/cards/:id
method: GET
headers:
    Authorization: none
demond: none

get back: card

need to get:
    id on URL

--------------------------------
create card:
------------
url: http://localhost:4000/cards
method: POST
headers:
    Authorization: token
demond: 
    only for bussiness card

get back: card

need to get: 
    {
        "title": "required", [Joi.string().min(3).max(30).required()]
        "subtitle": "required", [Joi.string().min(3).max(40).required()]
        "description": "required", [Joi.string().min(10).max(2500).required()]
        "phone": "required", [Joi.string().min(10).max(15).required()]
        "email": "required", [Joi.string().email({ tlds: false }).required()]
        "web": "required", [Joi.string().min(9).required()]
        "image": {
            "url": "not required", [Joi.string().optional().allow('')]
            "alt": "not required" [Joi.string().optional().allow('')]
        },
        "address": {
            "state": "not required", [Joi.string().min(3).max(20).optional().allow('')]
            "country": "required", [Joi.string().min(3).max(20).required()]
            "city": "required", [Joi.string().min(3).max(20).required()]
            "street": "required", [Joi.string().min(3).max(20).required()]
            "houseNumber": "required", [Joi.number().max(5).required()]
            "zip": "not required" [Joi.string().optional().allow('')]
        }
    }

--------------------------------
edit card:
----------
url: http://localhost:4000/cards/:id
method: PUT
headers:
    Authorization: token
demond: 
    only the user who created the card

get back: card

need to get:
    id on URL,
    {
        "title": "required", [Joi.string().min(3).max(30).required()]
        "subtitle": "required", [Joi.string().min(3).max(40).required()]
        "description": "required", [Joi.string().min(10).max(2500).required()]
        "phone": "required", [Joi.string().min(10).max(15).required()]
        "email": "required", [Joi.string().email({ tlds: false }).required()]
        "web": "required", [Joi.string().min(9).required()]
        "image": {
            "url": "not required", [Joi.string().optional().allow('')]
            "alt": "not required" [Joi.string().optional().allow('')]
        },
        "address": {
            "state": "not required", [Joi.string().min(3).max(20).optional().allow('')]
            "country": "required", [Joi.string().min(3).max(20).required()]
            "city": "required", [Joi.string().min(3).max(20).required()]
            "street": "required", [Joi.string().min(3).max(20).required()]
            "houseNumber": "required", [Joi.number().max(5).required()]
            "zip": "not required" [Joi.string().optional().allow('')]
        }
    }

--------------------------------
like card:
----------
url: http://localhost:4000/cards/:id
method: PATCH
headers:
    Authorization: token
demond: 
    only for registered user

get back: card

need to get:
    id on URL

--------------------------------
delete card:
------------
url: http://localhost:4000/cards/:id
method: DELETE
headers:
    Authorization: token
demond: 
    the user who created the card or admin

get back: card

need to get:
    id on URL

--------------------------------
change bizNumber:
------------
url: http://localhost:4000/cards/:id
method: PATCH
headers:
    Authorization: token
demond: 
    only admin

get back: card

need to get:
    id on URL,
    {
        bizNumber: "required", [Joi.string().min(7).max(7).regex(/[0-9]/).optional().allow('')]
    }

--------------------------------
user from server:
------------
{
    "_id": "",
    "name": {
        "first": "",
        "middle": "", 
        "last": "",
        "_id": "",
    },
    "phone": "",
    "email": "",
    "password": "",
    "image": {
        "url": "",
        "alt": "",
        "_id": "",
    },
    "address": {
        "state": "",
        "country": "",
        "city": "",
        "street": "",
        "houseNumber": "",
        "zip": "",
        "_id": "",
    },
    "isAdmin": "",
    "isBusiness": "",
    "createdAt": "",
    "__v": 0
}

you not get:
{
    "startDate": "",
    "connectAttempts": "",
}
at [get all users] you not get:
{
    "password": "",
}

--------------------------------
card from server:
-----------------
{
    "_id": "",
    "title": "",
    "subtitle": "",
    "description": "",
    "phone": "",
    "email": "",
    "web": "",
    "image": {
        "url": "",
        "alt": "",
        "_id": "",
    },
    "address": {
        "state": "",
        "country": "",
        "city": "",
        "street": "",
        "houseNumber": "",
        "zip": ""
        "_id": "",
    },
    "bizNumber": "",
    "likes": "",
    "user_id": "",
    "createdAt": "",
    "__v": "",
}

--------------------------------
Blocking a user for 24 hours:
-----------------------------
After 3 connection attempts, the user gets banned from the server for 24 hours. 
The server deletes the number of attempts to 0 every time it succeeds in connecting. 
Only on the first connection after the suspension will the server reset the number of attempts and allow connection on the same attempt.

--------------------------------
logger requests:
----------------
1. The server generates a trace file after each request in the logs folder. The file is called: log.txt
2. The server generates a separate file in the logs folder every day. The name of the file will be according to the date of that day.

--------------------------------
Initial data:
-------------
The server detects if there are no users on the server, if there are no users, generates users and cards. The cards are distributed randomly, so it is possible for a user to have no cards

--------------------------------
log_in with google OAuth:
-------------------------
I did the bonus section only on the server side, of course. In order to connect you need to write the fronted. You can use Google's guide.

--------------------------------
Summary:
--------
I did the whole project including all the bonuses!.