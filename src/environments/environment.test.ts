(window as any).ENV = {
  env: 'test',
  API_URL: 'https://testing:3200/',
  PROXY_ENV: {
    API_URL: '//testing'
  }
};

export const environment = (window as any).ENV;
