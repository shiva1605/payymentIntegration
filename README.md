# PaypalIntegration

This project is a MEAN Stack project for the integration of paypal payment gateway

## How To Run
After importing the project, 'npm install' command should be executed. After that one line should be changed in node_modules. Refer to the wiki for details. Then navigate to backend folder and run node server.js.
Then in the browser, the link is 'http://localhost:3000/'

## Important Thing to keep in mind
The angular project and the node backend should be deployed in the same server. So, if you make some change in angular part, then npm build should be called. The outputPath variable under options object present in the  build object should be modified if necessary.
