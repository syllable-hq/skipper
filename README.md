# Syllable's Home Website


This website is built on React-Static: "A progressive static site generator for React".

Please see the [React-Static](https://github.com/nozzle/react-static) documentation for more details about this website structure and build processes.

-----

## Development
To run in development, run:
```
yarn start
```


## Production
To build for production, run:
```
yarn build
```
You can test the production build with:
```
yarn serve
```
Yarn serve just serves the static build from the `/dist` folder. This folder can be deployed to a server to be run as a static build.


## Deploying
The app is running on [netlify.com](https://syllable-skipper.netlify.com/). The website will deploy automatically to [xxxxxx.com](https://xxxxxxx.com/) when code is pushed to the `master` branch.

## Env variables

Use proper env variables values

```
API_KEY=XXXXxxxx
AUTH_DOMAIN=xxxxXXXX.firebaseapp.com
DATABASE_URL=https://xxxXXXX.firebaseio.com
PROJECT_ID=xxxxXXXX
STORAGE_BUCKET=xxxxXXXX.appspot.com
MESSAGING_SENDER_ID=xxxxXXXX
APP_ID=xxxxxxxx
```
