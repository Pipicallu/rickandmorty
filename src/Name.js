import React from "react";
import { Characters } from "./Characters";
import { useParams } from "react-router-dom";

export const Name = () => {
  const { id } = useParams();
  return <Characters query={"name"} value={id} />;
};
