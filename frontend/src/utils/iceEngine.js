// frontend/src/utils/iceEngine.js
import { rtcConfig } from './rtcConfig.js';

export class IceEngine {
  constructor(signalingChannel) {
    this.signaling = signalingChannel; // Vedant's signaling layer connection instance
    this.peerConnection = null;
  }

  /**
   * Initializes the RTCPeerConnection and sets up ICE gathering listeners
   */
  initPeerConnection() {
    // Instantiate the browser's native WebRTC peer connection using your config
    this.peerConnection = new RTCPeerConnection(rtcConfig);

    // 1. Logic to gather browser ICE Candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("📍 New ICE Candidate gathered locally:", event.candidate);
        
        // 3. Pipe ICE candidates through Vedant's signaling server immediately
        this.signaling.send({
          type: "ice_candidate",
          payload: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          }
        });
      } else {
        console.log("✅ ICE Gathering completely finished for this peer.");
      }
    };

    // Monitor network connection state changes
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log("📶 ICE Connection State Changed:", this.peerConnection.iceConnectionState);
      
      if (this.peerConnection.iceConnectionState === "connected") {
        // 2. Track selected pair to see if it's local (host) or relay (TURN)
        this.trackSelectedPair();
      }
    };
  }

  /**
   * Track the active candidate pair selection for network debugging
   */
  async trackSelectedPair() {
    try {
      const stats = await this.peerConnection.getStats();
      stats.forEach((report) => {
        if (report.type === "transport" && report.selectedCandidatePairId) {
          const activePair = stats.get(report.selectedCandidatePairId);
          const localCandidate = stats.get(activePair.localCandidateId);
          const remoteCandidate = stats.get(activePair.remoteCandidateId);

          console.log("====== ACTIVE CONNECTION PATHWAY ======");
          console.log(`🏠 Local Candidate Type: ${localCandidate.candidateType}`);
          console.log(`🌐 Remote Candidate Type: ${remoteCandidate.candidateType}`);
          console.log("=======================================");
        }
      });
    } catch (error) {
      console.error("❌ Failed to retrieve WebRTC stats:", error);
    }
  }
}