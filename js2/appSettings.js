// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const settings = {
  'clientId': '5ed1e22c-5fa6-434a-a392-f8c06d0c9ebc',
  'clientSecret': 'YOUR_CLIENT_SECRET_HERE_IF_USING_APP_ONLY',
  'tenantId': 'YOUR_TENANT_ID_HERE_IF_USING_APP_ONLY',
  'authTenant': 'common',
  'graphUserScopes': [
    'user.read',
    'mail.read',
    'mail.send'
  ]
};

module.exports = settings;
