# Project EventSync

Our project, EventSync, is a platform that helps the organizers and people who love attending events connect with each other. This platform allows the organizers to add their events in order to attract more crowds to the events and for people to discover all types of events happening around them according to their liking.

- _Date Created_: 26 007 2023
- _Last Modification Date_: 26 007 2023
- _Git URL_: https://git.cs.dal.ca/dankhara/csci_5709_grp-06

## Authors

- [Vatsal Jain](vt981557@dal.ca) - Full Stack Developer
- [Mehulkumar Bhunsadiya](mh207556@dal.ca) - Full Stack Developer
- [Dhruvin Dankhara](dh793203@dal.ca) - Full Stack Developer
- [Faizal Maulvi](mh795616@dal.ca) - Full Stack Developer
- [Preetha Kachhadiya](pr966330@dal.ca) - Full Stack Developer

## Deployment

Front-end deployment URL: https://main--monumental-salmiakki-3549db.netlify.app/

Back-end deployment URL: https://web-group-project-backend-server.onrender.com

## Testing

Deployed the front-end and back-end of the application on Render and Netlify. Performed end-to-end testing of my module's independent behaviour as well as it's behaviour with the other components.

### Break down into end to end tests

Tested the user registration

```
Visited the '/registration' endpoint of the front-end and  stored in MongoDB.
```

Tested the user Login

```
Visited the '/login' endpoint of the front-end and verified it with the content stored in MongoDB and genereted token for further usage.
```

Tested the Onboarding

```
Visited the '/onboarding' endpoint of the front-end, verified it with the content stored in MongoDB and added interests to user schema.
```

Tested the user edit profile

```
Visited the '/edit-profile/:id' endpoint of the front-end and check changes in user profile and sved updated user details to the MongoDB.
```

Tested the Reset password

```
Visited the '/reset-password' endpoint of the front-end and check the registered email and send token on that email. submit new password and token to change the password.
```

Tested the listing of Faqs

```
Visited the '/support/faqs' endpoint of the front-end and verified it with the content stored in MongoDB.
```

Tested the creation of Admin Query

```
Visited the '/support/create-admin-query/:userId' endpoint of the front-end after logging in with a valid user and verified it with the content stored in MongoDB.
```

Tested the listing of Admin Query

```
Visited the '/support/view-admin-query/:userId' endpoint of the front-end after loggin in with a valid user and verified it with the content stored in MongoDB.
```
Tested the add event to wishlist

```
Visited the '/event-details/:id' endpoint of the front-end and click on the 'add to wishlist' button to add the event in the wishlist and in back-end ater validating the user, add the event in the wishlist of that user.
```

Tested the wishlist events list

```
Visited the '/wishlist' endpoint of the front-end and view all the events in the wishlist.
```
Tested the Search, sort anf filter on events in wishlist

```
Visited the '/wishlist' endpoint of the front-end and search, sort and filter the events.
```
Tested the remove event from wishlist

```
Visited the '/wishlist' endpoint of the front-end and click on the trash icon of an event to remove that event from the wishlist and in back-end after validating the user, delete the event from the wishlist of that user.
```

## Explanation

1. Display FAQs: Click on FAQ on the screen and all the FAQs would be rendered in the form of accordions.
2. Create Admin Query: After logging in with a valid user, from the FAQ page, the user can create an admin query to reach out for help or give suggestions to the Admin to make improvements. User just needs to add the title and description and submit the query.
3. View Admin Query: After logging in with a valid user, from the FAQ page, the user can see the list of Admin Queries created by them and whether or not the admin has responded to those queries. Queries can be filtered based on their status i.e. open or closed.
4. Contact Support: On the FAQ page, when the user clicks on the "Contact Support" button he is directed to his default mail service with our application's support email address added in the list of recipients.
5. Add event to wishlist: On the event details page, click the add to wishlist button and that event will be added to the user's wishlist.
6. View events in wishlist: Click on 'Wishlist' option from the header and the user will be redirected to the wishlist page. There the user can view all the events that they have added to the wishlist.
7. Search, sort, filter events in the wishlist: On the wishlist pae, the user can search for events, sort them and filter them accrding to their liking.
8. Remove event from wishlist: On the event card in the wishlist, on clicking on the trash icon, the event is removed from the wishlist.

## Files created

Back-end:

- Backend\src\controllers\support\support.controller.js
- Backend\src\model\AdminQuery.model.js
- Backend\src\model\Faq.model.js
- Backend\src\repository\support.repository.js
- Backend\src\routes\support.routes.js

Front-end:

- Frontend\src\Pages\Support\CreateAdminQuery\createAdminQuery.css
- Frontend\src\Pages\Support\CreateAdminQuery\createAdminQuery.js
- Frontend\src\Pages\Support\Faq\faq.js
- Frontend\src\Pages\Support\ViewAdminQuery\viewAdminQuery.css
- Frontend\src\Pages\Support\ViewAdminQuery\viewAdminQuery.js

## Feature: Data Analysis And Visualization

I have used React for front-end development and learned the use of states and changing the dom as per users input. I have used open-source library for chart generation. For the back-end developnment, I have used NodeJS along with mongoose and express libraries. I have also created a functionality where user can set the default value for the generations of charts as per their preference.

Tasks for Data Analysis And Visualization

```
- Fetch Event Data Details
- Fetch Data for people enrolled in th event based on the user's preference
- Fetch Data for the age distribution of the event based on the user's preference
- Update the user's preference if they want to modify the default value.
- Allowing users to modify the type of chart so that they can have a better understanding of the trends
```

Files for Front End

```
- AnalyticsEventLeftGraph : Frontend\src\Pages\Analytics\AnalyticsEventDataDetails\AnalyticsEventLeftGraph\AnalyticsEventLeftGraph.jsx
- AnalyticsEventPieChart : Frontend\src\components\Analytics\AnalyticsEventDataDetails\AnalyticsEventPieChart\AnalyticsEventPieChart.jsx
- AnalyticsEventDataDetails : Frontend\src\components\Analytics\AnalyticsEventDataDetails\AnalyticsEventDataDetails.jsx
- AnalyticsEventDetail : Frontend\src\components\Analytics\AnalyticsEventDetail\AnalyticsEventDetail.jsx
- Analytics : Frontend\src\components\Analytics\Analytics.jsx
- ContactUs : Frontend\src\Pages\ContactUs\ContactUs.js
- ContactUs (css) : Frontend\src\Pages\ContactUs\ContactUs.css
- Header : Frontend\src\Components\Header\Header.js
- Header (css) : Frontend\src\Components\Header\Header.css
- Footer : Frontend\src\Components\Footer\Footer.js
- Footer (css) : Frontend\src\Components\Footer\Footer.css
```

Files for Backend

```
- analytics.controller : Backend\src\controllers\analytics\analytics.controller.js
- analytics.repository : Backend\src\repository\analytics.repository.js
- analytics.routes : Backend\src\routes\analytics.routes.js
```

Explanation:

User will be able to fetch the details of the event from my events. On clicking on see analytics, they will be redirected to the analytics page. The chart will be loaded with the default configurations of the user. The user will be able to update the default time limits for the graphs. User can also modify the type of graphs such as bar, column, line and area.

## Feature: Wishlist

I have used React for front-end development and learned the use of states and changing the dom as per users input. For the back-end developnment, I have used NodeJS along with mongoose and express libraries. I have created the CRUD functionality for events in the wishlist and also the search, sort and filter functionality in backend and frontend combined.

Tasks for Wishlist

```
- Fetch Events in the wishlist
- Fetch events with sort and filter functionality
- Perform search functionality in frontend
- Add event in the wishlist
- Remove event from the wishlist
```

**Files for Front End**

| File Name | Relative Path |
| ------------------ | -------------- |
|eventCardWishlist.js|Frontend\src\Pages\Wishlist\eventCardWishlist.js|
|Wishlist.js|Frontend\src\Pages\Wishlist\Wishlist.js|
|Wishlist.css|Frontend\src\Pages\Wishlist\Wishlist.css|

**Files for Backend**

| File Name | Relative Path |
| ------------------ | -------------- |
|wishlist.controller.js|Backend\src\controllers\wishlist\wishlist.controller.js|
|Wishlist.model.js|Backend\src\model\Wishlist.model.js|
|wishlist.routes.js|Backend\src\routes\wishlist.routes.js|
|wishlist.repository.js|Backend\src\repository\wishlist.repository.js|

Explanation:

User will be able to add the event fron the event-details page. By goning to the wishlist page, the usr can view all the events in the wishlist and also perform search, sort and filter functionality. The user can also remove an event fromt he wishlist by clicking on the trash icon of that event.


## Feature: Event Management

features developed along with its related tasks, files created, code referencing and justifications, integration instructions.

Create following pages for event module in front-end

```
- Create event
- Edit event
- Complete event
- view my event
- view event list
```

Create following APIs for event module in back-end

```
- POST API request for create event
- PUT API request for edit event
- GET API request for event details, event list, my event
```

Create following file or folder better structure

Frontend

```
-Frontend
  | -src
  | | -Pages
  | | | -Event
  | | | | - CreateEvent
  | | | | - EditEvent
  | | | | - EventDetails
  | | | | - EventList
  | | | | - MyEvent
  | | -services
  | | | -eventApi.js
```

Backend

```
-Backend
  | -src
  | | -config
  | | | -conn.js
  | | -controllers
  | | | -event
  | | | | -event.controller.js
  | | | | -event.validator.js
  | | -model
  | | | -Event.model.js
  | | -repository
  | | | -event.repository.js
  | | -routes
  | | | -event.routes.js
  | | -utils
  | | | -fileUpload.js
  | | | -Message.js
  | | | -protected.js
  | | | -response.js
  | -uploads
  | -server.js
```

## Testing for event module

Render and Netlify were used to deploy the application's front-end and back-end. End-to-end testing of my module's standalone behaviour as well as its interaction with other components.

Credentials of user who is organizer

- email: ddankhara1572000@gmail.com
- password: Demo@123

#### NOTE: Image upload functionality is not implemented yet

Test all other features like View Event, Edit Event and complete Event.

## Explanation

Assumption
user is authenticated and role must be organizer.

Create event: After successfull login, user can click on event tab in nav bar and selecting my event. On create event page there is create event button. Click on create event button to open form and enter all the details.

Edit event: On my-event page, which ever event created by the user, it will be display on that page with edit option.

Complete event: After successfull event, organizer have to complete the event by clicking on complete event button on my-event page.

view event: It is a common page to view any event in more details by clicking on view event button on my-event page.

View event List: user can click on event tab in nav bar and selecting event list to view all the events which is ongoing or upcoming.

## Built With

- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - The front-end toolkit used
- [React-bootstrap](https://www.npmjs.com/package/react-bootstrap) - Front-end toolkit used
- [React](https://react.dev/) - Front-end framework used
- [NodeJS](https://nodejs.org/en) - Back-end environment used
  \*\*

## Sources Used

I have used Bootstrap documentation as a reference to add Bootstrap classes to make the page responsive and user-friendly: https://getbootstrap.com/docs/4.0/getting-started/introduction/

I used the official documenmtation of React to get myself acquainted with the basics: https://react.dev/learn/

I used the official documenmtation of MongoDB to learn the basics: https://learn.mongodb.com/

### image sources

Open [https://www.flaticon.com/free-icon/user_1144709?term=profile&page=1&position=27&origin=tag&related_id=1144709] on the browser.

Open [https://www.freepik.com/free-photos-vectors/wide-background/2] on the browser.
