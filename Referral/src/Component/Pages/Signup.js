import React, { useState, useEffect } from "react";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEMail] = useState("");
  const [emailTo, setEMailTo] = useState("");

  const [token, setToken] = useState(
    "2sgv6D8Qpyedx2nHCM0fMGWO90yoRgU3nP1k0Ih0Uv8H8mK6Xk5cQAfadM7ElORMSFp8lYPcTnklRWTK"
  );
  // useEffect(() => {
  //   async function fetchData() {
  //     await handleSubmit();
  //   }
  //   fetchData();
  // }, [code]);

  const handleSubmit = async (str) => {
    setLoading(true);
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
    setLoading(false);

    console.log("got data");

    // users.map((user) => {
    //   console.log(user.email);
    // });

    const useremails = [...users];

    console.log(useremails);

    await setUser(users.filter((u) => u.email == email));
    console.log("found user");
    await console.log(user[0]);
    if (user.length > 0) {
      const ii = user[0].referrer_id;
      //   console.log("This user has been invited by " + user[0].referrer_id);
      const who = users.filter((u) => u.id == ii);
      await console.log(who[0]);
      await setEMailTo(who[0].email);
      await console.log(emailTo);
      await console.log("This user has been invited by " + who[0].first_name);
      // alert(`This user has been invited by ${who[0].first_name}`);
      await findUser(user[0].id);
      await setLoading(false);
    }
    // alert("hi");
  };

  const findUser = async (id) => {
    // console.log(id);
    await fetch(`https://referral-factory.com/api/v1/users/${id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      }),
      body: `qualified=1&select=id`,
    })
      .then((res) => res.json())
      .then(async (data) => {
        await console.log("========");
        await console.log(data);

        if (emailTo.length > 0) {
          await console.log(emailTo);
          const response = await axios.post(
            "http://localhost:8000/sendreward",
            {
              emailTo,
            }
          );

          console.log("response--> ", response.data);
        }
        await console.log("========");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* <form onSubmit={handleSubmit}> */}
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEMail(e.target.value);
              }}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="CampaignsID"
              label="CampaignsID"
              type="CampaignsID"
              id="CampaignsID"
              autoComplete="current-CampaignsID"
              onChange={(e) => {
                setCode(e.target.value);
              }}
              value={code}
            />

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleSubmit("all")}
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
            >
              {loading ? "Loading " : "Sign Up"}
            </Button>
          </Box>
          {/* </form> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
