const sessionIdtoUserMap = new Map();
//Gets erased when you restart the server.

function setUser(id, user) {
    sessionIdtoUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdtoUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}