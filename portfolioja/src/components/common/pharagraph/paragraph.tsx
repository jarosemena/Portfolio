// paragraph.tsx - Componente principal
import React, { useMemo } from 'react';
import { TextFormatter, TextSegment } from './text-formatter';
import { FullConfig, loadConfig, defaultFullConfig } from './text-confg';

interface ParagraphProps {
  text: string;
  config?: FullConfig;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ 
  text, 
  config = defaultFullConfig,
  className = ""
}) => {
  // Cargar y procesar configuración
  const { formatConfig, renderConfig } = useMemo(() => loadConfig(config), [config]);
  
  // Crear formateador
  const formatter = useMemo(() => new TextFormatter(formatConfig), [formatConfig]);
  
  // Parsear texto
  const segments = useMemo(() => formatter.parse(text), [text, formatter]);
  
  // Función recursiva de renderizado
  const renderSegments = (segments: TextSegment[], keyPrefix: string): React.ReactNode[] => {
    return segments.map((segment, index) => {
      const key = `${keyPrefix}-${index}`;
      
      if (segment.type === 'text') {
        return <span key={key}>{segment.content}</span>;
      }
      
      // Segmento formateado
      const renderFunction = renderConfig[segment.style];
      const children = renderSegments(segment.content, key);
      
      if (renderFunction) {
        return React.cloneElement(
          renderFunction(children),
          { key }
        );
      }
      
      // Estilo no reconocido - mostrar como texto plano
      return (
        <span key={key}>
          {segment.symbol}{children}{segment.symbol}
        </span>
      );
    });
  };

  return (
    <p className={className}>
      {renderSegments(segments, 'para')}
    </p>
  );
};