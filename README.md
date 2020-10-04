<img src="https://avatars0.githubusercontent.com/u/993323" height="100px">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="100px">

Test blog application using React.js and Yii2 RESTful service
-------------------------------------------------------------

To set up this project you need to create the schema in your database and then configure Yii2
`config/db.php` file and specify dsn, database name etc.

After this action it requires running of migrations (run command in root directory):

~~~
php yii migrate
~~~

### To run an application (in root):

~~~
php yii serve
~~~

and then it competes:

~~~
cd ./frontend
npm start
~~~

### Cloning from git repository

If you will clone this project from GitHub repository you will need some additional actions such as:

~~~
composer install
~~~

in the root directory and:

~~~
cd ./frontend
npm install
~~~