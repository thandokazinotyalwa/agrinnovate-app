import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import UserProfile from "./UserProfile";
import DiscussionThread from "./DiscussionThread";
import Navigation from "./Navigation";
import RealTimeChat from "./RealTimeChat";
import Notifications from "./Notifications";
import ModerationTools from "./ModerationTools";
import EngagementTools from "./EngagementTools";
import ContentOrganization from "./ContentOrganization";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [threads, setThreads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [moderationFlags, setModerationFlags] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const addUserProfile = (profile) => {
    setUserProfiles([...userProfiles, profile]);
  };

  const addThread = (thread) => {
    setThreads([...threads, thread]);
  };

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const addModerationFlag = (flag) => {
    setModerationFlags([...moderationFlags, flag]);
  };

  return (
    <div className="chat-room">
      <Navigation />
      <UserProfile profiles={userProfiles} />
      <DiscussionThread threads={threads} />
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
      <RealTimeChat />
      <Notifications notifications={notifications} />
      <ModerationTools flags={moderationFlags} />
      <EngagementTools />
      <ContentOrganization />
    </div>
  );
};

export default ChatRoom;
