import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import UserDropdown from '../components/Nav/UserDropdown';
import { KialiAppState, LoginSession } from '../store/Store';
import { KialiAppAction } from '../actions/KialiAppAction';
import LoginThunkActions from '../actions/LoginThunkActions';

const mapStateToProps = (state: KialiAppState) => ({
  session: state.authentication.session!
});

const mapDispatchToProps = (dispatch: ThunkDispatch<KialiAppState, void, KialiAppAction>) => ({
  logout: () => dispatch(LoginThunkActions.logout()),
  extendSession: (session: LoginSession) => dispatch(LoginThunkActions.extendSession(session))
});

const UserDropdownConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDropdown);
export default UserDropdownConnected;
