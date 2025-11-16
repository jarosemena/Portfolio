import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceTimeline from './experience';
import { ExperienceItem } from './types';

const mockExperiences: ExperienceItem[] = [
  {
    id: '1',
    period: '2020-2023',
    position: 'Senior Developer',
    company: 'Tech Corp',
    descriptions: ['Led development team', 'Implemented CI/CD'],
    technologies: [{ name: 'React' }, { name: 'TypeScript' }],
    link: 'https://example.com'
  },
  {
    id: '2',
    period: '2018-2020',
    position: 'Developer',
    company: 'StartUp Inc',
    descriptions: ['Built web applications'],
    technologies: [{ name: 'Node.js' }],
  },
  {
    id: '3',
    period: '2016-2018',
    position: 'Junior Developer',
    company: 'Small Company',
    descriptions: ['Maintained legacy code'],
    technologies: [],
  },
  {
    id: '4',
    period: '2014-2016',
    position: 'Intern',
    company: 'Big Corp',
    descriptions: ['Learned the basics'],
    technologies: [{ name: 'Java' }],
  }
];

describe('ExperienceTimeline', () => {
  it('should render the component with title', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
  });

  it('should initially show only 2 experiences', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.queryByText('Junior Developer')).not.toBeInTheDocument();
  });

  it('should show more experiences when clicking show more button', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  });

  it('should show expand button (+) when there are more experiences', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    const expandButton = screen.getByTitle('Show more experiences');
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveTextContent('+');
  });

  it('should show collapse button (-) when all experiences are visible', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    fireEvent.click(showMoreButton);
    
    const collapseButton = screen.getByTitle('Show less experiences');
    expect(collapseButton).toBeInTheDocument();
    expect(collapseButton).toHaveTextContent('−');
  });

  it('should show all experiences and end message when fully expanded', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    fireEvent.click(showMoreButton);
    
    expect(screen.getByText('Intern')).toBeInTheDocument();
    expect(screen.getByText(/You've reached the end of my professional journey/)).toBeInTheDocument();
  });

  it('should collapse experiences when clicking show less button', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    fireEvent.click(showMoreButton);
    
    const showLessButton = screen.getByText('Show Less');
    fireEvent.click(showLessButton);
    
    expect(screen.queryByText('Junior Developer')).not.toBeInTheDocument();
    expect(screen.queryByText('Intern')).not.toBeInTheDocument();
  });

  it('should render experience details correctly', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    expect(screen.getByText('2020-2023')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Led development team')).toBeInTheDocument();
    expect(screen.getByText('Implemented CI/CD')).toBeInTheDocument();
  });

  it('should render technologies when available', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render link when available', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const link = screen.getByText('View projects');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com');
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
    expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not render link when not available', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    
    const links = screen.getAllByText('View projects');
    expect(links).toHaveLength(1);
  });

  it('should handle empty technologies array', () => {
    render(<ExperienceTimeline experiences={mockExperiences} />);
    
    const showMoreButton = screen.getByText('Show More Experiences');
    fireEvent.click(showMoreButton);
    
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  });

  it('should render with less than 2 experiences', () => {
    const singleExperience = [mockExperiences[0]];
    render(<ExperienceTimeline experiences={singleExperience} />);
    
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.queryByText('Show More Experiences')).not.toBeInTheDocument();
  });
});
