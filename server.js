require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log("error"));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

app.use("/", express.static("static"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(process.env.PORT || 3000, () =>
	console.log("Server running on 3000")
);
