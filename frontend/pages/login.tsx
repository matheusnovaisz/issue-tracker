import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import { api } from "../src/api";

export default function Login() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("oi");
    const response = await api.get("/");
    console.log(response);
  };
  return (
    <Container>
      <Stack>
        <Typography variant="h1" align="center">
          Login Page
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="username"
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField placeholder="password" type="password" />
          <Button variant="contained" type="submit">
            Fazer login
          </Button>
        </form>
      </Stack>
    </Container>
  );
}
