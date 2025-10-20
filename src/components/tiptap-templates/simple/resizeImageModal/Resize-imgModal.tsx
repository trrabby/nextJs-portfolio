/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";

interface ResizeImageModalProps {
  open: boolean;
  onClose: () => void;
  onResize: (width: string, height: string) => void;
}

const ResizeImageModal: React.FC<ResizeImageModalProps> = ({
  open,
  onClose,
  onResize,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  const [keepRatio, setKeepRatio] = useState(true);
  const [ratio, setRatio] = useState<string | null>(null);

  const handleApply = () => {
    onResize(width, height);
    onClose();
  };

  const handleRatioChange = (_: any, newRatio: string | null) => {
    setRatio(newRatio);
    if (newRatio) {
      switch (newRatio) {
        case "1:1":
          setHeight(width);
          break;
        case "16:9":
          setHeight(`${(parseInt(width) * 9) / 16}px`);
          break;
        case "4:3":
          setHeight(`${(parseInt(width) * 3) / 4}px`);
          break;
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor:
            theme.palette.mode === "dark" ? "grey.900" : "background.paper",
          borderRadius: 3,
          boxShadow: 8,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          color: theme.palette.mode === "dark" ? "#04d1a1" : "primary.main",
        }}
      >
        Resize Image
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.02)",
          borderRadius: 2,
        }}
      >
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
          <TextField
            fullWidth
            label="Width (px or %)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            margin="dense"
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            label="Height (px or %)"
            value={height}
            onChange={(e) => {
              if (keepRatio) setWidth(e.target.value);
              setHeight(e.target.value);
            }}
            margin="dense"
            variant="outlined"
            size="small"
            disabled={keepRatio}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={keepRatio}
              onChange={() => setKeepRatio(!keepRatio)}
              color="primary"
            />
          }
          label={
            <Typography
              sx={{
                color:
                  theme.palette.mode === "dark" ? "grey.300" : "text.secondary",
              }}
            >
              Keep aspect ratio
            </Typography>
          }
        />

        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color:
                theme.palette.mode === "dark" ? "grey.400" : "text.secondary",
            }}
          >
            Preset Ratios
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={ratio}
            exclusive
            onChange={handleRatioChange}
            fullWidth
            size="small"
          >
            <ToggleButton value="1:1">1:1</ToggleButton>
            <ToggleButton value="16:9">16:9</ToggleButton>
            <ToggleButton value="4:3">4:3</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color:
              theme.palette.mode === "dark" ? "grey.300" : "text.secondary",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{
            bgcolor: "#04d1a1",
            "&:hover": { bgcolor: "#03b58b" },
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResizeImageModal;
