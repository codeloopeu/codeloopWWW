function objectToDbArray(object) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const dbArray = [];
  for (let i = 0; i < keys.length; i += 1) {
    dbArray[i] = {
      id: keys[i],
      time: values[i]
    };
  }
  return dbArray;
}

export function prepareSessionData(clientId, sessionId) {
  const eventDatetime = new Date().toISOString();
  const lang = navigator.language || navigator.userLanguage;
  const metadata = { lang };
  return { ref: clientId, sessionId, eventDatetime, metadata };
}

export function prepareTrackingData(sessionId, timerById) {
  const eventDatetime = new Date().toISOString();
  const metadata = objectToDbArray(timerById);
  return { sessionId, eventDatetime, metadata };
}

export function prepareEventData(sessionId, elementId, eventType) {
  const eventDatetime = new Date().toISOString();
  const metadata = { id: elementId, type: eventType };
  return { sessionId, eventDatetime, metadata };
}
