const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'REMOVE_TODO':
      return state.filter((element) => {
        return element.id !== action.id
      });
    default:
      return state
  }
};

export default todos;