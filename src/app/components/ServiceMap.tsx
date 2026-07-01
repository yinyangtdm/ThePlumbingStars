"use client";

import dynamic from "next/dynamic";

export default dynamic(() => import("./ServiceMapClient"), { ssr: false });
