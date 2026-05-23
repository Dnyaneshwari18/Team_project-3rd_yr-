// frontend/src/utils/rtcConfig.js

export const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun1.l.google.com:19302" // Free Google STUN server
    },
    {
      // Plucked straight from Shravani's turnserver.conf file!
      urls: "turn:13.207.1.49:3478", 
      username: "sharebyteam",
      credential: "SecurePass2026"
    }
  ],
  iceTransportPolicy: "all"
};