const userProperties = [
	"firstname",
	"lastname",
	"email",
	"creationDate",
	"_id",
];
function userListItem(userData) {
	const { firstname, lastname, _id } = userData;
	const element = document.createElement("li");
	element.innerHTML = `
        <span>
            ${firstname} 
            ${lastname}
        </span>
        <button>Select<span hidden>${_id}</span></button>
    `;
	element.onclick = async function (e) {
		const id = e.target.querySelector("span").innerText;
		const user = await getUserById(id);
		setUserToForm(user);
	};
	return element;
}
async function listUsers() {
	userList.innerHTML = "";
	//call get users
	const users = await getUsers();
	users.forEach((user) => userList.append(userListItem(user)));
	//append to list element with userListItem()
}
function setUserToForm(user) {
	userProperties.forEach((property) => {
		console.log(userForm[property]);
		userForm[property].value = user[property];
	});
}
function getUserFromForm() {
	const user = {};
	userProperties.forEach(
		(property) => (user[property] = userForm[property].value)
	);
	return user;
}
userForm["create"].onclick = async function () {
	const newUser = getUserFromForm();
	await createUser(newUser);
	listUsers();
};
userForm["update"].onclick = async function () {
	const updatedUser = getUserFromForm();
	await updateUser(updatedUser._id, updatedUser);
	listUsers();
};
userForm["delete"].onclick = async function () {
	const id = userForm["_id"].value;
	await deleteUser(id);
	listUsers();
};
listUsers();
