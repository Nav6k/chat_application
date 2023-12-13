import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  //   const renderReadReceipts = (message, isMyMessage) => {
  //     return chat.people.map(
  //       (person, index) =>
  //         person.last_read == message.id && (
  //           <div
  //             key={`read_${index}`}
  //             className="read-receipt"
  //             style={{
  //               float: isMyMessage ? "right" : "left",
  //               backgroundImage: `url(${person?.person?.avatar})`,
  //             }}
  //           />
  //         )
  //     );
  //   };
  //updated
  //   const renderReadReceipts = (message, isMyMessage) => {
  //     return chat.people.map(
  //       (person, index) =>
  //         person.person.username !== userName && (
  //           <div
  //             key={`read_${index}`}
  //             className="read-receipt"
  //             style={{
  //               float: isMyMessage ? "right" : "left",
  //               backgroundImage: `url(${person?.person?.avatar})`,
  //               backgroundColor: person.person.is_online ? "limegreen" : "gray",
  //             }}
  //           />
  //         )
  //     );
  //   };
  //again
  const renderReadReceipts = (message) => {
    return chat.people.map(
      (person, index) =>
        person.person.username !== props.userName && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: person.person.is_online ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
              backgroundColor: person.person.is_online ? "limegreen" : "gray",
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key]; // Corrected the variable name here
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      //   const isMyMessage = userName === message.sender.username;
      const isMyMessage = props.userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage message={message} />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loading...";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => `${person.person.username}`)}
        </div>
        {renderMessages()} {/* Call the renderMessages function here */}
        <div style={{ height: "100px" }} />
        <div className="message-form-container">
          <MessageForm {...props} chatId={activeChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatFeed;
