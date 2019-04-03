import getUserInfo from 'js/userInfo';
import uuidv4 from 'js/uuid';

const sessionId = uuidv4();

export function prepareTrackingData(timerById) {
  const eventDatetime = new Date().toISOString();
  return {
    sessionId,
    eventDatetime,
    metadata: timerById
  };
}

export function prepareEventData(elementId, eventType) {
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

export function prepareSessionData(userData) {
  const eventDatetime = new Date().toISOString();
  return getUserInfo().then((metadata) => {
    metadata.utm = userData.utm;
    return {
      ref: userData.clientId,
      browserId: userData.browserId,
      sessionId,
      eventDatetime,
      metadata
    };
  });
}
