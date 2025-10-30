import React, { useEffect, useState } from 'react';
import { TextFormatter, ParsedSegment } from '../text-formatter';
import {  loadConfig, defaultFullConfig } from '../text-config';

interface ParagraphProps {
  text: string;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ text, className = '' }) => {
  const [segments, setSegments] = useState<ParsedSegment[]>([]);
  const [renderConfig, setRenderConfig] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const config = await defaultFullConfig();
      const { formatConfig, renderConfig } = loadConfig(config);
      const formatter = new TextFormatter(formatConfig);
      const parsed = formatter.parse(text);
      setSegments(parsed);
      setRenderConfig(renderConfig);
    };
    init();
  }, [text]);

  if (!renderConfig) return null;

  return (
    <p className={className}>
      {segments.map((seg, idx) => {
        const key = `seg-${idx}`;
        //const Renderer = renderConfig[seg.format];
        const Renderer = seg.format ? renderConfig[seg.format] : undefined;
        return Renderer ? (
          React.cloneElement(Renderer(seg.text), { key })
        ) : (
          <React.Fragment key={key}>{seg.text}</React.Fragment>
        );
      })}
    </p>
  );
};
