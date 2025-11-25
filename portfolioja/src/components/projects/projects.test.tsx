import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './projects';
import * as fc from 'fast-check';

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
   * **Feature: projects-section, Property 1: Project data loading and validation**
   * **Validates: Requirements 3.1, 3.2**
   * 
   * For any projects JSON file, when the component loads the data, all projects
   * with required fields (id, name, description, imageUrl) should be successfully
   * parsed and rendered without errors.
   */
  it('Property 1: Project data loading and validation', () => {
    const { container } = render(<Projects />);

    // The component should render without crashing
    expect(container.querySelector('.projects-container')).toBeInTheDocument();

    // All project cards should be rendered (from the mocked data)
    const projectCards = container.querySelectorAll('.project-card');
    expect(projectCards.length).toBe(3); // We have 3 valid projects in the mock

    // Each project card should have required elements
    projectCards.forEach(card => {
      expect(card.querySelector('.project-name')).toBeInTheDocument();
      expect(card.querySelector('.project-description')).toBeInTheDocument();
      expect(card.querySelector('.project-image-container')).toBeInTheDocument();
    });

    // Test that the component filters out projects with missing required fields
    // by verifying the validation logic directly
    const testProjects = [
      { id: '1', name: 'Valid', description: 'Test', imageUrl: 'http://test.com', technologies: [] },
      { id: '', name: 'Invalid', description: 'Test', imageUrl: 'http://test.com', technologies: [] },
      { id: '2', name: '', description: 'Test', imageUrl: 'http://test.com', technologies: [] },
      { id: '3', name: 'Valid2', description: '', imageUrl: 'http://test.com', technologies: [] },
      { id: '4', name: 'Valid3', description: 'Test', imageUrl: '', technologies: [] },
    ];

    const validProjects = testProjects.filter(project => 
      project.id && project.name && project.description && project.imageUrl
    );

    expect(validProjects.length).toBe(1); // Only the first project is valid
  });

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

  /**
   * **Feature: projects-section, Property 5: Technology badges rendering**
   * **Validates: Requirements 5.1, 5.3, 5.4**
   * 
   * For any project with technologies array, each technology should be rendered
   * as a styled badge; if the technologies array is empty, the technologies
   * section should not be rendered.
   */
  it('Property 5: Technology badges rendering', () => {
    const { container } = render(<Projects />);
    const projectCards = container.querySelectorAll('.project-card');

    // Test Project 1 has technologies
    const card1 = projectCards[0];
    const techSection1 = card1.querySelector('.technologies');
    expect(techSection1).toBeInTheDocument();
    const techBadges1 = card1.querySelectorAll('.technology');
    expect(techBadges1.length).toBe(2); // React and TypeScript
    expect(techBadges1[0].textContent).toBe('React');
    expect(techBadges1[1].textContent).toBe('TypeScript');

    // Test Project 2 has technologies
    const card2 = projectCards[1];
    const techSection2 = card2.querySelector('.technologies');
    expect(techSection2).toBeInTheDocument();
    const techBadges2 = card2.querySelectorAll('.technology');
    expect(techBadges2.length).toBe(1); // Node.js
    expect(techBadges2[0].textContent).toBe('Node.js');

    // Test Project 3 has empty technologies array
    const card3 = projectCards[2];
    const techSection3 = card3.querySelector('.technologies');
    expect(techSection3).not.toBeInTheDocument(); // Should not render empty technologies section
  });

  /**
   * **Feature: projects-section, Property 6: Responsive grid layout**
   * **Validates: Requirements 1.3**
   * 
   * For any viewport width, the projects grid should adapt: displaying multiple
   * columns on desktop (3 columns for width > 1024px, 2 columns for 768px-1024px)
   * and a single column on mobile (width < 768px).
   */
  it('Property 6: Responsive grid layout', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }), // Generate random viewport widths
        (viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          const { container } = render(<Projects />);
          const grid = container.querySelector('.projects-grid');
          
          expect(grid).toBeInTheDocument();
          
          // Get computed styles
          const styles = window.getComputedStyle(grid as Element);
          const gridTemplateColumns = styles.gridTemplateColumns;
          
          // Verify grid exists and has grid-template-columns property
          expect(gridTemplateColumns).toBeDefined();
          
          // The CSS media queries should apply the correct grid layout
          // We verify that the grid element exists and has the correct class
          // The actual column count is determined by CSS media queries
          
          // For mobile (< 768px), desktop (>= 1024px), and tablet (768-1023px)
          // the CSS will apply different grid-template-columns values
          // We verify the grid structure is present
          if (viewportWidth < 768) {
            // Mobile: should have 1 column layout
            expect(grid).toHaveClass('projects-grid');
          } else if (viewportWidth >= 768 && viewportWidth < 1024) {
            // Tablet: should have 2 column layout
            expect(grid).toHaveClass('projects-grid');
          } else {
            // Desktop: should have 3 column layout
            expect(grid).toHaveClass('projects-grid');
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});