const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (data) => dispatch({type: 'ADD_POST', data: data}),
        addLinkCount: () => dispatch({type: 'ADD_LINK_COUNT'}),
        addFeatures: (features) => dispatch({type: 'ADD_FEATURES', data: features}),
        addExploreMode: (fid,fname) => dispatch({type:'ADD_EXPLOREMODE', data:{fid:fid,fname:fname}})
    }
}
export default mapDispatchToProps