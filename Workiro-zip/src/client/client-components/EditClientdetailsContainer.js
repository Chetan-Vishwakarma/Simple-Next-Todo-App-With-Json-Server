// EditClientdetailsContainer.js
import { connect } from 'react-redux';
// import EditClientdetails from './EditClientdetails';
import { setUserDetail, setDataCompanyHouse, setSelectedFolderID } from '../../redux/reducers/counterSlice'; // Import the actions
import EditClientdetails from './EditClientdetails';
// import EditReference from './EditReference';

// Define mapStateToProps function to map Redux state to component props
// Define mapStateToProps function to map Redux state to component props
const mapStateToProps = (state) => {
    console.log('Redux State:', state); // Log Redux state to inspect its structure
    return {
      userDetail: state.counter.userDetail,
      dataCompanyHouse: state.counter.dataCompanyHouse,
      selectedFolderID: state.counter.selectedFolderID,
    };
  };
  
// Define mapDispatchToProps function to map action creators to component props
const mapDispatchToProps = {
  setUserDetail,
  setDataCompanyHouse,
  setSelectedFolderID,
  // Add other action creators if needed
};

// Connect the component to the Redux store
const EditClientdetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClientdetails);

export default EditClientdetailsContainer;
