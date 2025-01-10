import React from "react";
import "./styles.css";
import { Wind } from "lucide-react";

const EmailFooter = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-slate-800 rounded-lg">
      <div className="mr-3 animate-spin">
        <Wind className="text-white" size={24} />
      </div>
      <div>
        <p className="custom-bold text-white">
          <a href="https://dustup.online"> DUSTUP LTD </a>
        </p>
        <p className="custom-font text-sm text-white"> We Take Dust Down.</p>
      </div>
    </div>
  );
};

export default EmailFooter;
