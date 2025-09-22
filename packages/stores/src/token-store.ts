class TokenStore {
  setToken(token: string) {
    localStorage.setItem('@zchemacraft/token', token);
  }

  getToken() {
    return localStorage.getItem('@zchemacraft/token');
  }

  removeToken() {
    localStorage.removeItem('@zchemacraft/token');
  }
}

export const tokenStore = new TokenStore();
