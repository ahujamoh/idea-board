import React from 'react';
import IdeaView from './IdeaBoard.ideaView';
import _forOwn from 'lodash/forOwn';

export default function IdeasView({sortedIdeas, onIdeaDelete, onIdeaUpdate, sortBy}) {
  const sortedIdeasAndParameterPairs = Object.entries(sortedIdeas);
  return sortedIdeasAndParameterPairs.map((sortedIdeasAndParameterPair) => {
    const section = sortedIdeasAndParameterPair[0];
    const ideas = sortedIdeasAndParameterPair[1];
    return (
      <div>
        <div>{section}</div>
        {ideas.map((idea) => {
          return <IdeaView idea={idea} deleteHandler={onIdeaDelete} updateHandler={onIdeaUpdate} />;
        })}
      </div>
    );
  });
}
