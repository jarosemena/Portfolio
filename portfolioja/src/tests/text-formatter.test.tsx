import { TextFormatter } from '.././components/common/pharagraph/text-formatter';
import config from '.././components/common/pharagraph/config.json'; // Asegúrate de que jest esté configurado para importar JSON


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
    expect(rendered).toBe(
      'Hello (children) => <span className="text-slate-200 font-medium">World </span>'
    );
  });

  it('parses text with bold and highlight formatting', () => {
    const result = formatter.parse('text in --Highlight--');
    expect(result).toEqual([
      { text: 'text in ' },
      { text: 'Highlight', format: 'highlight' },
    ]);
  });

  it('parses formated text  with bold and highlight formatting', () => {
    const result = formatter.parse('text in --Highlight--');
    const rendered = formatter.renderText(result, renderingConfig);
    expect(rendered).toBe(
      'text in (children) => <span style={{ backgroundColor: \'#ff0\' }}>Highlight</span>'
    );
  });

  it('parses text with bold and highlight formatting', () => {
    const result = formatter.parse('**Bold** and --Highlight--');
    expect(result).toEqual([
      { text: 'Bold', format: 'bold' },
      { text: ' and ' },
      { text: 'Highlight', format: 'highlight' },
    ]);
  });

  it('parses formated text  with bold and highlight formatting', () => {
    const result = formatter.parse('**Bold** and --Highlight--');
    const rendered = formatter.renderText(result, renderingConfig);
    expect(rendered).toBe(
      '(children) => <span className="text-slate-200 font-medium">Bold </span> and (children) => <span style={{ backgroundColor: \'#ff0\' }}>Highlight</span>'
    );
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
    expect(rendered).toBe(
      'This is (children) => React.createElement('em', null, children) >italic</em> text'
    );

  });

  it('parses plain text without formatting', () => {
    const result = formatter.parse('Just plain text.');
    expect(result).toEqual([{ text: 'Just plain text.' }]);
  });



  it('parses and renders a realistic paragraph', () => {
    const paragraph = 'Experienced **Full Stack Software Developer** with over --8 years-- of experience.';
    const parsed = formatter.parse(paragraph);
    const rendered = formatter.renderText(parsed, renderingConfig);
    expect(rendered).toBe(
      'Experienced (children) => <span className="text-slate-200 font-medium">Full Stack Software Developer </span> with over (children) => <span style={{ backgroundColor: \'#ff0\' }}>8 years</span> of experience.'
    );
  });
});
