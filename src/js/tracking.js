import getAllUserInfo from 'js/userInfo';

export function prepareTrackingData(sessionId, timerById) {
  const eventDatetime = new Date().toISOString();
  return {
    sessionId,
    eventDatetime,
    metadata: timerById
  };
}

export function prepareEventData(sessionId, elementId, eventType) {
  const eventDatetime = new Date().toISOString();
  const metadata = {
    id: elementId,
    type: eventType
  };
  return {
    sessionId,
    eventDatetime,
    metadata
  };
}

export function prepareSessionData(clientId, browserId, sessionId) {
  const eventDatetime = new Date().toISOString();
  return getAllUserInfo().then(
    metadata => ({
      ref: clientId,
      browserId,
      sessionId,
      eventDatetime,
      metadata
    })
  );
}
