"use client";

import { submission } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DownloadButton({
  submission,
}: {
  submission: submission;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionId: submission.id }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        a.download = submission.file || "submission";

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Download failed");
        alert("Failed to download the file. Please try again.");
      }
    } catch (error) {
      console.error("Error during download:", error);
      alert("An error occurred while downloading the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "Downloading..." : "Download"}
    </Button>
  );
}
