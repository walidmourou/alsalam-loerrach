const config = {
  apiUrl: import.meta.env.PROD
    ? "https://api.alsalam-loerrach.org"
    : "http://localhost:8000",
};

export default config;
