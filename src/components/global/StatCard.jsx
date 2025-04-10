import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
} from "@mui/material";

const StatCard = ({
  title,
  value,
  subtitle,
  subtitleLink,
  action,
  onActionClick,
}) => (
  <Card
    sx={{
      minWidth: { xs: 150, sm: 250, md: 250 },
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
        {title}
      </Typography>
      <Typography
        style={{
          fontSize: "28px",
          fontWeight: 500,
        }}
        color="primary.sec"
        component="div"
      >
        {value}
      </Typography>
      {subtitle && (
        <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
          {subtitleLink ? (
            <Link
              href={subtitleLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "primary.sec",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {subtitle}
            </Link>
          ) : (
            subtitle
          )}
        </Typography>
      )}
    </CardContent>
    {action && (
      <CardActions>
        <Button size="small" onClick={onActionClick}>
          {action}
        </Button>
      </CardActions>
    )}
  </Card>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  subtitleLink: PropTypes.string,
  action: PropTypes.string,
  onActionClick: PropTypes.func,
};

StatCard.defaultProps = {
  subtitle: null,
  subtitleLink: null,
  action: null,
  onActionClick: () => {},
};

export default StatCard;
