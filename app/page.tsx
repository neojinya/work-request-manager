"use client";

import { useEffect, useState } from "react";

type RequestItem = {
  id: string;
  title: string;
  client: string;
  memo: string;
};

export default function Home() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
  const savedItems = localStorage.getItem("work-requests");

  if (savedItems) {
    setItems(JSON.parse(savedItems));
  }
}, []);

useEffect(() => {
  localStorage.setItem("work-requests", JSON.stringify(items));
}, [items]);

  const addItem = () => {
    if (!title || !client) return;

    setItems([
      {
        id: crypto.randomUUID(),
        title,
        client,
        memo,
      },
      ...items,
    ]);

    setTitle("");
    setClient("");
    setMemo("");
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Work Request Manager</h1>
        <p className="mb-6 text-gray-600">
          案件依頼を登録・管理するミニダッシュボード
        </p>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">依頼を追加</h2>

          <div className="space-y-3">
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="依頼タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="クライアント名"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />

            <textarea
              className="w-full rounded-lg border px-3 py-2"
              placeholder="メモ"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />

            <button
              onClick={addItem}
              className="rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white"
            >
              追加する
            </button>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">依頼一覧：{items.length}件</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl border p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.client}</p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="rounded border px-3 py-1 text-sm"
                  >
                    削除
                  </button>
                </div>

                {item.memo && <p className="text-sm text-gray-700">{item.memo}</p>}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}