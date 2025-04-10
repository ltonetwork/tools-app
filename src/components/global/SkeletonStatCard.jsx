import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";

const SkeletonStatCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="40%" height={32} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
    </Box>
  );
};

export default SkeletonStatCard;
