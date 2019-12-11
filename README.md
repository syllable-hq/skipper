# Skipper - A dead-simple password manager

Skipper is a dead-simple password manager. It is an open source project sponsored by [Syllable](https://www.syllablehq.com/).

## About
Skipper is secure, robust, and free! Skipper gives you an encrypted, cloud hosted vault of secrets which no one can read except you. This vault is secured by a fancy software trick called [end-to-end encryption](https://www.nytimes.com/2019/11/19/technology/end-to-end-encryption.html). This means that no one can see anything in your vault without a master password that only you know. This master password is never transmitted over the Internet, so it's impossible for anyone to snoop on your secrets. This works in a similar way to other password services like [Dashlane](https://blog.dashlane.com/what-if-dashlane-gets-hacked-master-password/), except Skipper is open-source and free.

## Why Skipper?
Skipper is simple. It's free, secure, and there's no need to install browser extensions. It's not meant to be a perfect replacement for paid password keepers. But for many people who can't be bothered with complicated techy things, it might just do the trick to get them using a password keeper.

## Disclaimers
This project is a (very) rough draft in development. Please use at your own risk. Expect that some links and components will not work yet. We have not yet fully audited the code, so it is not recommended to use real passwords with this service. Although we do offer a test website, we reserve the right to remove that service or delete data at any time. We can't guarantee perfect security at this time.

But! we hope to develop the project further and remove these disclaimers in the future 🥳

## How to try out Skipper
You can try out Skipper running on test server (but please see disclaimers above).

[https://skipper.herokuapp.com](https://skipper.herokuapp.com/).

Note: This is a test server and may take 15 seconds to "wake up" if it hasn't been accessed in a while.

## How to use Skipper

#### No account?
 - [Sign up](https://skipper.herokuapp.com/signup) for an account using only a master password. This master password **must** be unique and highly secure. Anyone who has this password can access your vault and see all your secrets. (Extra layers of more user-friendly security are planned in the future -- see below.)

#### Already have an account?
- [Log in](https://skipper.herokuapp.com/login) to Skipper from any browser using your master password. This will download your (encrypted) passwords and decrypt them for you as needed.

#### Save and retrieve secrets or passwords
- [From your dashboard](https://skipper.herokuapp.com/dashboard), add any secret or password. Skipper will hold the encrypted version of it until you need it later. Search for your passwords and copy them to your clipboard.

#### Log out
- When you log out, all information is cleared from the browser session.

#### That's it.
- Really, it's that simple.

## The State of Skipper! Current and future:
This code is very much in development. We've had a hard time finding time to push it forward.

#### We can haz funding??
Syllable has put many hours and thousands of dollars into this project already. We'd love to spend more time and money on it if we got funding! 🤑🤑🤑

#### Current State
The project is in a very rough state at the moment. It's been built on a tight budget. The design is bare-bones. The password saving and retrieving should work. But expect many links to be broken. Some functionality TBD.

#### Future State
We hope to push this project forward when we have more time and budget. In addition to adding lots of polish, we intend to add more features and functionality like:
 - A [federated/decentralized datastore](https://medium.com/@ppio/what-is-decentralized-storage-9c4b761942e2).
 - Added layers to allow service providers to implement features like passwordless login, and two factor authentication. These added layers would allow you to use your master password only once per browser. Following log in sessions would then use a third-party service to manage temporary tokens for you to "augment" your hashed master password. This would reduce the exposure of your master password and therefore increase security.
 - Other fun tricks that I'll explain later. Here are some [misc notes](https://docs.google.com/document/d/1s8tQuovGDU6Y6jD9woELI9lLZHFiN2QbKxzz26gZdbo/) in the meantime 🤷‍♂️.

#### Thanks for folks who have contributed to the project so far
 - [Syllable](https://www.syllablehq.com/)
 - [Neon Anvil](https://www.tenayafihe.com/)
 - [Pixel506](https://pixel506.com/)


## Developer Installation

Note: This project is built on the [Razzle](https://github.com/jaredpalmer/razzle) starter kit. See that documentation for more details about the build process.

We are using Yarn to manage the application dependencies. You can install Yarn in a number of ways depending on your environment.

#### Clone this repository.
```
$ git clone https://github.com/syllable-hq/skipper
```

### Set up your .env file

Before getting started, copy the `.env.example` to `.env` and adjust the settings depending on your environment. For now, this is setup to only work with [Firebase](https://firebase.google.com/) as a test environment. You can set your own .env values to work with your own Firebase test environment. In the future, this could be extended to use a decentralized data store instead.

#### Install dependencies
```
$ yarn install
```

#### Run in development mode
```
$ yarn start
```

#### Run in production mode
```
$ yarn build && yarn start:prod
```

You should now be able to navigate to `http://localhost:3000`

## Change log

### [0.0.1] - 2019-12-11

#### Added
- First release of mostly-good-enough demo code 🥳🥳🥳. Because done is better than great.
