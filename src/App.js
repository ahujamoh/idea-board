import React, {Component} from 'react';
import EmptyBoardView from './widget/templates/IdeaBoard.emptyBoardView';
import CreateNewIdeaPopUpView from './widget/templates/IdeaBoard.createNewIdeaPopUpView';
import IdeasView from './widget/templates/IdeaBoard.ideasView';
import CreateNewIdeaButtonView from './widget/templates/IdeaBoard.createNewIdeaButtonView';
import './App.css';
import {FORM_FIELDS} from './widget/Consts';
import _groupBy from 'lodash/groupBy';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ideasOnBoard: [],
      showCreateNewIdeaPopUp: false,
      ideaDetails: {},
      isUpdatingIdea: false,
      ideaToUpdate: {},
      sortBy: FORM_FIELDS.CATEGORY
    };
    this.handlePopupVisibility = this.handlePopupVisibility.bind(this);
    this.onSaveIdeaClick = this.onSaveIdeaClick.bind(this);
    this.onParameterChange = this.onParameterChange.bind(this);
    this.onIdeaDelete = this.onIdeaDelete.bind(this);
    this.onIdeaUpdate = this.onIdeaUpdate.bind(this);
    this.getSortedIdeasToDisplay = this.getSortedIdeasToDisplay.bind(this);
  }

  handlePopupVisibility() {
    this.setState({
      showCreateNewIdeaPopUp: !this.state.showCreateNewIdeaPopUp
    });
  }

  onParameterChange(e, parameter) {
    const updatedIdeaDetails = {
      ...this.state.ideaDetails,
      [parameter]: e.target.value
    };
    this.setState({
      ideaDetails: updatedIdeaDetails
    });
  }

  getCurrentDateAndTIme() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return `On:${date} at:${time}`;
  }

  onSaveIdeaClick() {
    let updatedIdeasOnBoard = [...this.state.ideasOnBoard];

    let newIdeaDetails = {
      ...this.state.ideaDetails,
      creationTime: this.getCurrentDateAndTIme()
    };

    if (this.state.isUpdatingIdea) {
      updatedIdeasOnBoard = updatedIdeasOnBoard.filter((idea) => {
        return idea[FORM_FIELDS.TITLE] !== this.state.ideaToUpdate[FORM_FIELDS.TITLE];
      });
      newIdeaDetails = {
        ...newIdeaDetails,
        updatedTime: this.getCurrentDateAndTIme()
      };
    }

    updatedIdeasOnBoard = [...updatedIdeasOnBoard, newIdeaDetails];
    this.setState({
      ideasOnBoard: updatedIdeasOnBoard,
      isUpdatingIdea: false,
      ideaToUpdate: {}
    });

    this.popUpCloseHandler();
  }

  popUpCloseHandler() {
    this.handlePopupVisibility();
    this.setState({
      ideaDetails: {}
    });
  }

  onIdeaDelete(idea) {
    const updatedIdeasOnBoard = this.state.ideasOnBoard.filter((i) => {
      if (i[FORM_FIELDS.TITLE] === idea[FORM_FIELDS.TITLE] && i[FORM_FIELDS.CATEGORY] === idea[FORM_FIELDS.CATEGORY]) {
        return false;
      }
      return true;
    });
    this.setState({
      ideasOnBoard: updatedIdeasOnBoard
    });
  }

  onIdeaUpdate(idea) {
    this.setState({
      isUpdatingIdea: true,
      ideaToUpdate: idea,
      showCreateNewIdeaPopUp: true,
      ideaDetails: idea
    });
  }

  getSortedIdeasToDisplay() {
    const sortedIdeas = _groupBy(this.state.ideasOnBoard, (idea) => {
      return idea[this.state.sortBy];
    });
    return sortedIdeas;
  }

  render() {
    const isBoardEmpty = this.state.ideasOnBoard.length === 0;
    return (
      <div>
        {this.state.showCreateNewIdeaPopUp && (
          <CreateNewIdeaPopUpView
            onParameterChange={this.onParameterChange}
            state={this.state}
            closeButtonClickHandler={this.handlePopupVisibility}
            onSaveClick={this.onSaveIdeaClick}
          />
        )}
        {isBoardEmpty ? (
          <EmptyBoardView
            createNewIdeaButtonClickHandler={this.handlePopupVisibility}
            showCreateNewIdeaPopUp={this.state.showCreateNewIdeaPopUp}
          />
        ) : (
          <IdeasView
            sortedIdeas={this.getSortedIdeasToDisplay()}
            onIdeaDelete={this.onIdeaDelete}
            onIdeaUpdate={this.onIdeaUpdate}
          />
        )}
        {!isBoardEmpty && <CreateNewIdeaButtonView clickHandler={this.handlePopupVisibility} />}
      </div>
    );
  }
}
