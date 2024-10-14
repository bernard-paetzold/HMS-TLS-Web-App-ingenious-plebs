"use client";

import { useState } from "react";
import { Module } from "../types";
import UpdateModuleCard from "./update-module-card";
import DeleteModuleCard from "./delete-module-card";

export default function EditModuleForm({ code }: Module) {
  const [optimisticCode, setOptimisticCode] = useState(code);

  return (
    <div className="flex flex-col gap-4">
      <UpdateModuleCard code={optimisticCode} setCode={setOptimisticCode} />
      <DeleteModuleCard code={optimisticCode} />
    </div>
  );
}
