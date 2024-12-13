"use client";

import { configureDayjs } from "@/config/dayjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DayjsConfig() {
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    configureDayjs(locale);
  }, [locale]);

  return null;
}
