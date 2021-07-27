async function listUsers() {
	userList.innerHTML = "";
	const users = await getUsers();
	users.forEach((user) => {
		const userListItem = document.createElement("li");
		userListItem.innerHTML = `<span>${user.firstname}</span> <span>${user.lastname}</span><span class="hidden-user-id" hidden>${user._id}</span>`;
		userListItem.onclick = userlistItemClicked;
		userList.appendChild(userListItem);
	});
}
//#region Handlers
function userlistItemClicked(e) {
	const id = e.target.parentElement.querySelector(".hidden-user-id").innerText;
	if (id) {
		getUserButton.disabled = false;
		userIdInput.value = id;
	}
}
//#endregion Handlers
function parseDate(date) {
	return date;
}
function clearUserIdInput() {
	userIdInput.value = "";
	getUserButton.disabled = true;
}
function toggleUserDataFields(enable = true) {
	userDataForm["user-data-fields"].disabled = !enable;
}
function toggleViewUserForm(viewUser = true) {
	toggleUserDataFields(!viewUser);
	userDataForm["existing-user-buttons"].hidden = !viewUser;
	userDataForm["new-user-buttons"].hidden = viewUser;
	if (!viewUser) resetForm();
}
function toggleUpdateUserForm(updateUser = true) {
	toggleUserDataFields(updateUser);
	userDataForm["update-user-buttons"].hidden = !updateUser;
	userDataForm["existing-user-buttons"].hidden = updateUser;
}
function resetForm() {
	userDataForm["first-name"].value = "";
	userDataForm["last-name"].value = "";
	userDataForm["email"].value = "";
	userDataForm["creation-date"].value = "";
	clearUserIdInput();
}
