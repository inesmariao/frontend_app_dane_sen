"use client";

import React, { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function StyledComponentsRegistry({ children }: Props) {
  const [sheet] = useState(() => new ServerStyleSheet());

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={sheet.instance}>
      <>
        {children}
        <style
          dangerouslySetInnerHTML={{ __html: sheet.getStyleTags() }}
        />
      </>
    </StyleSheetManager>
  );
}
