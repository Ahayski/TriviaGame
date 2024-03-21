import "dotenv/config";

module.exports = {
    name: 'Kuis-Wakanda',
    version: '1.0.0',
    scheme: 'NativDasar',
    extra: {
        clerkPublishableKey: process.env.PUBLISH_KEY,
    },
};