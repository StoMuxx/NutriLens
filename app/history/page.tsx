"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { HistoryList } from "@/components/HistoryList";
import { deleteSavedMealRecord, getSavedMeals } from "@/lib/storage";
import type { SavedMealRecord } from "@/types/meal";

export default function HistoryPage() {
  const { copy } = useLanguage();
  const [records, setRecords] = useState<SavedMealRecord[]>([]);

  useEffect(() => {
    setRecords(getSavedMeals());
  }, []);

  function handleDelete(id: string) {
    setRecords(deleteSavedMealRecord(id));
  }

  return (
    <>
      <PageHeader
        description={copy.history.description}
        eyebrow={copy.history.eyebrow}
        title={copy.history.title}
      />
      <div className="page-shell py-8">
        <HistoryList onDelete={handleDelete} records={records} />
      </div>
    </>
  );
}
