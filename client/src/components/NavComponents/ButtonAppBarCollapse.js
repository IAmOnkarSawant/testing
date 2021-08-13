import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    buttonCollapse: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        margin: "10px",
        boxShadow: "none"
    },
});

class ButtonAppBarCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleMenu = this.handleMenu.bind(this);
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.buttonCollapse}>
                <MenuIcon fontSize="large" onClick={this.handleMenu} />
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    }
}
export default withStyles(styles)(ButtonAppBarCollapse);
