import { InfoIcon } from "lucide-react";
import React from "react";

function Empty(props: { icon?: React.ReactNode; text?: string }) {
  const { icon, text } = props;
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-1 text-zinc-500">
      {icon || <InfoIcon size={16} />}
      <p className="text-xs">{text || "No data"}</p>
    </div>
  );
}

export default Empty;
