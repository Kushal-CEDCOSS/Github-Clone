import { saveLogin } from "./Actions"

export const mapDispatchToProps = (dispatch) => {
    return{
        saveCredentials: (e) => dispatch(saveLogin(e))
    }
}


export const mapStateToProps = (state) => {
    return {
        ...state,
    }
}