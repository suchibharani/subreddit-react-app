import  fetch from 'isomorphic-unfetch'


const URL = 'https://www.reddit.com/r/dataisbeautiful.json';
const fetchUsers = async () => {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data.data.children;
};

export {
    fetchUsers
};