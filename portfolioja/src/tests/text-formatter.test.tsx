import { TextFormatter, ParsedSegment } from '.././components/common/pharagraph/text-formatter';
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

  it('parses text with bold and highlight formatting', () => {
    const result = formatter.parse('**Bold** and --Highlight--');
    expect(result).toEqual([
      { text: 'Bold', format: 'bold' },
      { text: ' and ' },
      { text: 'Highlight', format: 'highlight' },
    ]);
  });

  it('parses text with italic formatting', () => {
    const result = formatter.parse('This is _italic_ text');
    expect(result).toEqual([
      { text: 'This is ' },
      { text: 'italic', format: 'italic' },
      { text: ' text' },
    ]);
  });

  it('parses plain text without formatting', () => {
    const result = formatter.parse('Just plain text.');
    expect(result).toEqual([{ text: 'Just plain text.' }]);
  });

  it('renders formatted segments correctly', () => {
    const parsed: ParsedSegment[] = [
      { text: 'Bold', format: 'bold' },
      { text: ' and ' },
      { text: 'highlighted', format: 'highlight' },
    ];
    const rendered = formatter.renderText(parsed, renderingConfig);
    expect(rendered).toBe(
      '<span className="text-slate-200 font-medium">Bold </span> and <span style={{ backgroundColor: \'#ff0\' }}>highlighted</span>'
    );
  });

  it('parses and renders a realistic paragraph', () => {
    const paragraph = 'Experienced **Full Stack Software Developer** with over --8 years-- of experience.';
    const parsed = formatter.parse(paragraph);
    const rendered = formatter.renderText(parsed, renderingConfig);
    expect(rendered).toBe(
      'Experienced <span className="text-slate-200 font-medium">Full Stack Software Developer </span> with over <span style={{ backgroundColor: \'#ff0\' }}>8 years</span> of experience.'
    );
  });
});
