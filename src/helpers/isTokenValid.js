function isTokenValid(decodedToken) {
    return decodedToken.exp > Math.floor(Date.now()/1000);
}

export default isTokenValid;