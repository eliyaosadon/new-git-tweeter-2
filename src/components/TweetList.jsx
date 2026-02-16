import Tweet from './Tweet';

function TweetList({ tweets, loading }) {
    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading tweets...</p>
            </div>
        );
    }

    if (tweets.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tweets yet</h3>
                <p>Be the first to tweet something!</p>
            </div>
        );
    }

    const sortedTweets = [...tweets].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className="tweet-list">
            {sortedTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default TweetList;
