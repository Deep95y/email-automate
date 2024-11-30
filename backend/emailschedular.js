const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Initialize Agenda
const agenda = new Agenda({
  db: { address: process.env.MONGODB_URL },
});

// Define Mongoose schema for email journey
const emailJourneySchema = new mongoose.Schema({
  SelectedList: {
    type: String,
    required: true,
  },
  coldEmailTemplate: {
    type: String,
    required: true,
  },
  delayTimeInNumber: {
    type: Number,
    required: true,
  },
  delayTimeInType: {
    type: String,
    enum: ["days", "minutes", "hours"],
    required: true,
  },
  SendColdEmailAs: {
    type: String,
    required: true,
  },
});

const EmailJourney = mongoose.model("EmailJourney", emailJourneySchema);

// Define the job for sending an email
agenda.define("send email", async (job) => {
  const { to, subject, text } = job.attrs.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  console.log("Email sent to", to);
});

// API to create an email journey and schedule the email
app.post("/emailScheduler/schedule-email", async (req, res) => {
  const { SelectedList, coldEmailTemplate, delayTimeInNumber, delayTimeInType, SendColdEmailAs } = req.body;

  if (!SelectedList || !coldEmailTemplate || !delayTimeInNumber || !delayTimeInType || !SendColdEmailAs) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save the journey data to MongoDB
    const journeyData = await EmailJourney.create({
      SelectedList,
      coldEmailTemplate,
      delayTimeInNumber,
      delayTimeInType,
      SendColdEmailAs,
    });

    // Calculate delay in milliseconds
    const delayInMs =
      delayTimeInType === "days"
        ? delayTimeInNumber * 24 * 60 * 60 * 1000
        : delayTimeInType === "hours"
        ? delayTimeInNumber * 60 * 60 * 1000
        : delayTimeInNumber * 60 * 1000;

    const deliveryTime = new Date(Date.now() + delayInMs);

    // Schedule email using Agenda
    await agenda.schedule(deliveryTime, "send email", {
      to: SelectedList,
      subject: `Cold Email from ${SendColdEmailAs}`,
      text: coldEmailTemplate,
    });

    res.status(200).json({
      message: "Email journey created and email scheduled successfully!",
      journeyData,
    });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ error: "Failed to schedule email" });
  }
});

// API to get all email journeys
app.get("/emailScheduler/getAllJourneys", async (req, res) => {
  try {
    const journeys = await EmailJourney.find({});
    res.json(journeys);
  } catch (error) {
    console.error("Error fetching journeys:", error);
    res.status(500).json({ error: "Failed to fetch journeys" });
  }
});

// Start Agenda before the server listens
(async function () {
  await agenda.start();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
