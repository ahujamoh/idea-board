import React, {Component} from 'react';
import EmptyBoardView from './widget/templates/IdeaBoard.emptyBoardView';
import CreateNewIdeaPopUpView from './widget/templates/IdeaBoard.createNewIdeaPopUpView';
import IdeasView from './widget/templates/IdeaBoard.ideasView';
import CreateNewIdeaButtonView from './widget/templates/IdeaBoard.createNewIdeaButtonView';
import HeaderView from './widget/templates/IdeaBoard.headerView';
import {FORM_FIELDS} from './widget/Consts';
import _groupBy from 'lodash/groupBy';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';

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
        this.sortIdeasBy = this.sortIdeasBy.bind(this);
    }

    handlePopupVisibility() {
        this.setState({
            showCreateNewIdeaPopUp: !this.state.showCreateNewIdeaPopUp
        });
    }

    /**
     * @desc this method is invoked whenever a parameter is changed/updated in the create-idea pop-up
     * @param e - event (object)
     * @param parameter - changed parameter (string)
     */
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

    /**
     * @desc it is invoked every time user clicks on 'Save Idea' button in pop-up.
     * it updates the state to accommodate the new idea
     * it also closes the pop-up
     */
    onSaveIdeaClick() {
        /**
         * this condition checks if any of the for field is empty.
         * if it is empty it sets the "isFormEmpty" flag true
         */
        if (_isEmpty(this.state.ideaDetails)) {
            this.popUpCloseHandler();
            return;
        }

        let updatedIdeasOnBoard = [...this.state.ideasOnBoard];

        let newIdeaDetails = {
            ...this.state.ideaDetails,
            creationTime: this.getCurrentDateAndTIme()
        };

        /**
         * @desc this condition checks if the pop-up is open for "updating" the idea,
         * if yes, it filters out the prev idea and enters the updated one in its place.
         */
        if (this.state.isUpdatingIdea) {
            updatedIdeasOnBoard = updatedIdeasOnBoard.filter((idea) => {
                return idea.creationTime !== this.state.ideaToUpdate.creationTime;
            });
            newIdeaDetails = {
                ...newIdeaDetails,
                updatedTime: this.getCurrentDateAndTIme()
            };
        }

        updatedIdeasOnBoard = [...updatedIdeasOnBoard, this.getNewIdeaDetailsWithDefaults(newIdeaDetails)];
        this.setState({
            ideasOnBoard: updatedIdeasOnBoard,
            isUpdatingIdea: false,
            ideaToUpdate: {}
        });

        this.popUpCloseHandler();
    }

    getNewIdeaDetailsWithDefaults(newIdeaDetails) {
        const ideaDetailsWithDefaults = {...newIdeaDetails};
        if (_isEmpty(ideaDetailsWithDefaults.category)) {
            ideaDetailsWithDefaults.category = 'unCategorized';
        }
        if (_isEmpty(ideaDetailsWithDefaults.priority)) {
            ideaDetailsWithDefaults.priority = 'default';
        }
        return ideaDetailsWithDefaults;
    }

    popUpCloseHandler() {
        if (this.state.isFormEmpty) {
            return;
        }
        this.handlePopupVisibility();
        this.setState({
            ideaDetails: {}
        });
    }

    onIdeaDelete(idea) {
        const updatedIdeasOnBoard = this.state.ideasOnBoard.filter((i) => {
            if (
                i[FORM_FIELDS.TITLE] === idea[FORM_FIELDS.TITLE] &&
                i[FORM_FIELDS.CATEGORY] === idea[FORM_FIELDS.CATEGORY]
            ) {
                return false;
            }
            return true;
        });
        this.setState({
            ideasOnBoard: updatedIdeasOnBoard
        });
    }

    /** @desc it is invoked when user click on the update button on the individual idea level
     * it updates the state (ideaDetails) so that the pop-up is opened with existing values already filled
     * it also sets the showPopup flag to true
     * @param idea - particular idea being updated (object)
     */
    onIdeaUpdate(idea) {
        this.setState({
            isUpdatingIdea: true,
            ideaToUpdate: idea,
            showCreateNewIdeaPopUp: true,
            ideaDetails: idea
        });
    }

    sortIdeasBy(sortBy) {
        this.setState({
            sortBy
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
            <div className="app-container">
                <HeaderView onSortClick={this.sortIdeasBy} isBoardEmpty={isBoardEmpty} />
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
