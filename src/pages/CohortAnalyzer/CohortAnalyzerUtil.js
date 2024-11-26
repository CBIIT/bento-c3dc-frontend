import React from "react";
import search_icon from '../../assets/icons/Search_Icon.svg';

export const triggerNotification = (count, Notification) => {
    if (count > 1) {
        Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
        Notification.show(" " + count + ' Participant added ', 5000,);
    }

};

export const getAllIds = (generalInfo) => {
    let finalIds = [];
    Object.keys(generalInfo).forEach((section) => {
        finalIds = [...finalIds, ...generalInfo[section]]
    })
    return finalIds;
}

export const addCohortColumn = (rowD, state) => {
    let finalRowData = rowD.map((row) => {
        // Get the cohort name for the current participant
        let cohortName = getCohortName(row.participant_pk, state);
        // Return a new object with the added cohort property
        return {
            ...row,
            cohort: cohortName
        };
    });
    return finalRowData;
}

const getCohortName = (pk, state) => {
    const cohortNames = Object.keys(state)
        .filter(cohortKey =>
            state[cohortKey].participants.some(participant => participant.participant_pk === pk)
        )
        .map(cohortKey => state[cohortKey].cohortName)
        .join(", ");
    return cohortNames;
}

export const resetSelection = (setSelectedCohorts) => {
    setSelectedCohorts([]);
}

export const sortBy = (type, cohortList, setCohortList, state) => {
    let listOfCohortsLocal = cohortList;
    if (type === "alphabet") {
        listOfCohortsLocal.sort((a, b) => 
            a.localeCompare(b) )
        setCohortList(listOfCohortsLocal);
    } else if(type === "count") {
        listOfCohortsLocal.sort((a, b) => 
            state[a].participants.length - state[b].participants.length )
        setCohortList(listOfCohortsLocal);
    }
    
    return listOfCohortsLocal;
}

export const sortByReturn = (type, cohortList, state) => {
    let listOfCohortsLocal = cohortList;
    if (type === "alphabet") {
        listOfCohortsLocal.sort((a, b) =>
            a.localeCompare(b))
    } else {
        listOfCohortsLocal.sort((a, b) =>
            state[a].participants.length - state[b].participants.length)

    }

    return listOfCohortsLocal;
}

const deleteCohort = (cohortId, dispatch, onDeleteSingleCohort) => {
    dispatch(onDeleteSingleCohort(cohortId, () => { }, () => { }));
}

const deleteAllCohort = (dispatch, onDeleteAllCohort) => {
    dispatch(onDeleteAllCohort(() => { }, () => { }));
}

export const handleDelete = (cohortId,
    setCohortList,
    setSelectedCohorts,
    dispatch, onDeleteSingleCohort,
    onDeleteAllCohort) => {
    if (cohortId) {
        setCohortList(prevCohortList => prevCohortList.filter(cohort => cohort !== cohortId))
        setSelectedCohorts(prevSelectedCohortList => prevSelectedCohortList.filter(cohort => cohort !== cohortId));
        deleteCohort(cohortId, dispatch, onDeleteSingleCohort);
    } else {
        setCohortList([]);
        setSelectedCohorts([]);
        deleteAllCohort(dispatch, onDeleteAllCohort);
    }
}

export const SearchBox = (classes,setSearchValue,searchValue) => {  
    return (
        <div className={classes.inputStyleContainer}>
            <input
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                value={searchValue}
                type="text"
                placeholder={"Search Participant ID"}
                className={classes.inputStyle}
            />
            <img alt={"Search Icon"} src={search_icon} />
        </div>
    )
}

export function generateQueryVariable(cohortNames, state) {
    let query = {};
    query['participant_pks'] = [];
    query["first"] = 10000;
    cohortNames.forEach((cName) => {
        state[cName].participants.forEach((participant) => {
            query["participant_pks"].push(participant.participant_pk);
        });
    });
    return query;
}

export const handlePopup = (cohortId, state, setDeleteInfo, deleteInfo) => {
    let deleteType = cohortId ? " this cohort?" : " ALL cohorts?";
    if (Object.keys(state).length > 0) {
        setDeleteInfo({ showDeleteConfirmation: !deleteInfo.showDeleteConfirmation, deleteType: deleteType, cohortId: cohortId });
    }
}