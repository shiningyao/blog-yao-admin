import { LoginPage } from '@/shared/login/login.component';
import { connect } from 'react-redux';
import { authenticate, logout, login } from '@/shared/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return Object.assign({}, state);
};
  
const mapDispatchToProps = dispatch => ({
    authenticate: bindActionCreators(authenticate, dispatch),
    login: bindActionCreators(login, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);