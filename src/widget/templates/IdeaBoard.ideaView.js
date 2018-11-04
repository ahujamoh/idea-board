import React from 'react';

export default function IdeaView({idea, deleteHandler, updateHandler}) {
  const {title, description, priority, updatedTime = '', creationTime, status} = idea;
  const cardColor = {
    primary: 'priority-primary',
    secondary: 'priority-secondary',
    default: 'priority-default'
  };
  return (
    <div className={`card ${cardColor[priority]}`}>
      {title && <div className="card-item bold">{`Title: ${title}`}</div>}
      {description && <div className="card-item">{`Description: ${description}`}</div>}
      {updatedTime ? (
        <div className="card-item">{`Updated On: ${updatedTime}`}</div>
      ) : (
        <div className="card-item">{`Created On: ${creationTime}`}</div>
      )}
      {priority && <div className="card-item">{`Priority: ${priority}`}</div>}
      {status && <div className="card-item">{`Status: ${status}`}</div>}
      <div className={`button-wrap ${cardColor[priority]}`}>
        <button onClick={() => deleteHandler(idea)}>Delete</button>
        <button onClick={() => updateHandler(idea)}>Update</button>
      </div>
    </div>
  );
}
