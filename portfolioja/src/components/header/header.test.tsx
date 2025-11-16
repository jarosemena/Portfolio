import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustumHeader from './header';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

describe('CustumHeader', () => {
  beforeEach(() => {
    // Create mock sections in the document
    ['about', 'experience', 'skills', 'projects', 'contact'].forEach(id => {
      const section = document.createElement('div');
      section.id = id;
      document.body.appendChild(section);
    });
  });

  afterEach(() => {
    // Clean up mock sections
    document.body.innerHTML = '';
  });

  it('should render the header component', () => {
    render(<CustumHeader />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should display the name', () => {
    render(<CustumHeader />);
    expect(screen.getByText('Jose Jair Arosemena')).toBeInTheDocument();
  });

  it('should display the title', () => {
    render(<CustumHeader />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });

  it('should render GitHub link with correct attributes', () => {
    render(<CustumHeader />);
    const links = screen.getAllByRole('link');
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/jarosemena');
    
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render LinkedIn link with correct attributes', () => {
    render(<CustumHeader />);
    const links = screen.getAllByRole('link');
    const linkedinLink = links.find(link => link.getAttribute('href')?.includes('linkedin'));
    
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render all navigation links', () => {
    render(<CustumHeader />);
    
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /Experience/i })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: /Skills/i })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: /Projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '#contact');
  });

  it('should render navigation with correct structure', () => {
    render(<CustumHeader />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const list = nav.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(5);
  });

  it('should have active class on about section by default', () => {
    render(<CustumHeader />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const listItem = aboutLink.closest('li');
    expect(listItem).toHaveClass('active');
  });

  it('should render social icons', () => {
    render(<CustumHeader />);
    const header = screen.getByRole('banner');
    const svgs = header.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should setup IntersectionObserver on mount', () => {
    const observeSpy = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: observeSpy,
      disconnect: jest.fn(),
      unobserve: jest.fn()
    })) as any;
    
    render(<CustumHeader />);
    expect(observeSpy).toHaveBeenCalled();
  });

  it('should disconnect IntersectionObserver on unmount', () => {
    const disconnectSpy = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: disconnectSpy,
      unobserve: jest.fn()
    })) as any;
    
    const { unmount } = render(<CustumHeader />);
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should observe all section elements', () => {
    const observeSpy = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: observeSpy,
      disconnect: jest.fn(),
      unobserve: jest.fn()
    })) as any;
    
    render(<CustumHeader />);
    expect(observeSpy).toHaveBeenCalledTimes(5);
  });

  it('should have correct CSS classes', () => {
    render(<CustumHeader />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header-container');
  });

  it('should render user info section', () => {
    render(<CustumHeader />);
    const header = screen.getByRole('banner');
    const userInfo = header.querySelector('.user-info');
    expect(userInfo).toBeInTheDocument();
  });

  it('should render social links section', () => {
    render(<CustumHeader />);
    const header = screen.getByRole('banner');
    const socialLinks = header.querySelector('.social-links');
    expect(socialLinks).toBeInTheDocument();
  });
});
