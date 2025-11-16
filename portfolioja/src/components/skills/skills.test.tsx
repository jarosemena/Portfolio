import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from './skills';

// Mock the skills data
jest.mock('../../data/skills.json', () => ({
  skills: [
    {
      id: '1',
      name: '.NET Core',
      icon: 'dotnet.svg',
      category: 'Backend',
      level: 'expert',
      description: 'Developing scalable microservices',
      yearsOfExperience: 4
    },
    {
      id: '2',
      name: 'React',
      icon: 'react.svg',
      category: 'Frontend',
      level: 'basic',
      description: 'Building modern web applications',
      yearsOfExperience: 1
    },
    {
      id: '3',
      name: 'SQL Server',
      icon: 'sqlserver.svg',
      category: 'Databases',
      level: 'expert',
      description: 'Database design and optimization',
      yearsOfExperience: 12
    },
    {
      id: '4',
      name: 'Azure',
      icon: 'azure.svg',
      category: 'Cloud',
      level: 'intermediate',
      description: 'Cloud-native architecture',
      yearsOfExperience: 3
    }
  ]
}));

// Mock IntersectionObserver for LazyLoad
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

describe('Skills Component', () => {
  it('should render the skills section', () => {
    render(<Skills />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('should render all skill categories', () => {
    render(<Skills />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('Cloud')).toBeInTheDocument();
  });

  it('should render all skill names', () => {
    render(<Skills />);
    expect(screen.getByText('.NET Core')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
    expect(screen.getByText('Azure')).toBeInTheDocument();
  });

  it('should render skill descriptions', () => {
    render(<Skills />);
    expect(screen.getByText('Developing scalable microservices')).toBeInTheDocument();
    expect(screen.getByText('Building modern web applications')).toBeInTheDocument();
  });

  it('should render years of experience', () => {
    render(<Skills />);
    expect(screen.getByText('4 years of experience')).toBeInTheDocument();
    expect(screen.getByText('1 year of experience')).toBeInTheDocument();
    expect(screen.getByText('12 years of experience')).toBeInTheDocument();
  });

  it('should render skill icons with correct src', () => {
    render(<Skills />);
    const images = screen.getAllByRole('img');
    
    expect(images[0]).toHaveAttribute('src', '/src/assets/icons/dotnet.svg');
    expect(images[0]).toHaveAttribute('alt', '.NET Core');
  });

  it('should render expertise level stars', () => {
    render(<Skills />);
    const starsContainers = document.querySelectorAll('.stars');
    expect(starsContainers.length).toBeGreaterThan(0);
  });

  it('should render 5 stars for expert level', () => {
    render(<Skills />);
    const skillCards = screen.getAllByText('.NET Core')[0].closest('.skill-card');
    const stars = skillCards?.querySelectorAll('.star');
    expect(stars?.length).toBe(5);
    
    const filledStars = skillCards?.querySelectorAll('.star.filled');
    expect(filledStars?.length).toBe(5);
  });

  it('should render 2 stars for basic level', () => {
    render(<Skills />);
    const skillCards = screen.getAllByText('React')[0].closest('.skill-card');
    const filledStars = skillCards?.querySelectorAll('.star.filled');
    expect(filledStars?.length).toBe(2);
  });

  it('should render 3 stars for intermediate level', () => {
    render(<Skills />);
    const skillCards = screen.getAllByText('Azure')[0].closest('.skill-card');
    const filledStars = skillCards?.querySelectorAll('.star.filled');
    expect(filledStars?.length).toBe(3);
  });

  it('should have correct section id', () => {
    render(<Skills />);
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    render(<Skills />);
    const section = document.getElementById('skills');
    expect(section).toHaveClass('section');
    expect(section).toHaveClass('section-dark');
    expect(section).toHaveClass('skills-container');
  });

  it('should render images with lazy loading', () => {
    render(<Skills />);
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('should group skills by category', () => {
    render(<Skills />);
    const categorySections = document.querySelectorAll('.category-section');
    expect(categorySections.length).toBe(4);
  });

  it('should render skill cards', () => {
    render(<Skills />);
    const skillCards = document.querySelectorAll('.skill-card');
    expect(skillCards.length).toBe(4);
  });

  it('should handle image load event', async () => {
    const { container } = render(<Skills />);
    const images = screen.getAllByRole('img');
    
    // Simulate image load wrapped in act
    await waitFor(async () => {
      images.forEach(img => {
        Object.defineProperty(img, 'complete', { value: true });
        img.dispatchEvent(new Event('load'));
      });
    });

    await waitFor(() => {
      const loadedImages = container.querySelectorAll('img.loaded');
      expect(loadedImages.length).toBeGreaterThan(0);
    });
  });
});
