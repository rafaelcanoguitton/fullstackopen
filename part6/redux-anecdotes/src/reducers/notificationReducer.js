export const setNotification = (content) => {
  return { type: "NEW_NOTIFICATION", data: content };
};
const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};
export default notificationReducer;
