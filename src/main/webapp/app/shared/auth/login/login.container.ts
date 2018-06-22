import { LoginPage } from './login.component';
import { connect } from 'react-redux';
import { authenticate } from '@/shared/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return Object.assign({}, state);
};
  
const mapDispatchToProps = dispatch => ({
    authenticate: bindActionCreators(authenticate, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);