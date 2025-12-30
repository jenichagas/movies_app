import loadingCatAnimation from "@/public/loading-cat-animation.json";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div style={{ width: 240, margin: "0 auto", height: "100%" }}>
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}
      >
        <Lottie animationData={loadingCatAnimation} loop={true} />
      </div>
    </div>
  );
}
