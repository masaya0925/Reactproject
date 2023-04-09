export const filterReducer = (
    state = '', 
    action: {type: string, filter: string}
) => {
  console.log('Action:', action);
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const setFilter = (filter: string) => {
  return {
    type: 'SET_FILTER',
    filter
  };
};