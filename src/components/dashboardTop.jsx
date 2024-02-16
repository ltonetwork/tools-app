import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";

const DashboardTop = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", //v,h,spread,color
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Price
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              $0.82
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Market Cap
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              $0.82
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Current APR
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              14%
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Chain)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Burned Tokens
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              2,400,222M LTO
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Nodes
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              94
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Addresses
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              17000
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default DashboardTop;
