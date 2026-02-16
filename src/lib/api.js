const API_URL = 'https://agsaphbcwazvuenwsnca.supabase.co/rest/v1/Tweets';
const API_KEY = 'sb_publishable_3kTDeTVg6NfWrboe7oMopA_X-cuT_ih';

const headers = {
    'Content-Type': 'application/json',
    'apikey': API_KEY,
    'Prefer': 'return=representation'
};

export const getTweets = async () => {
    try {
        const response = await fetch(`${API_URL}?order=date.desc`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tweets');
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return { data: null, error: error.message };
    }
};

export const createTweet = async (tweetData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(tweetData)
        });

        if (!response.ok) {
            throw new Error('Failed to create tweet');
        }

        const data = await response.json();
        return { data: data[0], error: null };
    } catch (error) {
        console.error('Error creating tweet:', error);
        return { data: null, error: error.message };
    }
};