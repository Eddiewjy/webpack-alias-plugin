const packageB = require('package-b');

console.log('Package A is running!');
console.log('Importing from package-b:', packageB.getMessage());

module.exports = {
  name: 'package-a',
  version: '1.0.0',
  getMessage: () => 'Hello from Package A!'
}; 