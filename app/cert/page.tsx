import { permanentRedirect } from "next/navigation";

export default function LegacyCertRootPage() {
  permanentRedirect("/national-certificates");
}
