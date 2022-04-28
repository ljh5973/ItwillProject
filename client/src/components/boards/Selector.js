import {MenuItem, Select} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Selector({dataList, selectedValue, handleChangeSelect}) {
    const classes = useStyles();

    return (<Select
        value={selectedValue === "" ? dataList[0].value : selectedValue}
        onChange={event => handleChangeSelect(event.target.value)}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{'aria-label': 'Without label'}}
    >
        {dataList.map((data) => (
            <MenuItem key={data.value} value={data.value} selected>
                {data.print}
            </MenuItem>
        ))}
    </Select>);
}