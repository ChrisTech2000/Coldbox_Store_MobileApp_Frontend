/* eslint-disable */

try {
  // Step 1: Login to get the token
  var loginUrl = BASE_API_BASE_URL + '/user/v1/login/';
  var loginPayload = {
    username: '+2348033709550',
    password: 'e2ePass1',
    user_type: 'sp',
    language: 'en',
  };

  console.log('[E2E] Attempting login to: ' + loginUrl);
  console.log('[E2E] Payload: ' + JSON.stringify(loginPayload));

  var response = http.post(loginUrl, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  });

  console.log('[E2E] Login response body: ' + response.body);

  if (!response.body || response.body.trim() === '') {
    throw new Error('[E2E] Empty login response');
  }

  var parsedLogin;
  try {
    parsedLogin = json(response.body);
  } catch (err) {
    throw new Error('[E2E] Failed to parse login response: ' + response.body);
  }

  var accessToken = parsedLogin.access;

  if (!accessToken) {
    throw new Error('[E2E] No access token found in login response');
  }

  console.log('[E2E] Access token obtained');

  // Step 2: Fetch last sent SMS
  var phoneNumber = encodeURIComponent('+2348033709554');
  var smsUrl = BASE_API_BASE_URL + '/user/development/last-sent-sms/?phoneNumber=' + phoneNumber;

  console.log('[E2E] Fetching last SMS from: ' + smsUrl);

  var smsResponse = http.get(smsUrl, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });

  console.log('[E2E] SMS response body: ' + smsResponse.body);

  var parsedSms;
  try {
    parsedSms = json(smsResponse.body);
  } catch (err) {
    throw new Error('[E2E] Failed to parse SMS response: ' + smsResponse.body);
  }

  var lastSmsSent = parsedSms.last_sms_sent;

  if (!lastSmsSent) {
    throw new Error('[E2E] No SMS content found');
  }

  // Step 3: Extract invitation link
  var invitationMatch = lastSmsSent.match(/(https?:\/\/[^\s/]+\/auth\/signup-invitation[^\s]+)/);

  if (!invitationMatch || invitationMatch.length < 1) {
    throw new Error('[E2E] No invitation link found in SMS');
  }

  var extractedLink = invitationMatch[0];

  if (extractedLink.indexOf('http://localhost:8100') === 0) {
    extractedLink = extractedLink.replace('http://localhost:8100', 'https://app.coldtivate.org');
  }

  output.invitationLink = extractedLink;
  console.log('[E2E] Invitation link extracted: ' + output.invitationLink);
} catch (e) {
  console.log('[E2E] Error occurred: ' + (e.message || e));
  throw e;
}
