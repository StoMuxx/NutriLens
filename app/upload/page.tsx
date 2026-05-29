"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { UploadCard } from "@/components/UploadCard";
import { getMealDraft, saveMealDraft } from "@/lib/storage";

export default function UploadPage() {
  const router = useRouter();
  const { copy } = useLanguage();
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const draft = getMealDraft();
    if (draft?.imageDataUrl) {
      setImageDataUrl(draft.imageDataUrl);
      setImageName(draft.imageName ?? "");
    }
  }, []);

  function handleImageReady(dataUrl: string, fileName: string) {
    setImageDataUrl(dataUrl);
    setImageName(fileName);
    setWarning("");
    saveMealDraft({
      imageDataUrl: dataUrl,
      imageName: fileName,
      uploadedAt: new Date().toISOString()
    });
  }

  function continueToPreferences() {
    if (!imageDataUrl) {
      setWarning(copy.upload.noImageWarning);
      return;
    }

    saveMealDraft({
      ...getMealDraft(),
      imageDataUrl,
      imageName,
      uploadedAt: new Date().toISOString()
    });
    router.push("/preferences");
  }

  return (
    <>
      <PageHeader
        backHref="/"
        description={copy.upload.description}
        eyebrow={copy.upload.eyebrow}
        title={copy.upload.title}
      />

      <div className="page-shell space-y-5 py-8">
        <UploadCard imageDataUrl={imageDataUrl} onImageReady={handleImageReady} />

        {warning ? (
          <p className="rounded-lg bg-citrus-100 px-4 py-3 text-sm font-semibold text-citrus-500">
            {warning}
          </p>
        ) : null}

        <button
          className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-leaf-600 px-6 py-3 text-base font-bold text-white shadow-soft hover:bg-leaf-700 md:w-auto"
          onClick={continueToPreferences}
          type="button"
        >
          {copy.common.continue}
          <ArrowRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
