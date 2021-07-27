const express = require("express");
const router = express.Router();
const User = require("../models/users");

//List Users
router.get("/", async (req, res) => {
	try {
		const query = {};
		const hasQuery =
			req.query.firstname !== null || req.query.lastname !== null;
		if (hasQuery) {
			if (req.query.firstname) query.firstname = req.query.firstname;
			if (req.query.lastname) query.lastname = req.query.lastname;
		}

		const users = await User.find(query);

		if (hasQuery && users.length === 0) {
			return res.status(404).json({
				message:
					"No users named " +
					(req.query.firstname ? req.query.firstname + " " : "") +
					(req.query.lastname ? req.query.lastname : ""),
			});
		}

		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Getting User by id
router.get("/:id", getUserById, async (req, res) => {
	res.json(res.user);
});

//Create User
router.post("/", async (req, res) => {
	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Update User
router.patch("/:id", getUserById, async (req, res) => {
	if (req.body.firstname != null) {
		res.user.firstname = req.body.firstname;
	}
	if (req.body.lastname != null) {
		res.user.lastname = req.body.lastname;
	}
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//Delete User
router.delete("/:id", getUserById, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "Deleted User" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

async function getUserById(req, res, next) {
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find User" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.user = user;
	next();
}
async function getUserByName(req, res, next) {}
module.exports = router;
