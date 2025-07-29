console.log('Package B is running!');

module.exports = {
  name: 'sdk',
  version: '1.0.0',
  getMessage: () => 'Hello from SDK!',
  getData: () => ({
    id: 1,
    name: 'SDK Data',
    timestamp: new Date().toISOString()
  })
}; 