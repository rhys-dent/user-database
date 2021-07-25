const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

//Getting all
router.get("/", async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.json(subscribers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//Getting one by id
router.get("/:id", getSubscriber, async (req, res) => {
	res.json(res.subscriber);
});
//Getting one by name
router.get("/name/:name", getSubscriberByName, async (req, res) => {
	res.json(res.subscriber);
});
//Creating one
router.post("/", async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel,
	});
	try {
		const newSubscriber = await subscriber.save();
		res.status(201).json(newSubscriber);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
//Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
	if (req.body.name != null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.subscribedToChannel != null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json(updatedSubscriber);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
	try {
		await res.subscriber.remove();
		res.json({ message: "Deleted subscriber" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

async function getSubscriber(req, res, next) {
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({ message: "Cannot find subscriber" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.subscriber = subscriber;
	next();
}
async function getSubscriberByName(req, res, next) {
	try {
		subscriber = await Subscriber.findOne({ name: req.params.name });
		if (subscriber == null) {
			return res.status(404).json({
				message: "Cannot find subscriber with name: " + req.params.name,
			});
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.subscriber = subscriber;
	next();
}

module.exports = router;
