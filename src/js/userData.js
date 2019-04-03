import uuidv4 from 'js/uuid';

const codeloopId = 'codeloopId';
const codeloopBrowserId = 'codeloopBrowserId';

function getQueryParams() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  return {
    clientId: url.searchParams.get('c'),
    utm: {
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_term: url.searchParams.get('utm_term'),
      utm_content: url.searchParams.get('utm_content')
    }
  };
}

function getUserDataFromLocalStorage() {
  return {
    clientId: localStorage.getItem(codeloopId),
    browserId: localStorage.getItem(codeloopBrowserId)
  };
}

function extractUserData() {
  const queryParams = getQueryParams();
  const localStorage = getUserDataFromLocalStorage();
  return {
    clientId: localStorage.clientId ? localStorage.clientId : queryParams.clientId,
    browserId: localStorage.browserId ? localStorage.browserId : uuidv4(),
    utm: queryParams.utm
  };
}

function storeClientId(clientId) {
  if (clientId) {
    localStorage.setItem(codeloopId, clientId);
  }
}

function storeBrowserId(browserId) {
  if (browserId) {
    localStorage.setItem(codeloopBrowserId, browserId);
  }
}

export default function extractUserDataAndCleanUrl() {
  const userData = extractUserData();
  storeClientId(userData.clientId);
  storeBrowserId(userData.browserId);
  window.history.replaceState({}, '', '/');
  return userData;
}
