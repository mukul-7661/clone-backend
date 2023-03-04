const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MVeMZSAzZSq3i8LPIiXS3ftMwr51RvI7BEz6lg39WdixuP2zow3zp79hHPBwQ0Q4tl6SLxqKIC7kd9KZIZoYCKx003t3H8gB4"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved !!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
    description: "for amazon-clone project",
    shipping: {
      name: "Random singh",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    // billing_details: {
    //   address: {
    //     postal_code: "42424",
    //   },
    // },
    // description: "Software development services",
    // shipping[name]="Jenny Rosen",
    // shipping[address][line1]: "510 Townsend St",
    // shipping[address][postal_code]: 98140,
    // "shipping[address][city]": "San Francisco",
    // "shipping[address][state]": "CA",
    // "shipping[address][country]": "US",
  });

  // OK - Created;
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
