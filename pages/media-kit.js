import React from "react";
import ContainerBlock from "@components/ContainerBlock";
import MediaKit from "@components/MediaKit";

export default function MediaKitPage() {
  // ponytail: shared by link only (noindex, not in nav or sitemap); drop noIndex to make it discoverable
  return (
    <ContainerBlock
      title="Media Kit - Naveen Chatlapalli"
      description="Creator media kit for Naveen Chatlapalli: audience, engagement, content formats, and campaign details."
      noIndex
    >
      <MediaKit />
    </ContainerBlock>
  );
}
