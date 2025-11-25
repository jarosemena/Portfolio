import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './projects';

// Mock IntersectionObserver for LazyLoad
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock the projects data
jest.mock('../../data/projects.json', () => ({
  projects: [
    {
      id: '1',
      name: 'Test Project 1',
      description: 'A test project with URL',
      imageUrl: '/images/projects/test1.jpg',
      projectUrl: 'https://example.com/project1',
      technologies: [{ name: 'React' }, { name: 'TypeScript' }],
      year: '2023',
      featured: true
    },
    {
      id: '2',
      name: 'Test Project 2',
      description: 'A test project without URL',
      imageUrl: '/images/projects/test2.jpg',
      technologies: [{ name: 'Node.js' }],
      year: '2022',
      featured: false
    },
    {
      id: '3',
      name: 'Test Project 3',
      description: 'A test project with empty technologies',
      imageUrl: '/images/projects/test3.jpg',
      projectUrl: 'https://example.com/project3',
      technologies: [],
      year: '2024'
    }
  ]
}));

describe('Projects Component - Property-Based Tests', () => {
  /**
   * **Feature: projects-section, Property 2: Image lazy loading consistency**
   * **Validates: Requirements 1.4**
   * 
   * For any project with a valid imageUrl, the LazyLoad component should be used
   * to defer image loading until the image is near the viewport, maintaining
   * consistent behavior with other sections.
   */
  it('Property 2: Image lazy loading consistency - all project images use LazyLoad', () => {
    const { container } = render(<Projects />);

    // Check that LazyLoad wrapper is used for all project cards
    const lazyLoadWrappers = container.querySelectorAll('.lazy-load');
    const projectCards = container.querySelectorAll('.project-card');

    // Each project card should be wrapped in a LazyLoad component
    expect(lazyLoadWrappers.length).toBe(projectCards.length);
    expect(lazyLoadWrappers.length).toBeGreaterThan(0);

    // All images should have lazy loading attribute
    const images = container.querySelectorAll('.project-image');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  /**
   * **Feature: projects-section, Property 3: Click interaction for projects with URLs**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * For any project card, if projectUrl is defined and non-empty, clicking the card
   * should open the URL in a new tab; if projectUrl is undefined or empty, clicking
   * should have no effect.
   */
  it('Property 3: Click interaction for projects with URLs', () => {
    // Mock window.open
    const originalOpen = window.open;
    window.open = jest.fn();

    const { container } = render(<Projects />);
    const projectCards = container.querySelectorAll('.project-card');

    // Test project with URL (Test Project 1)
    const cardWithUrl = projectCards[0];
    expect(cardWithUrl).toHaveClass('clickable');
    expect(cardWithUrl).toHaveAttribute('role', 'button');
    expect(cardWithUrl).toHaveAttribute('tabIndex', '0');
    
    fireEvent.click(cardWithUrl);
    expect(window.open).toHaveBeenCalledWith(
      'https://example.com/project1',
      '_blank',
      'noopener,noreferrer'
    );

    // Test project without URL (Test Project 2)
    const cardWithoutUrl = projectCards[1];
    expect(cardWithoutUrl).not.toHaveClass('clickable');
    expect(cardWithoutUrl).not.toHaveAttribute('role');
    expect(cardWithoutUrl).not.toHaveAttribute('tabIndex');

    // Clear previous calls
    (window.open as jest.Mock).mockClear();
    
    fireEvent.click(cardWithoutUrl);
    expect(window.open).not.toHaveBeenCalled();

    // Restore window.open
    window.open = originalOpen;
  });

  /**
   * **Feature: projects-section, Property 4: Image error handling**
   * **Validates: Requirements 1.5**
   * 
   * For any project image that fails to load, the system should display a placeholder
   * with the first character of the project name without breaking the layout or
   * throwing errors.
   */
  it('Property 4: Image error handling', async () => {
    const { container } = render(<Projects />);
    const images = container.querySelectorAll('.project-image');

    // Simulate image error on first image
    const firstImage = images[0] as HTMLImageElement;
    fireEvent.error(firstImage);

    // Wait for the error handler to update the state
    await waitFor(() => {
      const placeholder = container.querySelector('.image-placeholder');
      expect(placeholder).toBeInTheDocument();
      expect(placeholder?.textContent).toBe('T'); // First letter of "Test Project 1"
    });

    // Verify the image is no longer displayed
    const updatedImages = container.querySelectorAll('.project-image');
    expect(updatedImages.length).toBe(images.length - 1);

    // Verify layout is not broken - card should still exist
    const projectCards = container.querySelectorAll('.project-card');
    expect(projectCards.length).toBe(3);
  });

  /**
   * **Feature: projects-section, Property 7: Hover state for clickable cards**
   * **Validates: Requirements 2.2, 2.4**
   * 
   * For any project card with a defined projectUrl, hovering should apply visual
   * feedback (transform, shadow, cursor change); cards without projectUrl should
   * not show hover effects.
   */
  it('Property 7: Hover state for clickable cards', () => {
    const { container } = render(<Projects />);
    const projectCards = container.querySelectorAll('.project-card');

    // Test card with URL (Test Project 1)
    const cardWithUrl = projectCards[0] as HTMLElement;
    expect(cardWithUrl).toHaveClass('clickable');
    
    // Verify the clickable class is applied which triggers the CSS hover effects
    expect(cardWithUrl.classList.contains('clickable')).toBe(true);

    // Test card without URL (Test Project 2)
    const cardWithoutUrl = projectCards[1] as HTMLElement;
    expect(cardWithoutUrl).not.toHaveClass('clickable');
    
    // Verify the card without URL doesn't have clickable class
    expect(cardWithoutUrl.classList.contains('clickable')).toBe(false);

    // Test third card with URL (Test Project 3)
    const thirdCardWithUrl = projectCards[2] as HTMLElement;
    expect(thirdCardWithUrl).toHaveClass('clickable');
  });
});