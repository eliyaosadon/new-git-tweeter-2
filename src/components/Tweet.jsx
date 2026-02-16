function Tweet({ tweet }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-avatar">{tweet.userName[0]}</div>

      <div className="tweet-content-wrapper">
        <div className="tweet-header">
          <span className="tweet-username">{tweet.userName}</span>
          <span className="tweet-date">{formatDate(tweet.date)}</span>
        </div>

        <p className="tweet-text">{tweet.content}</p>
      </div>
    </div>
  );
}

export default Tweet;