import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import "./App.css";

function App() {
  const [id, setID] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [live, setLive] = useState(false);
  const [name, setName] = useState(false);
  const [reach, setReach] = useState(false);
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState(false);
  const [url, setURL] = useState("");
  const [users, setUsers] = useState([]);
  const [referi, setReferi] = useState([]);

  const [open, setOpen] = useState(false);

  const [openListAdd, setOpenListAdd] = useState(false);
  const [openListAddUser, setOpenListAddUser] = useState(false);

  const [newCId, setNewCId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserNameEmail, setNewUserNameEmail] = useState("");

  const token =
    "2sgv6D8Qpyedx2nHCM0fMGWO90yoRgU3nP1k0Ih0Uv8H8mK6Xk5cQAfadM7ElORMSFp8lYPcTnklRWTK";

  const handleOpenListAdd = () => {
    setOpenListAdd(!openListAdd);
  };

  const handleOpenListAddNewUser = () => {
    setOpenListAddUser(!openListAddUser);
  };

  // useEffect(async () => {
  //   await handleSubmit();
  //   await handleUsers(id);
  // }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch(`https://referral-factory.com/api/v1/campaigns/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCode(data.data.code);
        setEnd(data.data.end);
        setLive(data.data.live);
        setName(data.data.name);
        setReach(data.data.reach);
        setStart(data.data.start_at);
        setStatus(data.data.status);
        setURL(data.data.url);
      })
      .catch((error) => {
        setLoading(false);
      });
    setLoading(false);

    // window.location.reload();
  };

  const handleUsers = async (str) => {
    await fetch("https://referral-factory.com/api/v1/users", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        with: "all",
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        await setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = async (id) => {
    // console.log(id);
    await fetch(`https://referral-factory.com/api/v1/users/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        await setReferi(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitNewUser = async (event) => {
    event.preventDefault();
    console.log("adding new user", newUserName, newUserNameEmail, newCId);

    await fetch(`https://referral-factory.com/api/v1/users`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      }),
      body: `campaign_id=${newCId}&&first_name=${newUserName}&email=${newUserNameEmail}&select=id`,
    })
      .then((res) => res.json())
      .then(async (data) => {
        await console.log(data);
        alert("User successfully added");
      })
      .catch((error) => {
        console.log(error);
      });
    setNewUserName("");
    setNewUserNameEmail("");
  };

  console.log(users);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ padding: 20, backgroundColor: "#33335b" }}
    >
      <Container style={{ padding: 20, backgroundColor: "#5485fb" }}>
        <List aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleOpenListAddNewUser}>
            <ListItemText primary="Add a new User" />
            {openListAddUser ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openListAddUser} timeout="auto" unmountOnExit>
            <Box sx={{ bgcolor: "#cfe8fc" }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} style={{ padding: 20 }}>
                  <form onSubmit={handleSubmitNewUser}>
                    <div
                      style={{
                        display: "flex",
                        border: "1px solid grey",
                        padding: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        required
                        id="CampaignID"
                        placeholder="Campaign ID"
                        value={newCId}
                        label="Campaign ID"
                        variant="outlined"
                        onChange={(e) => {
                          setNewCId(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                      <TextField
                        required
                        id="NewUserName"
                        placeholder="New User Name"
                        value={newUserName}
                        label="New User Name"
                        variant="outlined"
                        onChange={(e) => {
                          setNewUserName(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                      <TextField
                        required
                        type="email"
                        id="emI "
                        placeholder="New User Name Email"
                        value={newUserNameEmail}
                        label="New User Name Email"
                        variant="outlined"
                        onChange={(e) => {
                          setNewUserNameEmail(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                      <Button
                        variant="contained"
                        style={{ width: "100%" }}
                        type="submit"
                      >
                        Add a new User
                      </Button>
                    </div>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          <ListItemButton onClick={handleOpenListAdd}>
            <ListItemText primary="Search For a Campaign" />
            {openListAdd ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openListAdd} timeout="auto" unmountOnExit>
            <Box sx={{ bgcolor: "#cfe8fc" }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid grey",
                      padding: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      id="Id"
                      placeholder="Campaign ID"
                      value={id}
                      label="Campaign ID"
                      variant="outlined"
                      onChange={(e) => {
                        setID(e.target.value);
                      }}
                      style={{ width: "100%" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      style={{ width: "100%" }}
                    >
                      Search for a Campaign
                    </Button>
                  </div>
                </Grid>

                <Divider style={{ width: "100%" }} />
                <Grid item xs={12} style={{ padding: code ? 20 : 0 }}>
                  {code && (
                    <div style={{ border: "1px solid grey", padding: 20 }}>
                      <div>
                        Campaign Name:{" "}
                        <span style={{ fontSize: 20 }}> {name}</span>
                      </div>
                      <br />
                      <div>
                        Campaign Code:
                        <span
                          style={{
                            backgroundColor: "#e84a4a",
                            padding: 5,
                            borderRadius: 25,
                            fontSize: 12,
                          }}
                        >
                          {code}
                        </span>
                      </div>
                      <br />
                      <div>
                        How many people it has reached in total:
                        <span
                          style={{
                            fontWeight: "bold",
                            border: "1px solid grey",
                            padding: 5,
                          }}
                        >
                          {reach}
                        </span>
                      </div>
                      <br />
                      <div>
                        Link for the referal Factory:{" "}
                        <Link href={url}>{url}</Link>
                      </div>
                      <br />
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => handleUsers("all")}
                        >
                          get users
                        </Button>
                        {/* <Button variant="outlined" onClick={() => handleUsers("campaign")}>
                      Submit with Campaign
                    </Button>
                    <Button variant="outlined" onClick={() => handleUsers("referrer")}>
                      Submit with Referred
                    </Button> */}
                      </div>
                      <br />
                      <div>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Id</TableCell>
                                {/* <TableCell>Campaign ID</TableCell> */}

                                <TableCell>Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Referrer Id</TableCell>
                                <TableCell align="left">Source</TableCell>
                                <TableCell align="left">Url</TableCell>
                                <TableCell align="left">Reach To</TableCell>
                                <TableCell align="left">
                                  Referrer Name
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            {users.map((user, index) =>
                              user.campaign_id == id ? (
                                <TableBody key={user.id}>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {user.id}
                                    </TableCell>
                                    {/* <TableCell component="th" scope="row">
                                  {user.campaign_id}
                                </TableCell> */}
                                    <TableCell component="th" scope="row">
                                      {user.first_name}
                                    </TableCell>
                                    <TableCell align="left">
                                      {user.email}
                                    </TableCell>
                                    <TableCell align="left">
                                      {user.referrer_id}
                                    </TableCell>
                                    <TableCell align="left">
                                      {user.source}
                                    </TableCell>
                                    <TableCell align="left">
                                      <Link href={user.url}>{user.url}</Link>
                                    </TableCell>
                                    <TableCell align="left">
                                      {
                                        users.filter(
                                          (u) => u.referrer_id == user.id
                                        ).length
                                      }
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ display: "flex" }}
                                    >
                                      {users.map((u) =>
                                        u.referrer_id == user.id ? (
                                          <div
                                            key={Math.floor(
                                              Math.random() * 100
                                            )}
                                          >
                                            <Button
                                              variant="text"
                                              onClick={() =>
                                                handleClickOpen(u.id)
                                              }
                                            >
                                              {u.first_name}
                                            </Button>
                                            <Dialog
                                              open={open}
                                              onClose={handleClose}
                                              aria-labelledby="alert-dialog-title"
                                              aria-describedby="alert-dialog-description"
                                            >
                                              <DialogTitle id="alert-dialog-title">
                                                {"User Information"}
                                              </DialogTitle>
                                              <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                      // alignContent: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      variant="button"
                                                      display="block"
                                                      gutterBottom
                                                    >
                                                      id
                                                    </Typography>
                                                    <Typography
                                                      variant="button"
                                                      display="block"
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                      gutterBottom
                                                    >
                                                      {referi.id}
                                                    </Typography>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                    }}
                                                  >
                                                    <Typography
                                                      variant="button"
                                                      display="block"
                                                      gutterBottom
                                                    >
                                                      name
                                                    </Typography>
                                                    <Typography
                                                      variant="button"
                                                      display="block"
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                      gutterBottom
                                                    >
                                                      {referi.first_name}
                                                    </Typography>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      variant="button"
                                                      display="block"
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                      gutterBottom
                                                    >
                                                      {referi.email}
                                                    </Typography>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent: "center",
                                                    }}
                                                  >
                                                    <Link href={referi.url}>
                                                      Click Here
                                                    </Link>
                                                  </div>
                                                </DialogContentText>
                                              </DialogContent>
                                              <DialogActions>
                                                <Button
                                                  onClick={handleClose}
                                                  autoFocus
                                                >
                                                  Ok
                                                </Button>
                                              </DialogActions>
                                            </Dialog>
                                          </div>
                                        ) : null
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ) : null
                            )}
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </List>
      </Container>
    </Grid>
  );
}

export default App;

// {users.map((u) =>
//   u.referrer_id == user.id ? (
//     <>{u.id}</>
//   ) : null
// )}

// {
//   users.filter(
//     (u) => u.referrer_id == user.id
//   ).length
// }

{
  /* <TableContainer component={Paper}>
                                                <Table
                                                  sx={{ minWidth: 650 }}
                                                  size="small"
                                                  aria-label="a dense table"
                                                >
                                                  <TableHead>
                                                    <TableRow>
                                                      <TableCell>id</TableCell>
                                                      <TableCell align="left">
                                                        first_name
                                                      </TableCell>
                                                      <TableCell align="left">
                                                        email
                                                      </TableCell>

                                                      <TableCell align="left">
                                                        url
                                                      </TableCell>
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    <TableRow
                                                      sx={{
                                                        "&:last-child td, &:last-child th":
                                                          { border: 0 },
                                                      }}
                                                    >
                                                      <TableCell
                                                        component="th"
                                                        scope="row"
                                                      >
                                                        {referi.id}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                        {referi.first_name}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                        {referi.email}
                                                      </TableCell>

                                                      <TableCell align="left">
                                                        <Link href={referi.url}>
                                                          Click Here
                                                        </Link>
                                                      </TableCell>
                                                    </TableRow>
                                                  </TableBody>
                                                </Table>
                                              </TableContainer> */
}
