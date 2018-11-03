import React from 'react';

export default function IdeaView({idea, deleteHandler, updateHandler}) {
  const {title, description, importance, updatedTime = '', creationTime} = idea;
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      {updatedTime ? <div>{`Updated On: ${updatedTime}`}</div> : <div>{`Created On: ${creationTime}`}</div>}
      <button onClick={() => deleteHandler(idea)}>Delete</button>
      <button onClick={() => updateHandler(idea)}>Update</button>
    </div>
  );
}
