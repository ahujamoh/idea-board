import React from 'react';
import CreateNewIdeaButtonView from './IdeaBoard.createNewIdeaButtonView';

export default function EmptyBoardView({createNewIdeaButtonClickHandler, showCreateNewIdeaPopUp}) {
    return (
        <div className="empty-board-view-container">
            <span>Your Idea Board is empty</span>
            <CreateNewIdeaButtonView
                clickHandler={createNewIdeaButtonClickHandler}
                showCreateNewIdeaPopUp={showCreateNewIdeaPopUp}
            />
        </div>
    );
}
