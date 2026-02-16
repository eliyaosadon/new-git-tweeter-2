import { useState } from 'react';

function TweetForm({ onSubmit, isSubmitting }) {
    const [content, setContent] = useState('');
    const maxChars = 140;

    const charsRemaining = maxChars - content.length;
    const isOverLimit = charsRemaining < 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (content.trim() && !isOverLimit && !isSubmitting) {
            await onSubmit(content);
            setContent('');
        }
    };

    return (
        <div className="tweet-form-container">
            <form onSubmit={handleSubmit} className="tweet-form">
                <div className="user-avatar">U</div>

                <div className="tweet-input-wrapper">
                    <textarea
                        className="tweet-input"
                        placeholder="What's happening?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"
                        disabled={isSubmitting}
                    />

                    <div className="tweet-form-footer">
                        <span
                            className={`char-count ${isOverLimit ? 'over-limit' : ''}`}
                        >
                            {charsRemaining}
                        </span>

                        <button
                            type="submit"
                            className="tweet-button"
                            disabled={!content.trim() || isOverLimit || isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Tweet'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TweetForm;
