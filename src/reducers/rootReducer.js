const initstate = {
    posts: ["fdsfsdfsdfdsdffds", "fdsfsdfsdfds"],
    linkCount: 1,
    lorem: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    url: 'http://127.0.0.1:8000/',
    features: null
}


const rootReducer = (state = initstate, action) => {
    if (action.type === 'ADD_POST') {
        return {
            ...state,
            posts: [...state.posts, action.data]
        }
    }
    if (action.type === 'ADD_LINK_COUNT') {
        return {
            ...state,
            linkCount: state.linkCount + 1
        }
    }
    if (action.type === "ADD_FEATURES") {
        return {
            ...state,
            features: action.data
        }
    }
    return state
}

export default rootReducer