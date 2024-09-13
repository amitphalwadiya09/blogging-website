import React from 'react';
import SuggestedUsers from './SuggestedUsers'; // Import the SuggestedUsers component
import '../CSS/SuggestionsPage.css'; // Import any additional CSS if needed

const SuggestionsPage = () => {
  return (
    <div className="suggestions-page">
      <h1 className="suggestions-page-title">Suggestions</h1>
      <SuggestedUsers />
    </div>
  );
};

export default SuggestionsPage;