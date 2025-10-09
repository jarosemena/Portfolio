import { TextFormatter } from '../components/common/text-formatter';
import config from '../components/common/pharagraph/config.json';


const formatConfig = config.formatting;
const renderingConfig = config.rendering;

describe('TextFormatter (with config.json)', () => {
  let formatter: TextFormatter;

  beforeEach(() => {
    formatter = new TextFormatter(formatConfig);
  });

  it('parses text with only bold formatting', () => {
    const result = formatter.parse('Hello **World**');
    expect(result).toEqual([
      { text: 'Hello ' },
      { text: 'World', format: 'bold' },
    ]);
  });

  it('parses formated text with only bold formatting', () => {
    const result = formatter.parse('Hello **World**');
    const rendered = formatter.renderText(result, renderingConfig);
    //const rendered = ReactDOMServer.renderToString(formatter.renderText(result, renderingConfig));
    
    expect(rendered).toMatch('Hello');
   // expect(rendered).toMatch('World');
    expect(rendered).toMatch('text-slate-200 font-medium');
  });

  it('parses text with bold and highlight formatting', () => {
    const result = formatter.parse('text in --Highlight--');
    expect(result).toEqual([
      { text: 'text in ' },
      { text: 'Highlight', format: 'highlight' },
    ]);
  });

  it('parses formated text with bold and highlight formatting', () => {
    const result = formatter.parse('text in --Highlight--');
    const rendered = formatter.renderText(result, renderingConfig);
    
    expect(rendered).toMatch('text in');
    //expect(rendered).toMatch('Highlight');
    expect(rendered).toMatch(/backgroundColor: '#e0e0e0'/);
  });

  it('parses text with bold and highlight formatting', () => {
    const result = formatter.parse('**Bold** and --Highlight--');
    expect(result).toEqual([
      { text: 'Bold', format: 'bold' },
      { text: ' and ' },
      { text: 'Highlight', format: 'highlight' },
    ]);
  });

  it('parses formated text with bold and highlight formatting', () => {
    const result = formatter.parse('**Bold** and --Highlight--');
    const rendered = formatter.renderText(result, renderingConfig);
    
   // expect(rendered).toMatch('Bold');
    expect(rendered).toMatch(' and ');
    // expect(rendered).toMatch('Highlight');
    expect(rendered).toMatch(/text-slate-200 font-medium/);
    expect(rendered).toMatch(/backgroundColor: '#e0e0e0'/);
  });

  it('parses text with italic formatting', () => {
    const result = formatter.parse('This is _italic_ text');
    expect(result).toEqual([
      { text: 'This is ' },
      { text: 'italic', format: 'italic' },
      { text: ' text' },
    ]);
  });

  it('parses formated text with italic formatting', () => {
    const result = formatter.parse('This is _italic_ text');
    const rendered = formatter.renderText(result, renderingConfig);
    
    expect(rendered).toMatch('This is');
    // expect(rendered).toContain('italic');
    expect(rendered).toMatch(' text');
    expect(rendered).toMatch(/<em>italic<\/em>|createElement\('em'/);
  });

  it('parses plain text without formatting', () => {
    const result = formatter.parse('Just plain text.');
    expect(result).toEqual([{ text: 'Just plain text.' }]);
  });

  it('parses and renders a realistic paragraph', () => {
    const paragraph = 'Experienced **Full Stack Software Developer** with over --8 years-- of experience.';
    const parsed = formatter.parse(paragraph);
    const rendered = formatter.renderText(parsed, renderingConfig);
    
    expect(rendered).toMatch('Experienced');
   // expect(rendered).toContain('Full Stack Software Developer');
   // expect(rendered).toContain('8 years');
    expect(rendered).toMatch('of experience');
    expect(rendered).toMatch(/text-slate-200 font-medium/);
    expect(rendered).toMatch(/backgroundColor: '#e0e0e0'/);
  });
});