import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { joinPrivateGroup } from '../../redux/actions/privategroupAction'
import { profileDetails } from '../../redux/actions/profileAction'
import { Button, TextField } from "@material-ui/core";

class Modal extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
    this.state = {
      passCode: ''
    }
  }

  componentDidMount() {
    this.props.profileDetails()
  }

  componentWillUnmount() {

  }

  handleSubmitPasscode = (e) => {
    e.preventDefault()
    const JoinData = {
      privateGroupId: this.props.match.params.id,
      passCode: this.state.passCode,
      groupName: this.props.match.params.groupName
    }
    this.props.joinPrivateGroup(JoinData, this.props.history)
    // this.forceUpdate()
    this.setState({
      passCode: ''
    })
  }

  render() {
    // const { pref, id } = this.props.match.params;

    if (this.props.isModal) {
      return (
        <div
          ref={this.modalRef}
          className="modal-wrapper"
          onClick={() => this.props.history.goBack()}
        >
          <div className="modal" onClick={e => e.stopPropagation()}>
            {/* <h1>{pref} : {id}</h1> */}
            <form onSubmit={this.handleSubmitPasscode} >
              <TextField
                type="text"
                name="passCode"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(e) => this.setState({ passCode: e.target.value })}
                value={this.state.passCode}
              />
              <Button
                variant="contained"
                fullWidth
                size="small"
                className={`${this.state.passCode ? 'join_group' : 'disabled_join_group'}`}
                disabled={!this.state.passCode}
                onClick={this.handleSubmitPasscode}
              >
                Join
              </Button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div
          ref={this.modalRef}
          className="modal-wrapper"
        >
          <div className="modal">
            {/* <h1>{pref} : {id}</h1> */}
            <form onSubmit={this.handleSubmitPasscode} >
              <TextField
                type="text"
                name="passCode"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(e) => this.setState({ passCode: e.target.value })}
                value={this.state.passCode}
              />
              <Button
                variant="contained"
                fullWidth
                size="small"
                className={`${this.state.passCode ? 'join_group' : 'disabled_join_group'}`}
                disabled={!this.state.passCode}
                onClick={this.handleSubmitPasscode}
              >
                Join
              </Button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    details: state.profile.details
  }
}

export default connect(mapStateToProps, { profileDetails, joinPrivateGroup })(withRouter(Modal));
