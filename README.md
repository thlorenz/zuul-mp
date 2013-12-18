# zuul-mp [![build status](https://secure.travis-ci.org/thlorenz/zuul-mp.png)](http://travis-ci.org/thlorenz/zuul-mp)

Runs your mocha tests with zuul and phantomjs locally or on a build server.

![zuul-mp](https://github.com/thlorenz/zuul-mp/raw/master/assets/zuul-mp.gif)

## Installation

    npm install zuul-mp

## Usage

Invoke `zuul-mp` with the same arguments you would pass to [zuul](https://github.com/defunctzombie/zuul).

You can also include arguments for [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs#usage). 

#### Example

    zuul-mp --reporter list -- test.js

    # Override default port
    zuul-mp --local 3100 --reporter list -- test.js

Here `--reporter list` is picked up by mocha-phantomjs and all other arguments by zuul.

Additionally the [`.zuul.yml`](https://github.com/defunctzombie/zuul/wiki/Zuul.yml) is picked up and treated the exact
same way as it is when running zuul directly.

## API

You can use zuul-mp's main function directly to launch it from other tools.

###*zuulmp(args, cwd, cb)*

```
/**
 * Starts up a zuul server and runs mocha-phantomjs against it.
 *
 * @name zuulmp
 * @function
 * @param args {Array[String]} arguments passed to zuul and phantomjs
 * @param cwd {String} working directory to be used for zuul and mocha-phantomjs
 * @param cb {Function} called back with eventual error and the exit code (0 if all went good)
 */
```

## License

MIT
