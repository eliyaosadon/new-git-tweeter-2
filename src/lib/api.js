import { supabase } from './supabase';

export const getTweets = async () => {
    try {
        const { data, error } = await supabase
            .from('Tweets')
            .select('*')
            .order('date', { ascending: false });

        console.log('📊 Supabase returned:', data);  // ← Add this
        console.log('❌ Any error?', error);          // ← Add this

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return { data: null, error: error.message };
    }
};

export const createTweet = async (tweetData) => {
    try {
        const { data, error } = await supabase
            .from('Tweets')
            .insert([tweetData])
            .select();

        if (error) {
            throw error;
        }

        return { data: data[0], error: null };
    } catch (error) {
        console.error('Error creating tweet:', error);
        return { data: null, error: error.message };
    }
};