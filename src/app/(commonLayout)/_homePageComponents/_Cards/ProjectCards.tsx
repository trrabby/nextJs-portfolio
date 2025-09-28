import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const productImage =
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80";

export const ProjectCards = () => {
  return (
    <Box
      className="text-gray-800 dark:text-fourth bg-white dark:bg-gray-800"
      sx={{
        borderRadius: 3,
        boxShadow: 1,
        p: { xs: 2, md: 4 },
        maxWidth: 900,
        mx: "auto",
        my: 4,
        minHeight: 340,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        className="text-black dark:text-fourth"
        container
        spacing={0}
        alignItems="center"
      >
        {/* Left: Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ pr: { md: 6 }, py: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontFamily: "serif",
                mb: 2,
              }}
            >
              Featured
              <br />
              Product
            </Typography>
            <Box sx={{ width: 40, height: 2, bgcolor: "#1a2440", mb: 2 }} />
            <Typography sx={{ mb: 2, fontSize: 15 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 2 }}>
              <Box component={"span"} style={{ fontStyle: "italic" }}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
              </Box>
              <br />
              <Box
                component={"span"}
                style={{ fontWeight: 700, color: "#1a2440", letterSpacing: 1 }}
              >
                FIRSTNAME SURNAME, REVIEWER
              </Box>
            </Typography>
            <Link
              className={`className="rounded bg-transparent px-8 py-3 text-base font-medium text-accent dark:text-fourth shadow hover:bg-accent dark:hover:bg-slate-700  hover:scale-105 hover:text-white hover:border-white duration-700 border border-blue-200 mt-5 hover:duration-500 rounded-md mr-5`}
              href={"/projects/:id"}
            >
              View Details
            </Link>
          </Box>
        </Grid>
        {/* Right: Product Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              width: "100%",
              height: { xs: 200, md: 260 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            <Box
              component={"img"}
              src={productImage}
              alt="Featured Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
