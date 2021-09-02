import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {changeFilter} from '../reducers/filterReducer'

const FilterForm=()=>{
    const filter= useSelector((state)=>{
        return state.filter;
    });
    const dispatch = useDispatch();
    const change=(event)=>{
        dispatch(changeFilter(event.target.value));
    }
    return(<div>
        filter
            
         <input name='filter' onChange={change}/>
    </div>)
}
export default FilterForm;