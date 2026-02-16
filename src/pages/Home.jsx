import { useTweets } from '../context/TweetsContext';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';

function Home() {
    const { tweets, loading, isSubmitting, addTweet, error, clearError } = useTweets();

    return (
        <>
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={clearError}>✕</button>
                </div>
            )}

            <header className="header">
                <h1>What's happening?</h1>
            </header>

            <TweetForm
                onSubmit={addTweet}
                isSubmitting={isSubmitting}
            />

            <TweetList tweets={tweets} loading={loading} />
        </>
    );
}

export default Home;
