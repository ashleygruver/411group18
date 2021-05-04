# 411group18
## Justin Chan, Jin Young Bang, Jin Lou, Jacob Gruver, Christopher Balboni, Nonso Chuckwujama

To run the application, both the Flask App (located inside the server directory) and the React App (located inside the app directory) must be running together. 

To replicate running the application, ensure that the Flask server is running on localhost with port 5000.

## Notes:

### To activate a virtual environment

```bash
pipenv shell
```

### To deactivate a virtual environment

```bash
deactivate
exit
```

### To install all the dependencies from pipenv

```bash
pipenv install
```

### To install a specific dependency into the project (make sure you are within the virtual environment)

```bash
pipenv install dependency_name
```

### To run the Flask App

Go to the directory of the server:
```bash
cd server
```

Run the server:
```bash
export FLASK_APP=manage.py
flask run
```

### To run the Flask App on Debug Mode

Go to the directory of the server:
```bash
cd server
```

Run the server:
```bash
export FLASK_APP=manage.py
export FLASK_ENV=development
flask run
```

### To run the React App

Go to the directory of the app:
```bash
cd server
```

Run the React App:
```bash
npm start
```
