console.log("Hello World");
const restUrl = "http://localhost:3000/users";

async function getUsers() {
	const users = await fetch(restUrl);
	return users.json();
}
async function getUserById(id) {
	const users = await fetch(restUrl + "/" + id);
	return users.json();
}
async function getUserByName(id) {
	const users = await fetch(restUrl + "/" + id);
	return users.json();
}
async function createUser(user) {
	const newUser = await fetch(restUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});
	return newUser.json();
}
async function updateUser(id, updatedData) {
	const updatedUser = await fetch(restUrl + "/" + id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedData),
	});
	return updatedUser.json();
}
window.onload = async function () {
	const user = await getUserById("60fed3d3e83a2c590c55b7e0");
	console.log(user);
};
