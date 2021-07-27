const restUrl = window.location.href + "users";
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
async function createUser(userData) {
	const newUser = await fetch(restUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData),
	});
	return newUser.json();
}
async function updateUser(id, userData) {
	const updatedUser = await fetch(restUrl + "/" + id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData),
	});
	return updatedUser.json();
}
async function deleteUser(id) {
	const deleltedUser = await fetch(restUrl + "/" + id, {
		method: "DELETE",
	});
	return deleltedUser.json();
}
