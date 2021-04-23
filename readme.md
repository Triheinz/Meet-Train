# Meet & Train

## Description
Search and collaborative Data base platform for sports entusiast in which you can create your profile according to your sport qualities, level, and area. Also, you can also use the plaform to find people with similar interests make groups or just arrange sports activities.

## User Stories
- 404 - As users, we want to be politely warned that this page does not exist and it was our fault to search for it.
- 500 - As users, we want to be politely warned that the amazing team behind the project screwd it up and it's not our fault.​
- Homepage - As users, we want to be able to access the homepage and access the signup and login pages, as well as discover more about our web features or click and start looking for sport partners.
- Display results - As users, we want a nice display of the information we've been searching for taking in consideration filter sports type, area or sports level.
- Detailed display - As users, we also want to be able to get another nice display of the detailed information of the user profile we just clicked on.
- Sign Up - As users, we may love the page and want to see some additional content so we want to create an account. It's free!
- Log In - As users, we want to log in so we can see the amazing aditional features and create our profile!
- Log Out - As users, we want to close our session once we finished navigating through this amazing page so no one can get back to our account.
- Edit Profile - As users, we want to be able to edit our profiles whenever we need it.
- Create Sport group - As users, we want to be able to interact with group of people with similar sports interest and collaborate between us.
- Edit Sports group - As users, we want to edit the sport group if some information is not correct or there's a recent update.
- Delete Sport group - As users, we want to delete some of the sports groups we've created anytime we need to.
- Messages -  as users we want to stablish connection though a message to contact the other profiles user we like.
- Good Buddy -  as users we want to help the platform and other users know how our encounters went though a comment review on the profile of each user.



## Server Routes (back-end)

| ***\*****Method*****\*** | ***\*****Route*****\***  | ***\*****Description*****\***                                |
| ------------------------ | ------------------------ | ------------------------------------------------------------ |
| GET                      | /                        | Main page route. Renders home `index` view.                  |
| GET                      | /signup                  | Renders `auth/signup` form view.                             |
| POST                     | /signup                  | Sends Sign Up info to the server and creates user in the DB. Renders `auth/signup` view. \| {name, email, password} |
| GET                      | /login                   | Renders `auth/login` form view.                              |
| POST                     | /login                   | Sends Log In form data to the server and redirects to homepage. \| {email, password} |
| GET                      | /logout                  | Logges user out and redirects to `index` view.               |
| GET                      | /private/profile/:userId | Private route. Renders `private/profile` view.               |
| POST                     | /private/edit-user       | Private route. Sends edit-profile info to server and updates user in DB and in `profile` view. \| {[imageUrl], name, email, password} |
| POST                     | /private/delete-user     | Executes delete button function and updated DB. Redirects to `/private/profile/${userId}` view. |
| POST                     | /private/delete-groups   | Executes delete button function and updated DB. Redirects to `/private/profile/${userId}` view.`` |



## Models
User model
```javascript
{

    "image": { type: String, default: '../images/avatar.png' },
    "name": String,
    "email": String,
    "password": String,
    "description":String,
    "age": Number,
    "city": String,
    "sport": [String],
    "level": String,
    "GroupsCreate": [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    "mensaje": [{ type: Schema.Types.ObjectId, ref: 'User' }]


  }
```
Group model
```javascript
{
   "image": { type: String, default: '../images/avatar.png' },
    "name": String,
    "participants": [{ type: Schema.Types.ObjectId, ref: 'User' }]
    "password": String,
    "description":String,
    "city": String,
    "level": String,
    "GroupsCreate": [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    "mensaje": [{ type: Schema.Types.ObjectId, ref: 'User' }]
}
```

## Backlog

- Responsive
- Mapbox to display routes done by users
- Implement live chat feature
- Nodemailer to welcome user to the website and when joining sport group
- Create a public API with the db we made.


## Links

#### Git

[Repository Link](https://github.com/Triheinz/Meet-Train.git)

[Deploy Link]()



#### Trello

[Our Trello board](https://trello.com/b/m1G46xak/meettrain)



#### Slides

[Our amazing presentation!](https://www.figma.com/file/5UEUHe5E2Z2J8768LjAlRJ/Meet-and-Train?node-id=2%3A5)
