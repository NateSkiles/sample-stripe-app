"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const _1 = require("./");
// Business logic for specific webhook event types
const webhookHandlers = {
    "payment_intent.succeeded": async (data) => {
        // Add your business logic here
        console.log(data);
    },
    "payment_intent.failed": async (data) => {
        // Add your business logic here
        console.log(data);
    },
    "payment_intent.created": async (data) => {
        // Add your business logic here
        console.log(data);
    },
};
// Validate the stripe webhook secret, then call the handler for the event type
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const event = _1.stripe.webhooks.constructEvent(req["rawBody"], sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log(event.type);
    try {
        await webhookHandlers[event.type](event.data.object);
        res.send({ received: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
exports.handleStripeWebhook = handleStripeWebhook;
//# sourceMappingURL=webhooks.js.map