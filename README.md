# [DataExpert.io](http://www.dataexpert.io)

A full stack interactive e-learning web application that teaches people how to code in Python. 

Tech stack:
* Backend consists of 
   * Django web framework coupled with Django Rest Framework
   * [User code executor service](https://github.com/dirmi513/DataExpert-Code-Executor-Lambdas) created with the serverless framework. The service utilizes AWS Lambda and S3 to execute Python code 
   * An AWS RDS PostgreSQL instance as the database
   * AWS S3 buckets for storing media and pertinent files such as datasets and coding challenge answers
* Frontend consists of 
   * HTML
   * CSS
   * JavaScript and the React web framework
   * [Course Content Repository](https://github.com/dirmi513/DataExpert-Material)

For this project, I have set up React in its own "frontend" Django app. When Django starts up, it loads a single HTML template, and then React manages the frontend from there.

## How to Enjoy

Sign up and create a new profile:

![](https://s3.amazonaws.com/dataexpert.images/Media/signup.png)

Then login, or choose to login as a guest:

![](https://s3.amazonaws.com/dataexpert.images/Media/login.png)

You will be routed to the courses page, which contains details on the available course(s), as well as links to the
 lessons within that course in chronological order:

![](https://s3.amazonaws.com/dataexpert.images/Media/courses.png)

Finally, after selecting one of the lessons, you will be brought to the most recent slide within that lesson that you
 have not yet completed, and you can now take it from here.  Happy coding!

![](https://s3.amazonaws.com/dataexpert.images/Media/slide.png)
