import React, { Component } from 'react';
import { connect } from 'react-redux';
import DB from '../Site/db'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class SitePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            urlSite: '',
            userEmail: '',
            userName: '',
            password: '',
            data: [],
            open: false,
            isEdit: false
        };

        this.parseData().then(item => this.setState({ data: item }));
        this.convert = this.convert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleOpen = () => {
        this.state.urlSite = '',
        this.state.userEmail = '',
        this.state.userName = '',
        this.state.password = '',
        this.state.id = '',
        this.setState({ open: true });
    };

    handleSetEdit = (user) => {

        this.setState({
            urlSite: user.urlSite,
            userName: user.userName,
            userEmail: user.email,
            password: user.password,
            id: user.id
        }
        );
        this.setState({ open: true, isEdit: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async parseData() {
        let db = new DB();
        let parsedData = await db.getAllData();
        return parsedData;
    }

    exitsDb() {
        const db = new DB();
        return db;
    }

    handleSubmit() {
        let db = this.exitsDb();
        const { userName, userEmail, urlSite, password, id } = this.state;
        if (this.state.isEdit) {
            db.setDataUpdate(userName, userEmail, urlSite, password, id)
        } else {
            db.setData(userName, userEmail, urlSite, password);
        }

        this.handleClose();
        this.atualizarItems();
    }

    atualizarItems() {
        this.parseData().then(item => this.setState({ data: item }));
    }

    delete(key) {
        if (window.confirm("Você tem certeza que deseja deletar?")) {
            const db = new DB();
            db.delete(key);
            this.atualizarItems();
        }
    }

    convert(data) {
        const obj = {};
        data.map((item, index, arr) => {
            if (index === 0)
                obj[item.tabId] = [{ urlSite: item.urlSite, userName: item.userName, email: item.email, password: item.password }];
            else if (arr[index - 1].tabId === item.tabId)
                obj[item.tabId] = [{ urlSite: item.urlSite, userName: item.userName, email: item.email, password: item.password }];
            else obj[item.tabId] = [{ urlSite: item.urlSite, userName: item.userName, email: item.email, password: item.password }];
            return obj;
        });
        return obj;
    }

    render() {
        const cards = this.state.data;
        // const data = this.convert(this.state.data);
        const { userEmail, password, userName, urlSite } = this.state;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" className="appBar">
                    <Toolbar>
                        {/* <CameraIcon /> */}
                        <Typography variant="title" color="inherit" noWrap>
                            Site
                         </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className="layout-site">
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            {cards.map(card => (
                                <Grid item key={card.id} sm={6} md={4} lg={3}>
                                    <Card className="card">
                                        <CardMedia
                                            className="card-media "
                                            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                            title="Image title"
                                        />
                                        <CardContent className="card-content">
                                            <Typography gutterBottom variant="headline" component="h2">
                                                React Web Login {card.id}
                                            </Typography>
                                            <Typography>
                                                <label>Url:</label> {card.urlSite} <br />
                                                <label>User:</label> {card.userName} <br />
                                                <label>Pass:</label> {card.password}
                                                {/* <Input
                                                name="pass"
                                                type="password"
                                                className="label"
                                                disabled
                                                value={card.password} /> */}
                                                {/* <label>Pass:</label><input type="password" className="label">{card.password}</input> */}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.handleSetEdit(card)
                                            }}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="primary" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.delete(card.id);
                                            }}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="button-register"
                        onClick={this.handleOpen}
                    >
                        Adicionar Site
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Registrar Site</DialogTitle>
                        <DialogContent>
                            <form className="form">
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="urlSite"
                                    label="Url do Site"
                                    type="text"
                                    name="urlSite"
                                    value={urlSite}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    name="userEmail"
                                    value={userEmail}
                                    onChange={this.handleChange}
                                    type="email"
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="user"
                                    label="Nome"
                                    name="userName"
                                    value={userName}
                                    onChange={this.handleChange}
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.handleSubmit();
                                }}
                            >
                                Registrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { data } = state;

    return {
        data
    };
}

const connectedLoginPage = connect(mapStateToProps)(SitePage);
export { connectedLoginPage as SitePage };

export default SitePage;