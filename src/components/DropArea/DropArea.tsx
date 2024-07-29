import "./dropArea.scss";
import { useState } from "react";

export default function DropArea({ onDrop }: { onDrop: () => void }) {
  const [showDrop, setShowDrop] = useState<boolean>(false);
  return (
    <section
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragEnter={() => {
        setShowDrop(true);
      }}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      className={[showDrop ? "dropArea" : "hide_drop"].join(" ")}
    >
      Drop here
    </section>
  );
}
