import {useLocation} from "react-router-dom";

/**
 * Returns true if a value is undefined
 * @param value
 * @returns {boolean}
 */
const isUndefinedOrNull = (value) => {
    return typeof value === "undefined" || value === null;
};

/**
 * Used to get the parameter from the URL
 * @returns {URLSearchParams}
 */
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

/**
 * Rounds a number to the provided no. of decimal places
 *
 * @param value Number to be rounded
 * @param decimalPlaces No. of decimal places. By default it's 2
 * @return {number} Rounded Number
 */
const roundNumber = (value, decimalPlaces = 2) => {
    if (isNaN(value)) return 0;
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round((value + Number.EPSILON) * factorOfTen) / factorOfTen;
}

/**
 * Checks if String is empty or contains white spaces
 *
 * @param string String
 * @return {boolean}
 */
const stringIsEmptyOrSpaces = (string) => {
    string = string.toString();
    return isUndefinedOrNull(string) || string.match(/^ *$/) !== null;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    isUndefinedOrNull,
    useQuery,
    roundNumber,
    stringIsEmptyOrSpaces
}