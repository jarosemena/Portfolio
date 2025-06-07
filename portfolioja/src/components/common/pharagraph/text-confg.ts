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

// Cargar configuración desde JSON (async)
export const loadConfig = (config: FullConfig) => {
  const renderFunctions: Record<string, (children: React.ReactNode) => React.ReactElement> = {};

  Object.entries(config.rendering).forEach(([style, funcString]) => {
    try {
      const dynamicFunction = new Function('children', `return (${funcString})(children)`);
      renderFunctions[style] = (children: React.ReactNode) => {
        try {
          return dynamicFunction(children);
        } catch (innerError) {
          console.error(`Error ejecutando función para ${style}:`, innerError);
          return  React.createElement('span', null, children);
        }
      };
    } catch (error) {
      console.error(`Error analizando función para ${style}:`, error);
      renderFunctions[style] = (children) => React.createElement('span', null, children);
    }
  });

  return {
    formatConfig: config.formatting,
    renderConfig: renderFunctions,
  };
};

// Configuración por defecto ahora cargada dinámicamente
export const defaultFullConfig = async (): Promise<FullConfig> => {
  const config = await import('./config.json');
  return config.default || config; // Soporte para export default
};