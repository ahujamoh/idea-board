import React from 'react';

export default function IdeaView({idea, deleteHandler, updateHandler}) {
  const {title, description, priority, updatedTime = '', creationTime, status} = idea;
  return (
    <div>
      <div>{`Title: ${title}`}</div>
      <div>{`Description: ${description}`}</div>
      {updatedTime ? <div>{`Updated On: ${updatedTime}`}</div> : <div>{`Created On: ${creationTime}`}</div>}
      <div>{`Priority: ${priority}`}</div>
      <div>{`Status: ${status}`}</div>
      <button onClick={() => deleteHandler(idea)}>Delete</button>
      <button onClick={() => updateHandler(idea)}>Update</button>
    </div>
  );
}
