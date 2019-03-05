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

export default function prepareTrackingData(clientId, session, timerById) {
  const datetime = new Date().toISOString();
  const visible = objectToDbArray(timerById);

  if (clientId) {
    return { ref: clientId, session, datetime, visible };
  }
  return { session, datetime, visible };
}
