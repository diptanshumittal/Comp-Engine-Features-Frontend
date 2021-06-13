const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (data) => dispatch({type: 'ADD_POST', data: data}),
        addLinkCount: () => dispatch({type: 'ADD_LINK_COUNT'}),
        addFeatures: (features) => dispatch({type: 'ADD_FEATURES', data: features})
    }
}
export default mapDispatchToProps