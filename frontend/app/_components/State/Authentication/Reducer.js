import {
    GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, LOGIN_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/app/_components/State/Authentication/ActionType";

const initialState = {
    user:null,
    users:[],
    isLoading:false,
    error:null,
    jwt:null,
    success:null
}

export const authReducer = (state = initialState,action) => {
    switch (action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null
            };


        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Success"
            };

        case GET_USER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                user: action.payload,
                success: "User data fetched"
            }

        case GET_USERS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                users: action.payload,
                success: "Users data fetched"
            }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GET_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        default:
            return state;
    }
}