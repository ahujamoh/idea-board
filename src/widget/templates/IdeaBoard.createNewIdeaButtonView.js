import React from 'react';

export default function CreateNewIdeaButtonView({clickHandler, showCreateNewIdeaPopUp}) {
  return (
    <div>
      {!showCreateNewIdeaPopUp && (
        <button
          onClick={() => {
            clickHandler();
          }}
          className="button"
        >
          Create a new idea
        </button>
      )}
    </div>
  );
}
