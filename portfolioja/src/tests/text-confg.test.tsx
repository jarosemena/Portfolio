import React from 'react';
import { loadConfig, defaultFullConfig } from '.././components/common/pharagraph/text-confg';

describe('loadConfig with dynamic function strings', () => {
  it('parses render functions correctly from JSON', async () => {
    const config = await defaultFullConfig();
    const { renderConfig } = loadConfig(config);

    expect(typeof renderConfig.bold).toBe('function');
    const boldOutput = renderConfig.bold('test');
    expect(boldOutput.type).toBe('span');
    expect(boldOutput.props.className).toContain('text-slate-200');

    const italicOutput = renderConfig.italic('test');
    expect(italicOutput.type).toBe('em');
    expect(italicOutput.props.children).toBe('test');
  });
});
