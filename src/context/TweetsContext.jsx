import { createContext, useContext, useState, useEffect } from 'react';
import { getTweets, createTweet } from '../lib/api';

// Create the context
const TweetsContext = createContext();

// Custom hook to use the context
export const useTweets = () => {
    const context = useContext(TweetsContext);
    if (!context) {
        throw new Error('useTweets must be used within TweetsProvider');
    }
    return context;
};

// Provider component
export const TweetsProvider = ({ children, userName }) => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch tweets from server
    const loadTweets = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await getTweets();

        if (error) {
            setError('Failed to load tweets. Please try again.');
            console.error(error);
        } else {
            setTweets(data || []);
        }

        setLoading(false);
    };

    // Fetch tweets when provider mounts
    useEffect(() => {
        loadTweets();
    }, []);

    // Auto-refresh: Fetch new tweets every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // Silently fetch updates (don't show loading spinner)
            getTweets().then(({ data, error }) => {
                if (!error && data) {
                    setTweets(data);
                }
            });
        }, 10000); // 10 seconds

        // Cleanup: Stop interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    // Add a new tweet
    const addTweet = async (content) => {
        setIsSubmitting(true);
        setError(null);

        const newTweet = {
            content: content,
            userName: userName,  // ← Make sure it's userName with capital N
            date: new Date().toISOString()
        };

        // OPTIMISTIC UPDATE: Add tweet to local list immediately
        const optimisticTweet = {
            ...newTweet,
            id: Date.now().toString() // Temporary ID
        };
        setTweets([optimisticTweet, ...tweets]);

        // Send to server
        const { data, error } = await createTweet(newTweet);

        if (error) {
            // If failed, remove the optimistic tweet
            setTweets(tweets.filter(t => t.id !== optimisticTweet.id));
            setError('Failed to post tweet. Please try again.');
            console.error(error);
        } else {
            // Replace optimistic tweet with real one from server
            setTweets(prevTweets =>
                prevTweets.map(t => t.id === optimisticTweet.id ? data : t)
            );
        }

        setIsSubmitting(false);
    };

    // Clear error
    const clearError = () => setError(null);

    const value = {
        tweets,
        loading,
        error,
        isSubmitting,
        addTweet,
        clearError,
        refreshTweets: loadTweets
    };

    return (
        <TweetsContext.Provider value={value}>
            {children}
        </TweetsContext.Provider>
    );
};
