import React from 'react';
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
    render(<AboutMe />);
    expect(screen.getByText(/Experienced/)).toBeInTheDocument();
    expect(screen.getByText(/Strong background/)).toBeInTheDocument();
    expect(screen.getByText(/Passionate about/)).toBeInTheDocument();
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

  it('should render paragraphs with Paragraph component', () => {
    const { container } = render(<AboutMe />);
    const paragraphs = container.querySelectorAll('.text-slate-400');
    expect(paragraphs.length).toBe(3);
  });
});
