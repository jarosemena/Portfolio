// text-formatter.ts - Lógica de parsing (sin React)
export interface FormatRule {
  symbol: string;
  style: string;
}

export interface FormatConfig {
  [name: string]: FormatRule;
}

export type TextSegment = 
  | { type: 'text'; content: string }
  | { type: 'formatted'; symbol: string; style: string; content: TextSegment[] };

export class TextFormatter {
  private sortedSymbols: string[];
  private symbolToStyleMap: Map<string, string>;

  constructor(config: FormatConfig) {
    // Crear mapeo de símbolos a estilos
    this.symbolToStyleMap = new Map();
    Object.values(config).forEach(rule => {
      this.symbolToStyleMap.set(rule.symbol, rule.style);
    });

    // Ordenar símbolos de mayor a menor longitud
    this.sortedSymbols = Object.values(config)
      .map(rule => rule.symbol)
      .sort((a, b) => b.length - a.length);
  }

  public parse(text: string): TextSegment[] {
    const segments: TextSegment[] = [];
    const regex = this.createFormatRegex();
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // Texto antes del match
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      // Texto formateado
      const [symbol, content] = match;
      const style = this.symbolToStyleMap.get(symbol) || 'unknown';
      
      segments.push({
        type: 'formatted',
        symbol,
        style,
        content: this.parse(content) // Recursión para contenido anidado
      });

      lastIndex = regex.lastIndex;
    }

    // Texto restante
    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    return segments;
  }

  private createFormatRegex(): RegExp {
    const escapedSymbols = this.sortedSymbols
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  
  // Grupo de captura CORRECTO para el contenido interno
  return new RegExp(`(${escapedSymbols})([^]*?)\\1`, 'gs');
  }
}