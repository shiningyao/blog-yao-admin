import { bindActionCreators } from "redux";
import { logout } from "@/shared/actions";
import { connect } from "react-redux";
import { Topbar } from "@/components/topbar/topbar.component";

const mapStateToProps = state => {
    return Object.assign({}, state);
};
  
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topbar);