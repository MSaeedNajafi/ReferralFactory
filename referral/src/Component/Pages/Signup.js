import React, { useState, useEffect } from "react";
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

  const [token, setToken] = useState(
    "2sgv6D8Qpyedx2nHCM0fMGWO90yoRgU3nP1k0Ih0Uv8H8mK6Xk5cQAfadM7ElORMSFp8lYPcTnklRWTK"
  );

  useEffect(() => {
    async function fetchData() {
      await handleSubmit();
    }
    fetchData();
  }, [code]);

  const handleSubmit = async () => {
    // event.preventDefault();
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

    // users.map((user) => {
    //   console.log(user.email);
    // });

    setUser(users.filter((u) => u.email == email));
    // console.log(user[0].referrer_id);
    if (user.length > 0) {
      const ii = user[0].referrer_id;
      //   console.log("This user has been invited by " + user[0].referrer_id);
      const who = users.filter((u) => u.id == ii);
      console.log(who[0]);
      console.log("This user has been invited by " + who[0].first_name);
      alert("This user has been invited by " + who[0].first_name);
    }
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
          <Box
            component="form"
            onSubmit={handleSubmit}
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

            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
