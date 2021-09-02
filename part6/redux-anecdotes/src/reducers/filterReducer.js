export const changeFilter=(filter)=>{
    return {type:'NEW_FILTER',filter:filter}
}
const filterReducer=(state='',action)=>{
    switch(action.type){
        case('NEW_FILTER'):
            return action.filter;
        default:
            return state;
    }
}
export default filterReducer;