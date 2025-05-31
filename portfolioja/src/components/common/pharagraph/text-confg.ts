// text-config.ts - Cargador de configuración
import React from 'react';

// Tipos para la configuración
export interface FormatRule {
  symbol: string;
  style: string;
}

export interface FormatConfig {
  [name: string]: FormatRule;
}

export interface RenderConfig {
  [style: string]: string; // Código de función como string
}

export interface FullConfig {
  formatting: FormatConfig;
  rendering: RenderConfig;
}

// Cargar configuración desde JSON
export const loadConfig = (config: FullConfig) => {
  // Convertir strings de funciones a funciones ejecutables
  const renderFunctions: Record<string, (children: React.ReactNode) => React.ReactElement> = {};

  Object.entries(config.rendering).forEach(([style, funcString]) => {
    try {
      const dynamicFunction = new Function('children', `return ${funcString}`);
      // Usar Function para convertir el string a función
      renderFunctions[style] = (children: React.ReactNode) => {
        try {
          const result = dynamicFunction(children);
          
            // Verificar si es un elemento React válido
            if (React.isValidElement(result)) {
                return result;
            }
            
            // Si no es válido, devolver children en un fragmento
            return React.createElement(React.Fragment, null, children);
          
            } catch (innerError) {
            console.error(`Error ejecutando función para ${style}:`, innerError);
            return React.createElement(React.Fragment, null, children);
            }
        }
   
    } catch (error) {
        console.error(`Error analizando función para ${style}:`, error);
        renderFunctions[style] = (children) => React.createElement(React.Fragment, null, children);
    }
});

  return {
    formatConfig: config.formatting,
    renderConfig: renderFunctions
  };
};

// Configuración por defecto embebida
export const defaultFullConfig: FullConfig = {
  formatting: {
    bold: { symbol: '**', style: 'bold' },
    italic: { symbol: '_', style: 'italic' },
    underline: { symbol: '++', style: 'underline' }
  },
  rendering: {
    bold: "(children) => <strong>{children}</strong>",
    italic: "(children) => <em>{children}</em>",
    underline: "(children) => <u>{children}</u>"
  }
};