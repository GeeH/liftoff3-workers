var bs = require('nodestalker');
const client = bs.Client('127.0.0.1:11300');
const tube = 'messages';
const twilio = require('twilio')(process.env.TWILIO_DEMO_ACCOUNT_SID, process.env.TWILIO_DEMO_AUTH_TOKEN);

client.watch(tube).onSuccess(() => {
    function handleJob() {
        client.reserve().onSuccess(job => {
            console.log('reserved', job);

            const data = JSON.parse(job.data);
            const opts = {
                body: data.message,
                from: data.fromNumber,
                to: data.toNumber,
            };

            twilio.messages
                .create(opts)
                .then(message => {
                    console.log('sent', message);
                    client.deleteJob(job.id).onSuccess(del_msg => {
                        console.log('deleted', job);
                        console.log('message', del_msg);
                        handleJob();
                    });
                });
        });
    }

    handleJob();
});
