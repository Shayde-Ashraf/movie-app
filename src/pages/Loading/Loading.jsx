import React from "react";

export default function Loading() {
  return (
    <>
      <div className="bg-slate-800 min-h-screen min-w-full flex justify-center items-center">
        <div className="lds-ripple text-amber-400 ">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
