const CHANNEL_ID = "EyqdZdTYDXrUFx9u";
const DEF_ROOM = "observable-public-room";

const drone = {
  channel: {},
  room: {},
  init: (member) => {
    drone.channel = new window.Scaledrone(CHANNEL_ID, { data: member });
    return drone.channel;
  },
  open: (error, callback) => (error ? console.error(error) : callback()),
  subscribe: (callback, roomName = DEF_ROOM) => {
    drone.room = drone.channel.subscribe(roomName);
    drone.room.on("message", callback);
  },
  send: (message, roomName = DEF_ROOM) => {
    drone.channel.publish({
      room: roomName,
      message: message,
      time: Date.now(),
    });
    return true;
  },
};

export default drone;
