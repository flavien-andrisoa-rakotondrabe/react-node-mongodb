import { createSlice } from '@reduxjs/toolkit';
import { CampaignDataInterface } from '@/types/campaign.type';

interface CampaignsStoreType {
  loading: boolean;
  updateLoading: boolean;
  campaigns: CampaignDataInterface[];
  actualCampaign: CampaignDataInterface | null;
}

const initialState: CampaignsStoreType = {
  loading: true,
  updateLoading: false,
  campaigns: [],
  actualCampaign: null,
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaignsReducer(state, action) {
      const data: { campaigns?: CampaignDataInterface[]; loading?: boolean } =
        action.payload;

      if (data.campaigns) {
        state.campaigns = data.campaigns;
        state.actualCampaign = null;
        state.loading = false;
      }
      if (typeof data.loading === 'boolean') {
        state.loading = data.loading;
      }
    },
    addCampaignReducer(state, action) {
      const data: { campaign: CampaignDataInterface } = action.payload;

      state.campaigns.unshift(data.campaign);
    },
    setActualCampaignReducer(state, action) {
      const data: { campaign: CampaignDataInterface } = action.payload;

      state.actualCampaign = data.campaign;
      state.loading = false;
    },
    updateActualCampaignReducer(state, action) {
      const data: {
        campaign?: Partial<CampaignDataInterface>;
        updateLoading?: boolean;
      } = action.payload;

      if (data.campaign && state.actualCampaign) {
        state.actualCampaign = {
          ...state.actualCampaign,
          ...data.campaign,
        };
      }
      if (typeof data.updateLoading === 'boolean') {
        state.updateLoading = data.updateLoading;
      }
    },
    resetCampaignsReducer() {
      return initialState;
    },
  },
});

export const {
  setCampaignsReducer,
  addCampaignReducer,
  setActualCampaignReducer,
  updateActualCampaignReducer,
  resetCampaignsReducer,
} = campaignsSlice.actions;
export default campaignsSlice.reducer;
