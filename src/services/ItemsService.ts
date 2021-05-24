export async function getAllItems(type) {

    const response = await fetch(`/api/public/${type}`);
    return await response.json();
}

export async function createItem(data,type) {
    const response = await fetch(`/api/private/${type}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item: data,type:type})
      })
    return await response.json();
}

export async function deleteItem(id,type) {
    const response = await fetch(`/api/private/${type}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id,type:type})
      })
    return await response.json();
}