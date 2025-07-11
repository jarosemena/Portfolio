import { PortfolioService } from '../domain/services/PortfolioService';
import { DataSource } from '../domain/repositories/PortfolioRepositoryFactory';
import { PortfolioState } from '../domain/models/portfolio/types';
import { ExperienceItem } from '../domain/models/experience/types';
import { ProjectItem } from '../domain/models/projects/types';
import { EducationItem } from '../domain/models/education/types';

// Mock del repositorio
const mockRepository = {
  getPortfolioData: jest.fn(),
  updateAboutMe: jest.fn(),
  updateExperience: jest.fn(),
  updateProjects: jest.fn(),
  updateEducation: jest.fn(),
  updateSkills: jest.fn(),
};

// Mock de la factory
jest.mock('../repositories/PortfolioRepositoryFactory', () => ({
  PortfolioRepositoryFactory: {
    createRepository: jest.fn().mockImplementation(() => mockRepository),
  },
  DataSource: {
    API: 'api',
    JSON: 'json',
  },
}));

describe('PortfolioService', () => {
  let service: PortfolioService;

  const mockPortfolioData: PortfolioState = {
    aboutMe: {
      title: 'Test Title',
      paragraphs: ['Paragraph 1', 'Paragraph 2'],
    },
    experience: [
      {
        id: '1',
        title: 'Developer',
        company: 'Test Company',
        period: '2020-2022',
        description: 'Test description',
      },
    ],
    education: [
      {
        id: '1',
        degree: 'Computer Science',
        institution: 'Test University',
        period: '2016-2020',
      },
    ],
    skills: {
      categories: [
        {
          name: 'Languages',
          skills: ['TypeScript', 'JavaScript'],
        },
      ],
    },
    projects: {
      items: [
        {
          id: '1',
          title: 'Test Project',
          description: 'Test project description',
          technologies: ['React', 'TypeScript'],
          link: 'https://example.com',
        },
      ],
    },
  };

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
    service = new PortfolioService();
  });

  describe('constructor', () => {
    it('should create repository with default data source', () => {
      new PortfolioService();
      expect(mockRepository).toBeDefined();
    });

    it('should create repository with specified data source', () => {
      const customSource = 'api' as DataSource;
      new PortfolioService(customSource);
      expect(mockRepository).toBeDefined();
    });
  });

  describe('getPortfolioData', () => {
    it('should return portfolio data from repository', async () => {
      mockRepository.getPortfolioData.mockResolvedValue(mockPortfolioData);

      const result = await service.getPortfolioData();

      expect(mockRepository.getPortfolioData).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPortfolioData);
    });

    it('should throw error when repository fails', async () => {
      const errorMessage = 'Failed to fetch data';
      mockRepository.getPortfolioData.mockRejectedValue(new Error(errorMessage));

      await expect(service.getPortfolioData()).rejects.toThrow(errorMessage);
    });
  });

  describe('updateAboutMe', () => {
    it('should call repository with correct data', async () => {
      const updateData = { title: 'New Title' };
      mockRepository.updateAboutMe.mockResolvedValue(undefined);

      await service.updateAboutMe(updateData);

      expect(mockRepository.updateAboutMe).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateAboutMe).toHaveBeenCalledWith(updateData);
    });

    it('should propagate repository errors', async () => {
      const errorMessage = 'Update failed';
      mockRepository.updateAboutMe.mockRejectedValue(new Error(errorMessage));

      await expect(service.updateAboutMe({ title: 'New' })).rejects.toThrow(errorMessage);
    });
  });

  describe('updateExperience', () => {
    it('should call repository with experience updates', async () => {
      const updates: Array<{ id: string; updates: Partial<ExperienceItem> }> = [
        { id: '1', updates: { title: 'Senior Developer' } },
      ];
      mockRepository.updateExperience.mockResolvedValue(undefined);

      await service.updateExperience(updates);

      expect(mockRepository.updateExperience).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateExperience).toHaveBeenCalledWith(updates);
    });
  });

  describe('updateProjects', () => {
    it('should call repository with project updates', async () => {
      const updates: Array<{ id: string; updates: Partial<ProjectItem> }> = [
        { id: '1', updates: { title: 'Updated Project' } },
      ];
      mockRepository.updateProjects.mockResolvedValue(undefined);

      await service.updateProjects(updates);

      expect(mockRepository.updateProjects).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateProjects).toHaveBeenCalledWith(updates);
    });
  });

  describe('updateEducation', () => {
    it('should call repository with education updates', async () => {
      const updates: Array<{ id: string; updates: Partial<EducationItem> }> = [
        { id: '1', updates: { degree: 'Master Degree' } },
      ];
      mockRepository.updateEducation.mockResolvedValue(undefined);

      await service.updateEducation(updates);

      expect(mockRepository.updateEducation).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateEducation).toHaveBeenCalledWith(updates);
    });
  });

  describe('updateSkills', () => {
    it('should call repository with skills updates', async () => {
      const updates = {
        categories: [
          {
            name: 'New Category',
            skills: ['New Skill'],
          },
        ],
      };
      mockRepository.updateSkills.mockResolvedValue(undefined);

      await service.updateSkills(updates);

      expect(mockRepository.updateSkills).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateSkills).toHaveBeenCalledWith(updates);
    });
  });

  describe('getDefaultDataSource', () => {
    it('should return "json" in test environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';

      const service = new PortfolioService();
      const source = (service as any).getDefaultDataSource();

      expect(source).toBe('json');
      process.env.NODE_ENV = originalEnv;
    });

    it('should return "api" in production environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const service = new PortfolioService();
      const source = (service as any).getDefaultDataSource();

      expect(source).toBe('api');
      process.env.NODE_ENV = originalEnv;
    });
  });
});