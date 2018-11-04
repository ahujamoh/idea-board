import React from 'react';
import {FORM_FIELDS} from '../../widget/Consts';

export default function HeaderView({onSortClick, isBoardEmpty}) {
    return (
        <div className="header-container">
            <div className="header-logo" />
            <div className="header-app-name">
                <span>idea board</span>
            </div>
            {!isBoardEmpty && (
                <div className="header-menu">
                    <div
                        onClick={() => {
                            onSortClick(FORM_FIELDS.CATEGORY);
                        }}
                    >
                        Sort By Category
                    </div>
                    <div
                        onClick={() => {
                            onSortClick(FORM_FIELDS.PRIORITY);
                        }}
                    >
                        Sort By Priority
                    </div>
                </div>
            )}
        </div>
    );
}
