"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface UploadCardProps {
  onImageReady: (dataUrl: string, fileName: string) => void;
  imageDataUrl?: string;
}

const MAX_IMAGE_EDGE = 900;

async function fileToCompressedDataUrl(file: File): Promise<string> {
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read this image."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Unable to load this image."));
    img.src = rawDataUrl;
  });

  const scale = Math.min(
    1,
    MAX_IMAGE_EDGE / Math.max(image.width, image.height)
  );
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  if (!context) {
    return rawDataUrl;
  }

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.78);
}

export function UploadCard({ onImageReady, imageDataUrl }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { copy } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file?: File) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(copy.upload.invalidFile);
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      const dataUrl = await fileToCompressedDataUrl(file);
      onImageReady(dataUrl, file.name);
    } catch {
      setError(copy.upload.readError);
    } finally {
      setIsLoading(false);
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    void handleFile(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="rounded-lg border border-leaf-100 bg-white p-4 shadow-soft md:p-6">
      <div
        className={`flex min-h-80 flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition ${
          isDragging
            ? "border-leaf-500 bg-leaf-50"
            : "border-leaf-200 bg-gradient-to-b from-white to-leaf-50/70"
        }`}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={onDrop}
      >
        {imageDataUrl ? (
          <div className="w-full">
            <img
              alt="Uploaded meal preview"
              className="mx-auto max-h-80 rounded-lg object-contain shadow-soft"
              src={imageDataUrl}
            />
            <button
              className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-white px-4 py-2 text-sm font-bold text-leaf-800 hover:bg-leaf-50"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              <ImagePlus aria-hidden className="h-4 w-4" />
              {copy.common.replacePhoto}
            </button>
          </div>
        ) : (
          <div className="max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-leaf-600 text-white shadow-soft">
              {isLoading ? (
                <Loader2 aria-hidden className="h-7 w-7 animate-spin" />
              ) : (
                <UploadCloud aria-hidden className="h-7 w-7" />
              )}
            </div>
            <h2 className="text-balance mt-5 text-xl font-bold leading-tight text-slate-950">
              {copy.upload.cardTitle}
            </h2>
            <p className="text-pretty mt-3 text-sm leading-7 text-slate-600">
              {copy.upload.instruction}
            </p>
            <button
              className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white hover:bg-leaf-700"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              <ImagePlus aria-hidden className="h-5 w-5" />
              {copy.common.choosePhoto}
            </button>
          </div>
        )}
      </div>

      <input
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
        ref={inputRef}
        type="file"
      />

      {error ? (
        <p className="mt-3 rounded-lg bg-berry-100 px-4 py-3 text-sm font-semibold text-berry-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
