export async function getAllUsers() {
	console.log('getAllUsers /api/private/users')
    //const response = await fetch('/api/users');//with express api route
    const response = await fetch('/api/private/users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}