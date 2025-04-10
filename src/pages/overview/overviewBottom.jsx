import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../services/config";
import NodesList from "../../components/NodesList";
import OperationsList from "../../components/OperationsList";

const OverviewBottom = () => {
  const Navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [operations, setOperations] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const past = new Date(currentDate);
    past.setDate(past.getDate() - 3);

    axios
      .get(`${BASE_URL}peers/connected`)
      .then((res) => {
        const nodes = res.data.peers;
        setNodes(nodes);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });

    axios
      .get(`${BASE_URL}index/stats/operations/${past}/${currentDate}`)
      .then((res) => {
        const response = res.data;
        setOperations(response);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });
  }, []);

  const handleClick = (action) => {
    if (action === "nodes") {
      Navigate("/nodes");
    } else if (action === "generators") {
      Navigate("/generators");
    } else if (action === "operations") {
      Navigate("/stats");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fefeff",
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
              <span
                style={{
                  background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "4px",
                }}
              >
                Operations
              </span>
            </Typography>

            <OperationsList operations={operations} isMobile={isMobile} />
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("operations")} size="small">
              more
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fefeff",
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
              <span
                style={{
                  background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "4px",
                }}
              >
                Nodes
              </span>
            </Typography>

            <NodesList nodes={nodes} isMobile={isMobile} />
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("nodes")} size="small">
              more
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OverviewBottom;
