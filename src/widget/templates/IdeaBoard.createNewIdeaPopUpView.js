import React from 'react';
import {FORM_FIELDS} from '../Consts';
import {CATEGORIES, PRIORITIES, STATUSES} from '../Config';

export default function CreateNewIdeaPopUpView({onParameterChange, state, closeButtonClickHandler, onSaveClick}) {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup--header">
          <h2>CREATE YOUR IDEA</h2>
          <div
            className="close"
            onClick={() => {
              closeButtonClickHandler();
            }}
          >
            &times;
          </div>
        </div>
        <div className="pop--content">
          <div>Title</div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.ideaDetails.title}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.TITLE);
            }}
          />
          <div>Description</div>
          <textarea
            rows="10"
            cols="50"
            name="description"
            placeholder="Description"
            value={state.ideaDetails.description}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.DESCRIPTION);
            }}
          />

          {/* priorities */}
          <div>Choose Priority</div>
          <select
            defaultValue={state.ideaDetails.priority}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.PRIORITY);
            }}
          >
            <option value="" selected disabled hidden>
              Select One
            </option>
            {PRIORITIES.map((priority) => {
              return <option value={priority}>{priority}</option>;
            })}
          </select>

          {/* Categories */}
          <div>Choose Category</div>
          <select
            defaultValue={state.ideaDetails.category}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.CATEGORY);
            }}
          >
            <option value="" selected disabled hidden>
              Select One
            </option>
            {CATEGORIES.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>

          {/* Statuses */}
          <div>Select Status</div>
          <select
            defaultValue={state.ideaDetails.status}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.STATUS);
            }}
          >
            <option value="" selected disabled hidden>
              Choose One
            </option>
            {STATUSES.map((status) => {
              return <option value={status}>{status}</option>;
            })}
          </select>
          {<button onClick={onSaveClick}>Save Idea</button>}
        </div>
      </div>
    </div>
  );
}
