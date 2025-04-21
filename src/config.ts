const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://api.alsalam-loerrach.org' 
    : 'http://localhost:3001'
};

export default config;