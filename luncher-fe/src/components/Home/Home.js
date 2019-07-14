import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchingSchoolsAction, deletingSchoolAction } from '../../actions';
//Todo: replace with real component when ready
import School from '../School/School';
import '../School/School.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchingSchoolsAction();
  }

  deleteHandler = id => {
    this.props
      .deletingSchoolAction(id)
      .then(() => this.props.history.push("/"));
  }

  editHandler = school => {
    this.props.history.push("/updateSchool", {school : school} );
  }

  render() { 
    return (
      <div className="SchoolList">
        {
          !this.props.fetchingSchools 
          ? this.props.schools.map(school => (<School key={school.id} school={school} editHandler={this.editHandler} deleteHandler={this.deleteHandler} />))
          : <h4>Fetching schools ...</h4>
        }
        {
          this.props.error && <p className="error"> { 
            this.props.error
          } </p> 
        }
      </div>
    );
  }
}

const mapStateToProps = ({ schools , fetchingSchools , error }) => ({
  schools,
  fetchingSchools,
  error
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchingSchoolsAction , deletingSchoolAction }
  )(Home)
);
