Package.describe({
  name: 'idmontie:flint',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Special file dependency waiting for the client',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/idmontie/FlintJS',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.addFiles('flint.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('idmontie:flint');
  api.addFiles('src/flint.js');
  api.addFiles('flint-tests.js');
});
