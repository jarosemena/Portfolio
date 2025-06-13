
export interface FormatRule {
  symbol: string;
  style: string;
}

export interface FormatConfig {
  [name: string]: FormatRule;
}

export interface ParsedSegment {
  text: string;
  format?: string;
}

export interface RenderingConfig {
  [style: string]: string; // ejemplo: "bold" => '(children) => <span>{children}</span>'
}

export class TextFormatter {
  private sortedSymbols: string[];
  private symbolToStyleMap: Map<string, string>;
  private styleToSymbolMap: Map<string, string>;

  constructor(config: FormatConfig) {
    this.symbolToStyleMap = new Map();
    this.styleToSymbolMap = new Map();

    Object.values(config).forEach(rule => {
      this.symbolToStyleMap.set(rule.symbol, rule.style);
      this.styleToSymbolMap.set(rule.style, rule.symbol);
    });

    this.sortedSymbols = Object.values(config)
      .map(rule => rule.symbol)
      .sort((a, b) => b.length - a.length);
  }

  public parse(text: string): ParsedSegment[] {
    const result: ParsedSegment[] = [];
    let index = 0;

    while (index < text.length) {
      let matched = false;

      for (const symbol of this.sortedSymbols) {
        if (text.startsWith(symbol, index)) {
          const end = this.findClosingSymbol(text, index + symbol.length, symbol);

          if (end !== -1) {
            const innerContent = text.substring(index + symbol.length, end);
            const style = this.symbolToStyleMap.get(symbol);

            result.push({ text: innerContent, format: style });
            index = end + symbol.length;
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        let nextIndex = index + 1;
        while (
          nextIndex < text.length &&
          !this.sortedSymbols.some(s => text.startsWith(s, nextIndex))
        ) {
          nextIndex++;
        }

        const plainText = text.substring(index, nextIndex);
        result.push({ text: plainText });
        index = nextIndex;
      }
    }

    return result;
  }

  private findClosingSymbol(text: string, startIndex: number, symbol: string): number {
    for (let i = startIndex; i <= text.length - symbol.length; i++) {
      if (text.slice(i, i + symbol.length) === symbol) {
        return i;
      }
    }
    return -1;
  }

  
  public renderText(segments: ParsedSegment[], renderingConfig: RenderingConfig): string {
    return segments
      .map(({ text, format }) => {
        if (!format) return text;
        const template = renderingConfig[format];
        return template
          ? template.replace('{children}', text)
          : text;
      })
      .join('');
  }
}
