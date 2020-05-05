import React, { useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  withStyles,
  Button,
  TextField,
  Fade
} from "@material-ui/core";
import useInput from "../utils/useInput";
import useAxios from "../utils/useAxios";
import jwt from "jsonwebtoken";
import useLogin from "../utils/useLogin";
// import useLogin from "../utils/useLogin";

const jws = Buffer.from(
  "ZWFmYmVvO2Z2Ym87Z3ZlcmFvO2lndmJhZW9yO3ZnYiBlcjtidm5hZWtsO2J2IG5lcmFvdWlwdm5pb3dlO3ZnYmVyO3Zz",
  "base64"
);

const Login = ({ classes, sign }) => {
  const empCode = useInput("");
  const password = useInput("");

  const axiosOpts = {
    url: "http://localhost:8282/api/auth/login",
    method: "post",
    data: {
      empCode: empCode.value,
      password: password.value
    }
  };
  const { loading, data, headers, fetch } = useAxios(axiosOpts);

  const loginEffect = () => {
    const authorization = headers && headers.authorization;
    sign(authorization);
  };
  useEffect(loginEffect, [data]);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img
          src="https://flatlogic.github.io/react-material-admin/static/media/logo.a0185b04.svg"
          alt="logo"
          className={classes.logotypeImage}
        />
        <Typography className={classes.logotypeText}>ErpXpress</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h4" className={classes.greeting}>
              로그인1
            </Typography>
            <Fade in={data && data.errorCode}>
              <Typography color="secondary" className={classes.errorMessage}>
                {data && data.errorMsg}
              </Typography>
            </Fade>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={empCode.value}
              onChange={empCode.onChange}
              margin="normal"
              placeholder="사원코드"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={password.value}
              onChange={password.onChange}
              margin="normal"
              placeholder="비밀번호"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {loading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    empCode.value.length === 0 || password.value.length === 0
                  }
                  onClick={fetch}
                  variant="contained"
                  size="large"
                  className={classes.loginButton}
                >
                  LOGIN
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
        <Typography className={classes.copyright}>
          © 2019 SeoulIT Academy, React project.
        </Typography>
      </div>
    </Grid>
  );
};

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.login,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing.unit * 4
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48
    }
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  form: {
    width: 320
  },
  tab: {
    fontWeight: 400,
    fontSize: 18
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  googleButton: {
    marginTop: theme.spacing.unit * 6,
    // boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none"
  },
  googleButtonCreating: {
    marginTop: 0
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing.unit * 2
  },
  creatingButtonContainer: {
    marginTop: theme.spacing.unit * 2.5,
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    height: 46,
    textTransform: "none"
  },
  formDividerContainer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40"
  },
  errorMessage: {
    textAlign: "center"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.login
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.login} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.login
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  loginLoader: {
    marginLeft: theme.spacing.unit * 4
  },
  copyright: {
    color: theme.palette.primary.login,
    fontSize: "0.875rem",
    marginTop: theme.spacing.unit * 4,
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing.unit * 2
    }
  },
  loginButton: {
    color: "white",
    backgroundColor: theme.palette.primary.login,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#0069d9"
    }
  }
});

export default withStyles(styles, { withTheme: true })(Login);
