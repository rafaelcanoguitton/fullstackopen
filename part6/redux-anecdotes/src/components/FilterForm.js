import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const FilterForm = (props) => {
  const change = (event) => {
    props.changeFilter(event.target.value);
  };
  return (
    <div>
      filter
      <input name="filter" onChange={change} />
    </div>
  );
};
const mapDispatchToProps = {
  changeFilter,
};
export default connect(null,mapDispatchToProps)(FilterForm);
