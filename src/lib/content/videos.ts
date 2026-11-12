/** Content type "videos": the school's YouTube library. */
export type VideoCat = "ecole" | "events" | "temoignages" | "ib";

export type SchoolVideo = {
  /** YouTube video id. */
  id: string;
  kind: "short" | "long";
  cat: VideoCat;
  title: string;
  thumb: string;
};

/**
 * Extracts the YouTube id from a full link (watch, youtu.be, shorts, embed, live).
 * A bare id is returned as is, so older content keeps working.
 */
export function youtubeId(ref: string): string {
  const value = ref.trim();
  if (!/^https?:\/\//i.test(value)) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^(www|m|music)\./, "");
    if (host === "youtu.be") return url.pathname.split("/")[1] ?? "";
    if (host !== "youtube.com" && host !== "youtube-nocookie.com") return "";
    const fromPath = url.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/]+)/);
    return fromPath ? fromPath[1] : (url.searchParams.get("v") ?? "");
  } catch {
    return "";
  }
}
