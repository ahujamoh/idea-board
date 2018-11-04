import React from 'react';
import {FORM_FIELDS} from '../Consts';
import {CATEGORIES, PRIORITIES, STATUSES} from '../Config';

export default function CreateNewIdeaPopUpView({onParameterChange, state, closeButtonClickHandler, onSaveClick}) {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup--header popup-segment">
          <div className="popup--header-title">
            <span>CREATE YOUR IDEA</span>
          </div>
          <div
            className="popup--header-close"
            onClick={() => {
              closeButtonClickHandler();
            }}
          >
            &times;
          </div>
        </div>
        <div className="popup--content popup-segment">
          <div className="popup--content-section">
            <div className="popup--content-section-title">
              <span>Title</span>
            </div>
            <div className="popup--content-section-field">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={state.ideaDetails.title}
                onChange={(e) => {
                  onParameterChange(e, FORM_FIELDS.TITLE);
                }}
              />
            </div>
          </div>
          <div className="popup--content-section">
            <div className="popup--content-section-title">
              <span>Description</span>
            </div>
            <div className="popup--content-section-field">
              <textarea
                rows="3"
                name="description"
                placeholder="Description"
                value={state.ideaDetails.description}
                onChange={(e) => {
                  onParameterChange(e, FORM_FIELDS.DESCRIPTION);
                }}
              />
            </div>
          </div>

          {/* priorities */}
          <div className="popup--content-section">
            <div className="popup--content-section-title">
              <span>Choose Priority</span>
            </div>
            <div className="popup--content-section-field">
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
            </div>
          </div>

          {/* Categories */}
          <div className="popup--content-section">
            <div className="popup--content-section-title">
              <span>Choose Category</span>
            </div>
            <div className="popup--content-section-field">
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
            </div>
          </div>

          {/* Statuses */}
          <div className="popup--content-section">
            <div className="popup--content-section-title">
              <span>Select Status</span>
            </div>
            <div className="popup--content-section-field">
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
            </div>
          </div>
        </div>
        <div className="popup-buttons popup-segment">
          <button onClick={onSaveClick}>Save Idea</button>
        </div>
      </div>
    </div>
  );
}
