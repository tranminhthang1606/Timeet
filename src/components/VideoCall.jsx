import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const VideoCall = ({ calling }) => {
  const navigate = useNavigate();
  const randomID = (len) => {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  };

  const getUrlParams = (url = window.location.href) => {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  };

  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1802196075;
    const serverSecret = "e95577f3e2fde13be217077622dbe67a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],  
      showUserList:false,
      showTextChat:false,
      showRoomDetailsButton:false,
      showPreJoinView: false,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return <div className="myCallContainer" ref={myMeeting}></div>;
};

export default VideoCall;
