import { Typography } from "@mui/material";
import React from "react";

const TitleDehyariPanel = () => {
  return (
    <Typography display={"flex"} variant={"h5"} mb={5} gap={1}>
      <span>فهرست</span>
      <span className={"text-error font-bold relative inline-block"}>
        پرسنل
        <img
          src="/images/icons/Line-2.png"
          alt="زیرخط"
          style={{
            display: "block",
            margin: "0 auto",
            width: "100%",
            height: "4px",
            position: "absolute",
            bottom: "-2px",
            objectFit: "contain",
          }}
        />
      </span>
      <span>دهیاری ها</span>
    </Typography>
  );
};

export default TitleDehyariPanel;
