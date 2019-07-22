import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchingSchoolsAction, deletingSchoolAction } from '../../actions';
import School from '../School/School';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchingSchoolsAction();
  }

  deleteHandler = id => {
    this.props
      .deletingSchoolAction(id)
      .then(() => this.props.history.push('/'));
  };

  editHandler = school => {
    // single school page - updating funds etc - updateSchool route to be implemented.
    this.props.history.push('/updateSchool', { school: school });
  };

  render() {
    return (
      <div className="flex flex-wrap">
        {!this.props.fetchingSchools ? (
          this.props.schools.map(school => (
            <School
              key={school.id}
              school={school}
              isLoggedIn={this.props.isLoggedIn}
              userId={this.props.userId}
            />
          ))
        ) : (
          <h4 className="Message">Fetching school information ...</h4>
        )}
        {this.props.error && <p className="error"> {this.props.error} </p>}
      </div>
    );
  }
}

const mapStateToProps = ({
  schools,
  fetchingSchools,
  isLoggedIn,
  userId,
  error,
}) => ({
  schools,
  fetchingSchools,
  isLoggedIn,
  userId,
  error,
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchingSchoolsAction, deletingSchoolAction }
  )(Home)
);
