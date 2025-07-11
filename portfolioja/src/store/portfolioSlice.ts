import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PortfolioService } from '../domain/services/PortfolioService';
import { PortfolioState } from '../domain/models/portfolio/types';

interface PortfolioStateWithStatus extends PortfolioState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PortfolioStateWithStatus = {
  aboutMe: { title: '', paragraphs: [] },
  experience: [],
  education: [],
  skills: { categories: [] },
  projects: { items: [] },
  status: 'idle',
  error: null
};

// Thunk para cargar datos del portafolio
export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const service = new PortfolioService();
      return await service.getPortfolioData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para actualizar AboutMe
export const updateAboutMe = createAsyncThunk(
  'portfolio/updateAboutMe',
  async (data: Partial<PortfolioState['aboutMe']>, { rejectWithValue }) => {
    try {
      const service = new PortfolioService();
      await service.updateAboutMe(data);
      return data; // Retornamos los datos actualizados
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Reducers sincrónicos...
  },
  extraReducers: (builder) => {
    builder
      // Manejo de fetchPortfolioData
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Actualizamos todo el estado con los datos recibidos
        return { ...state, ...action.payload };
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Manejo de updateAboutMe
      .addCase(updateAboutMe.fulfilled, (state, action) => {
        state.aboutMe = { ...state.aboutMe, ...action.payload };
      });
  }
});

export default portfolioSlice.reducer;