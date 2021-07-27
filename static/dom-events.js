listUsersButton.onclick = listUsers;
userIdInput.oninput = function (e) {
	getUserButton.disabled = !e.target.value;
};
getUserByIdForm.onsubmit = async function (e) {
	e.preventDefault();
	const id = userIdInput.value;
	if (id) {
		const user = await getUserById(id);
		if (user) {
			const { firstname, lastname, email, creationDate } = user;
			toggleUserDataFields(false);
			userDataForm["first-name"].value = firstname;
			toggleViewUserForm();
			userDataForm["cancel-update"].onclick = function () {
				userDataForm["first-name"].value = firstname;
				userDataForm["last-name"].value = lastname;
				userDataForm["email"].value = email;
				userDataForm["creation-date"].value = creationDate;
				toggleUpdateUserForm(false);
			};
		} else {
			//USER ID DOES NOT EXIST
		}
	}
};
userDataForm["create-new-user"].onclick = async function () {
	const newUser = {
		firstname: userDataForm["first-name"].value,
		lastname: userDataForm["last-name"].value,
		email: userDataForm["email"].value,
	};
	console.log(newUser);
	await createUser(newUser);
	listUsers();
};
userDataForm["clear-new-user"].onclick = resetForm;
userDataForm["update"].onclick = function () {
	toggleUpdateUserForm();
};
userDataForm["confirm-update"].onclick = function () {
	//call update user from api
};
userDataForm["new"].onclick = function () {
	resetForm();
	toggleViewUserForm(false);
};
