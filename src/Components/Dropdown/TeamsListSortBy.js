import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from '@material-ui/core/MenuItem';
// import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function GroupedSelect(props) {
  const classes = useStyles();

  const { changeSort } = props;

  const handleChange = (e) => {
    changeSort(e.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Sort By - </InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          onChange={handleChange}
        >
          <option
            aria-label="Sort selector, conference or division"
            value="All"
          >
            All
          </option>
          <optgroup label="Conferences">
            <option value="Eastern">Eastern</option>
            <option value="Western">Western</option>
          </optgroup>
          <optgroup label="Divisions">
            <option value="Metro">Metro</option>
            <option value="ATL">ATL</option>
            <option value="CEN">CEN</option>
            <option value="PAC">PAC</option>
          </optgroup>
        </Select>
      </FormControl>
    </div>
  );
}
