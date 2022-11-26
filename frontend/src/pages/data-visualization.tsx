import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import React from "react";
import { Navbar } from "../components/Navbar";
import "./powerbi-report.css";

interface DataVisualizationProps {}

export const DataVisualization: React.FC<DataVisualizationProps> = ({}) => {
  return (
    <>
      <Navbar />
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: undefined,
          embedUrl: process.env.REACT_APP_POWERBI_URL,
          accessToken: undefined, // Keep as empty string, null or undefined
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
          },
        }}
        cssClassName={"report-style-class"}
      />
    </>
  );
};
