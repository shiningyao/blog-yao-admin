import { changeLangKey } from './../../shared/actions/index';
import { bindActionCreators } from "redux";
import { logout } from "@/shared/actions";
import { connect } from "react-redux";
import { Topbar } from "@/components/topbar/topbar.component";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};
  
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    changeLangKey: bindActionCreators(changeLangKey, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topbar);