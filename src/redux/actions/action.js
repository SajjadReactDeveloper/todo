export const AddTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    }
}

export const ToggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const DeleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        id
    }
}

export const UpdateTodo = (todo) => {
    return {
        type: 'UPDATE_TODO',
        payload: todo
    }
}