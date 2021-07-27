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
	element.onclick = function (e) {
		const id = e.target.querySelector("span").value;
		console.log(id);
	};
	return element;
}
async function listUsers() {
	//call get users
	const users = await getUsers();
	users.forEach((user) => userList.append(userListItem(user)));
	//append to list element with userListItem()
}
listUsers();
