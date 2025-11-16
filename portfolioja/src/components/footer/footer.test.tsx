import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer';

describe('Footer', () => {
  it('should render the footer component', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display the name', () => {
    render(<Footer />);
    expect(screen.getByText('Jair Arosemena')).toBeInTheDocument();
  });

  it('should display the description', () => {
    render(<Footer />);
    expect(screen.getByText(/Experienced Full Stack Developer/)).toBeInTheDocument();
    expect(screen.getByText(/Specialized in .NET Core, React, and Cloud Architecture/)).toBeInTheDocument();
  });

  it('should render GitHub link with correct attributes', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jarosemena');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render LinkedIn link with correct attributes', () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jose-arosemena-72010824/?locale=en_US');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render Quick Links section', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'About Me' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
  });

  it('should render Contact section', () => {
    render(<Footer />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should display email address', () => {
    render(<Footer />);
    expect(screen.getByText('jjarosemena@gmail.com')).toBeInTheDocument();
  });

  it('should display location', () => {
    render(<Footer />);
    expect(screen.getByText('Panama City, Panama')).toBeInTheDocument();
  });

  it('should display current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Jair Arosemena. All rights reserved.`)).toBeInTheDocument();
  });

  it('should render social icons', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');
    const githubLink = socialLinks.find(link => link.getAttribute('href')?.includes('github'));
    const linkedinLink = socialLinks.find(link => link.getAttribute('href')?.includes('linkedin'));
    
    expect(githubLink?.querySelector('svg')).toBeInTheDocument();
    expect(linkedinLink?.querySelector('svg')).toBeInTheDocument();
  });

  it('should render contact icons', () => {
    render(<Footer />);
    const svgs = screen.getByRole('contentinfo').querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should have correct CSS classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });
});
