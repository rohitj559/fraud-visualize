# FraudVisualize

This is a simple project to visualize and predict Fraud analytics. The app is built on Angular 7.x for rendering the visualization for data and make a prediction on target attribute(Fraud Loss) using prediction form. Data for visualization is provided as a JSON. Model used for prediction is built using python and Flask. 

## How to run and use the app

1. Data for the app is at location - fraud-visualize/src/api/data/data.json

2. Clone the project into your local repository - `git clone https://github.com/rohitj559/fraud-visualize.git`

3. Run the app within the root directory using Angular CLI. The command to run the app is configured within `package.json` file. Use the command - `npm start` to run the app

4. Once the app loads, We can visualize all the different charts by cliking the appropriate buttons on the app. However, to work with the `Prediction form` on the angular app, we first need to run few Python files.

5. Navigate to path - `fraud-visualize/regression-model/` and run the command `python3 server.py` on your command-promt or terminal window. The server should run on `localhost:5000` by default. Once the server is up and running, we can make use of `Prediction form` within Angular app to make a prediction of fraud loss numeric figure for appropriate `month` and `active cards` entered.

6. The Regression model for the app is pre-buit and stored as `fraud-visualize/regression-model/model.pkl`. However, we can create the model again by running the command `python3 model.py`

7. For testing the model, try doing `python3 request.py`. Note: Step 7 should be executed only after step 5

Note:  If you run into CORS issue while making form submission on UI, try loading your browser(chrome) using the below command -
`chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security`

After running the above command on START prompt(for windows), load the app with the url - `http://localhost:4200`  
