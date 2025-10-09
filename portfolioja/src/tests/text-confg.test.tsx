import React from 'react';
import { loadConfig, defaultFullConfig } from '.././components/common/text-config';

describe('loadConfig with dynamic function strings', () => {
  it('parses render functions correctly from JSON', async () => {
    const config = await defaultFullConfig();
    const { renderConfig } = loadConfig(config);

    expect(typeof renderConfig.bold).toBe('function');
    const boldOutput = renderConfig.bold('test');
    
    expect(boldOutput.type).toBe('span');
   expect(boldOutput.props).toEqual({
  children: "test",
  className: "text-slate-200 font-medium"
});

    const italicOutput = renderConfig.italic('test');
    
    expect(italicOutput.type).toBe('em');
    expect(italicOutput.props).toEqual( {"children": "test"});
  });
});
