import React from 'react';
import {FORM_FIELDS} from '../Consts';

export default function CreateNewIdeaPopUpView({onParameterChange, state, closeButtonClickHandler, onSaveClick}) {
  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <h2>CREATE YOUR IDEA</h2>
        <div
          className="close"
          onClick={() => {
            closeButtonClickHandler();
          }}
        >
          &times;
        </div>
        <div className="content">
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
          <div>Importance</div>
          <select
            defaultValue={state.ideaDetails.importance}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.IMPORTANCE);
            }}
          >
            <option value="" selected disabled hidden>
              Choose One
            </option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
          </select>
          <div>Category</div>
          <select
            defaultValue={state.ideaDetails.category}
            onChange={(e) => {
              onParameterChange(e, FORM_FIELDS.CATEGORY);
            }}
          >
            <option value="" selected disabled hidden>
              Choose One
            </option>
            <option value="Sports">Sports</option>
            <option value="Fashion">Fashion</option>
            <option value="Studies">Studies</option>
            <option value="Cars">Cars</option>
            <option value="Jobs">Jobs</option>
            <option value="Todo">Todo</option>
          </select>
          {<button onClick={onSaveClick}>Save Idea</button>}
        </div>
      </div>
    </div>
  );
}
