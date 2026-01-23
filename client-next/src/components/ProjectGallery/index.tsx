"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import { ProjectGalleryProps } from "./types";
import type { Media } from "@/actions/projects";

export default function ProjectGallery({ media, title }: ProjectGalleryProps) {
  const gallery = media?.slice(1) ?? [];
  const [activeMedia, setActiveMedia] = useState<Media | null>(null);

  if (gallery.length === 0) return null;

  return (
    <>
      <section className="mt-16 mb-6">
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveMedia(item)}
              className="rounded-xl overflow-hidden bg-gray-100 shadow focus:outline-none"
            >
              {item.type === "image" ? (
                <Image
                  src={resolveMediaUrl(item.url)}
                  alt={item.alt || title}
                  width={800}
                  height={600}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative">
                  <video
                    src={resolveMediaUrl(item.url)}
                    muted
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                    ▶
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {activeMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {activeMedia.type === "image" ? (
              <img
                src={resolveMediaUrl(activeMedia.url)}
                alt={activeMedia.alt || title}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={resolveMediaUrl(activeMedia.url)}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
