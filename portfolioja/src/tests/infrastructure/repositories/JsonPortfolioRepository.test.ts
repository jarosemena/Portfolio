import { JsonPortfolioRepository } from '../../../infrastructure/json/JsonPortfolioRepository';


jest.mock('../../../../public/data/portfolio.json', () => ({
  __esModule: true,
  default: {
    aboutMe: {
      title: 'Professional Software Developer',
      paragraphs: ['Test paragraph'],
      contact: {
        email: 'test@example.com',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        twitter: ''
      }
    },
    experience: [],
    education: [],
    skills: {
      title: 'Skills',
      categories: [],
      technicalSummary: ''
    },
    projects: {
      title: 'Projects',
      items: []
    }
  }
}));

describe('JsonPortfolioRepository', () => {
  let repository: JsonPortfolioRepository;

  beforeEach(() => {
    repository = new JsonPortfolioRepository();
  });

  it('should return portfolio data from JSON file', async () => {
    const result = await repository.getPortfolioData();
    expect(result.aboutMe.title).toBe('Professional Software Developer');
    expect(result.aboutMe.paragraphs).toEqual(['Test paragraph']);
  });
});