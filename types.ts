
export interface MarketingPlan {
  productName: string;
  postCaption: string;
  hashtags: string[];
  postingTimeSuggestion: string;
  strategyAdvice: string;
  videoScript: string;
  sources?: string[];
  localStores?: { name: string; uri: string }[];
}

export type WorkStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'POSTED';

export interface HistoryItem {
  id: string;
  timestamp: number;
  productName: string;
  productLink: string;
  plan: MarketingPlan;
  imageUrl?: string;
  status: WorkStatus;
  logs: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  EDITING_IMAGE = 'EDITING_IMAGE',
  SENDING_GMAIL = 'SENDING_GMAIL',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
