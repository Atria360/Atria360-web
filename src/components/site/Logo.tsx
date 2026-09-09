import type { SiteSettings } from "@/lib/types";

// The brand PNGs are square canvases with the lockup centred inside, so the
// artwork only fills part of the frame. Rendering them at the intended height
// would leave the visible logo about a third of that size, floating in
// whitespace. Instead we oversize the image and clip the empty margins with a
// fixed-height box, so `height` below is the height of the VISIBLE logo.
//
// ART_RATIO is the fraction of the square actually occupied by artwork. Tune
// this single number if the source files are ever re-exported with different
// padding (or set it to 1 once they are trimmed to their bounding box).
const ART_RATIO = 0.34;

export default function Logo({
  settings,
  height,
  variant = "light",
  className = "",
}: {
  settings: SiteSettings;
  /** Height of the visible logo artwork in px. */
  height: number;
  /** "dark" picks the reversed lockup for dark backgrounds. */
  variant?: "light" | "dark";
  className?: string;
}) {
  const src =
    variant === "dark" ? settings.logo_url_dark || settings.logo_url : settings.logo_url;

  if (!src) {
    return (
      <span
        className={`font-header font-extrabold ${
          variant === "dark" ? "text-white" : "text-primary"
        } ${className}`}
        style={{ fontSize: height * 0.8 }}
      >
        {settings.site_name}
      </span>
    );
  }

  const frame = Math.round(height / ART_RATIO);

  return (
    <span
      className={`flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{ height, width: frame }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${settings.site_name} logo`}
        style={{ height: frame, maxWidth: "none" }}
        className="w-auto"
      />
    </span>
  );
}
