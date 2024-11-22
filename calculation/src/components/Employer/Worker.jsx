import React, { useEffect } from "react";
import { useParams } from "react-router";

export default function Worker() {
  console.log(useParams());

  return <div>Worker # 1</div>;
}
