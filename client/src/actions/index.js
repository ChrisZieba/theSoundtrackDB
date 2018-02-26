var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: randomString(32),
    text
  }
};

export const removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id
  }
};