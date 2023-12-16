export enum EAchievementStatus {
  success = 'success',
  unstable = 'unstable',
  failed = 'failed'
}

export enum ERecordStatus {
  success = 'success',
  inProgress = 'inProgress',
  failed = 'failed'
}

// 주간 플랜달성데이터
export type TPlanRecord = {
  createdAt: string;
  status: EAchievementStatus | null;
};

// 플랜조회 데이터
export type TPlan = {
  planId: number;
  title: string;
  author: string;
  coverImage: string | null;
  totalPage: number;
  currentPage: number;
  target: number;
  endDate: string;
  planStatus: ERecordStatus; // 플랜 전체의 달성여부
  recordStatus: ERecordStatus; // 당일 목표치
};

// 플랜달성실패 데이터
export type TPreviouslyFailedPlan = Omit<TPlan, 'target' | 'planStatus' | 'recordStatus'>;

// 전체 타입
export type TPlanData = {
  weedRecord: TPlanRecord[] | null;
  planData: TPlan[] | null;
  previouslyFailedPlan: TPreviouslyFailedPlan[] | null;
};
