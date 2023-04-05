export const filterReducer = (
    state = 'ALL', 
    action: {type: string, filter: string}
) => {
  console.log('ACTION:', action);  
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
    default: 
      return state;
  }
};

export const filterChange = (filter: string) => {
  return {
    type: 'SET_FILTER',
    filter
  };
};

