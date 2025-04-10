import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";

const SkeletonStatCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.05)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        margin: "5%",
      }}
    >
      <Skeleton
        variant="text"
        width="60%"
        height={24}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 1,
        }}
      />
      <Skeleton
        variant="text"
        width="40%"
        height={32}
        sx={{
          mt: 1,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 1,
        }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={20}
        sx={{
          mt: 1,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

export default SkeletonStatCard;
