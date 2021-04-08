# Liftoff at Scale

## Workers example

### Setup

You'll need [Beanstalkd](https://beanstalkd.github.io/) installed. Beanstalkd is a simple and robust queue system
that allows you to put jobs into tubes and then consume them later.

On Mac you can install with `brew install beanstalkd` and then start the service as instructed.

### Start

The `start` branch contains an example of how you might setup a traditional system.

Edit the `routes/send.js` to contain
your environment variables for your Twilio account, your Twilio number and a phone 
number you wish to send texts too.

Run the express app using `npm run start`.

When you visit the root of the application and click the send button, you'll get a message
sent to the number you specificed along with a time it took to complete the XHR request. This
will usually be in the double figures but can get really high if Twilio is slow responding to
our API requests; editing `send.js` to include a delay or an error in the Twilio code can cause our
webpage to become unresponsive altogether.

### Fin

The `fin` branch contains an example where we've removed our API calls to Twilio from the 
request/response cycle. The `send.js` route now pushes a JSON job onto the Beanstalkd queue
and then returns the job info, and clicking the button now returns much quicker.

We've removed the blocking action of the Twilio API call from our webserver.

You can run `node bin/client.js` to run the worker that will consume these jobs. It will 
iterate over anything in the queue and using the job information will send the message 
provided. It will then sit and wait for any new jobs, and process them when it sees them.


