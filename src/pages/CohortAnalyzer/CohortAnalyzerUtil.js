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

export const getSortDirection = (list, type, state) => {
    let isAscending = true;
    let isDescending = true;
    for (let i = 1; i < list.length; i++) {
        if (type === "alphabet") {
            if (list[i].localeCompare(list[i - 1]) < 0) isAscending = false;
            if (list[i].localeCompare(list[i - 1]) > 0) isDescending = false;
        } else if (type === "participants") {
            const currentCount = state[list[i]].participants.length;
            const previousCount = state[list[i - 1]].participants.length;
            if (currentCount < previousCount) isAscending = false;
            if (currentCount > previousCount) isDescending = false;
        }
    }

    if (isAscending) return "asc";
    if (isDescending) return "des";
    return "Unsorted";
};

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

export const sortBy = (type, cohortList, setCohortList, state, setSortDirection, sortDirection) => {
    let listOfCohortsLocal = cohortList;
    if (type === "alphabet") {
        let sortDirectionLocal = getSortDirection(cohortList, "alphabet", state);
        listOfCohortsLocal.sort((a, b) => sortDirectionLocal === "des" ?
            a.localeCompare(b) :
            b.localeCompare(a))
        setCohortList(listOfCohortsLocal);
    } else {
        listOfCohortsLocal.sort((a, b) => getSortDirection(cohortList, "participants", state) === "des" ?
            state[a].participants.length - state[b].participants.length :
            state[b].participants.length - state[a].participants.length)
        setCohortList(listOfCohortsLocal);
    }
    setSortDirection(sortDirection === "asc" ? "dec" : "asc")
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

export const SearchBox = (classes,setSearchValue) => {
    return (
        <div className={classes.inputStyleContainer}>
            <input
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                type="text"
                placeholder={"Search Participant ID"}
                className={classes.inputStyle}
            />
            <img alt={"Search Icon"} src={search_icon} />
        </div>
    )
}

export function generateQueryVariable(cohortNames,state) {
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

export const handelPopup = (cohortId,state,setDeleteInfo,deleteInfo) => {
    let deleteType = cohortId ? "delete this cohort?" : "delete ALL cohorts?";
    if (Object.keys(state).length > 0) {
        setDeleteInfo({ showDeleteConfirmation: !deleteInfo.showDeleteConfirmation, deleteType: deleteType, cohortId: cohortId });
    }
}