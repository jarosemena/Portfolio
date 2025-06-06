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

      // El contenido interno está en el grupo 1
      const innerContent = match[1];
      // Encontramos el símbolo usado (coincide con el primer símbolo encontrado)
      const symbol = this.findMatchingSymbol(match[0]);
      
      const style = this.symbolToStyleMap.get(symbol) || 'unknown';
      
      segments.push({
        type: 'formatted',
        symbol,
        style,
        content: this.parse(innerContent)
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
    
    return new RegExp(`(?:${escapedSymbols})([^]*?)(?:${escapedSymbols})`, 'gs');
  }

  private findMatchingSymbol(fullMatch: string): string {
    // Buscamos cuál de los símbolos coincide al inicio del match
    for (const symbol of this.sortedSymbols) {
      if (fullMatch.startsWith(symbol)) {
        return symbol;
      }
    }
    return fullMatch.slice(0, this.sortedSymbols[0]?.length || 1);
  }
}