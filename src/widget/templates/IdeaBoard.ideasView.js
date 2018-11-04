import React from 'react';
import IdeaView from './IdeaBoard.ideaView';
import _forOwn from 'lodash/forOwn';

export default function IdeasView({sortedIdeas, onIdeaDelete, onIdeaUpdate, sortBy}) {
    const sortedIdeasAndParameterPairs = Object.entries(sortedIdeas);
    return sortedIdeasAndParameterPairs.map((sortedIdeasAndParameterPair) => {
        const section = sortedIdeasAndParameterPair[0];
        const ideas = sortedIdeasAndParameterPair[1];
        return (
            <div className="category">
                <div className="category-title-wrap">
                    <span className="category-title bold">{section}</span>
                </div>
                <div className="category-body">
                    {ideas.map((idea) => {
                        return <IdeaView idea={idea} deleteHandler={onIdeaDelete} updateHandler={onIdeaUpdate} />;
                    })}
                </div>
            </div>
        );
    });
}
