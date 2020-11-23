export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allGames: '/games',
      singleGame: '/games/:id',
      usersProfile: '/users/profile',
      users: '/users',
      login: '/auth/login'
    }
  }
};
