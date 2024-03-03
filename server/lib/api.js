"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const checkout_1 = require("./checkout");
const payments_1 = require("./payments");
const webhooks_1 = require("./webhooks");
exports.app = (0, express_1.default)();
exports.app.use((0, express_1.json)({
    verify: (req, res, buf) => (req["rawBody"] = buf),
}));
exports.app.use((0, cors_1.default)({ origin: true }));
// This function runs async functions and catch errors
function runAsync(cb) {
    return (req, res, next) => {
        cb(req, res, next).catch(next);
    };
}
// Create a new checkout session
exports.app.post("/checkout", runAsync(async ({ body }, res) => {
    res.send(await (0, checkout_1.createStripeCheckoutSession)(body.line_items));
}));
// Payment Intent
exports.app.post("/payments", runAsync(async ({ body }, res) => {
    res.send(await (0, payments_1.createPaymentIntent)(body.amount));
}));
exports.app.post("/hooks", runAsync(webhooks_1.handleStripeWebhook));
//# sourceMappingURL=api.js.map