
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutMe from './aboutme';

// Mock the aboutme data
jest.mock('../../data/aboutme.json', () => ({
  aboutme: {
    title: 'About Me',
    paragraphs: [
      'Experienced **Full Stack Software Developer** with over _8 years_ of experience',
      'Strong background in **API** development',
      'Passionate about _continuous learning_'
    ]
  }
}));

describe('AboutMe Component', () => {
  it('should render the about me section', () => {
    render(<AboutMe />);
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
  });

  it('should display the title', () => {
    render(<AboutMe />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('should render all paragraphs', () => {
    const { container } = render(<AboutMe />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  it('should have correct section id', () => {
    render(<AboutMe />);
    const section = document.getElementById('about');
    expect(section).toHaveAttribute('id', 'about');
  });

  it('should render with correct CSS classes', () => {
    render(<AboutMe />);
    const section = document.getElementById('about');
    expect(section).toHaveClass('scroll-mt-16');
  });

  it('should render paragraphs container', () => {
    const { container } = render(<AboutMe />);
    const spaceDiv = container.querySelector('.space-y-5');
    expect(spaceDiv).toBeInTheDocument();
  });
});
