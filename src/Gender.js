import React from "react";
import { Characters } from "./Characters";
import { useParams } from "react-router-dom";

export const Gender = () => {
  const { id } = useParams();
  return <Characters query="gender" value={id} />;
};
