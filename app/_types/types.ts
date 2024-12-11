export type ObjectTypeNameValue = {
  name: string;
  value: string | null;
};

export type ObjectTypeValueLabel = {
  value: string;
  label: string;
};

export type ObjectTypeCodeName = {
  code: string;
  name: string;
};

export type DataTypeDefault = {
  totalElements: number;
  content: Array<any> | null;
};

export type DefaultContentDataType = {
  pageable: { pageNumber: number; pageSize: number };
  content: Array<any>;
  totalElements: number;
};

export interface TemplateGroup {
  templateGroupSeq: number;
  templateGroupName: string;
  order: number;
  iconFileSeq: number;
  updaterSeq: number;
  updatedDate: string;
  creatorSeq: number;
  createdDate: string;
  fileName: string;
}

export interface Template {
  templSeq: number;
  prducTyp: string;
  templGrpNm: string;
  templNm: string;
  part: string;
  ordr: number;
  dispYn: string;
}

// 템플릿 공통
export interface TemplateCommon {
  templateGroupSeq: number | null;
  templateName: string | null;
  description: string | null;
  iconFileSeq: number | null;
  displayYn: string | null;
  fileName: string | null;
  files: Array<File> | null;
}

// 템플릿 메세지 가이드
export interface TemplateMessageGuide {
  guideNumber: number | null;
  guideName: string | null;
  useYn: string | null;
  imageFileSeq: number | null;
  description: string | null;
  fileName: string | null;
  files: Array<File> | null;
  multipartIndex?: number;
}

// 템플릿 메세지 가이드 목록
export interface TemplateMessageGuideList {
  messageGuideList: Array<TemplateMessageGuide>;
}

// 템플릿 파트 프롬프트
export interface TemplatePart {
  templatePartSeq: number;
  templatePartName: string;
  templatePartType: string; // 파트 구분
  generationMethod: string; // 생성 방식
  modelId: number | null; // LLM 모델
  useYn: string;
  candidateList: string[]; // 파트 구분 선택형: 후보 목록
  prompt: string;
  sample: string;
  contextList: {} | null;
  numberOfResult: number;
  testSampleList?: Array<string> | null;
}

// 템플릿 파트 프롬프트 목록
export interface TemplatePartList {
  partList: Array<TemplatePart>;
}

// 템플릿 검수 프롬프트
export interface TemplateInspection {
  modelId: number | null;
  prompt: string;
  sample: string;
  previewPrompt: string | null;
}

// 파트 히스토리
export interface TemplatePartHistory {
  listNum: number;
  partName: string;
  itemName: string;
  beforeValue: string;
  afterValue: string;
  updaterName: string;
  updatedDate: string;
}

export interface TemplateDetail {
  common: TemplateCommon;
  messageGuideList: Array<TemplateMessageGuide>;
  partList: Array<TemplatePart>;
  inspection: TemplateInspection;
  historyList: Array<TemplatePartHistory>;
}

// 메인 키워드 타입
export interface MainKeyWord {
  mainKeywrdSeq: number;
  keywrd1: string;
  keywrd2: string;
  keywrd3: string;
  dispYn: string;
  creSeq: number;
  creNm: string;
  creDt: string;
  updSeq: number;
  updNm: string;
  updDt: string;
}

// 메인배너 타입
export interface MainBannerList {
  bnrSeq: number;
  bannerNm: string;
  bannerThumbnailSeq: number;
  bannerThumbnail: string;
  dispYn: string;
  projectNm: string;
  creSeq: number;
  creNm: string;
  creDt: string;
  updSeq: number;
  updNm: string;
  updDt: string;
}

// 선택된 프로젝트 리스트 타입
export interface ProjectChoiceDataType {
  source: string;
  category: string;
  autoCreYn: string;
  projectNm: string;
  startDay: string;
  endDay: string;
  keyword: string;
  creNm: string;
  creDt: string;
}

// 모달창 내에 프로젝트 리스트
export interface ModalProjectList {
  autoCreYn: string;
  source: string;
  category: string;
  projectSeq: number;
  projectNm: string;
  startDay: string;
  endDay: string;
  keyword: string;
  creSeq: number;
  creNm: string;
  deptNm: string;
  creDt: string;
}

// 배너 상세
export interface BannerType {
  banner: Banner;
  project: Project;
  advInfo: advInfo;
  fileName: string;
}

export interface Project {
  projectSeq: number;
  projectNm: string;
  startDay: string;
  endDay: string;
  category: string;
  keyword: string;
  creSeq: number;
  creNm: string;
  creDt: string;
}

export interface Banner {
  bnrSeq: number;
  bannerNm: string;
  bannerThumbnail: string;
}

export interface advInfo {
  advInfoSeq: number;
  advInfoName: string;
  keywordNames: string;
  benefit: string;
}

// 단말기 타입
export interface DeviceType {
  [x: string]: any;
  advInfoSeq: number;
  deviceNm: string;
  startDay: string;
  endDay: string;
  tgt: string;
  benefit: string;
  summarize: string;
  feature: string;
  etc: string;
  price: string;
  keyword: string[];
  resolution: string;
  color: string;
  capacity: string;
  size: string;
  dispYn: string;
  advSrcCd: string;
}

// 사전정보 타입
export interface DataTypeInfo {
  categoryCode: string;
  categoryName: string;
  advInfoSeq: number;
  advInfoName: string;
  keywordNames: string;
  benefit: string;
}

// 요금제 타입
export interface chargeType {
  advInfoSeq: number;
  advInfoNm: string;
  startDay: string;
  endDay: string;
  tgt: string;
  benefit: string;
  summarize: string;
  dataQty: string;
  etc: string;
  price: string;
  keyword: string[];
  dispYn: string;
}

export interface feedbackType {
  feedbackSeq: number;
  feedbackResultCode: string;
  feedbackResultName: string;
  feedbackTypeCode: string;
  feedbackTypeName: string;
  creatorName: string;
  teamName: string;
  createdDate: string;
  dissatisfactionComment: null;
  feedbackDetail: null;
  feedbackContent: string;
}

// 모니터링 타입
export interface monitoringType {
  chatRoomSeq: number;
  chatRoomName: string;
  creatorName: string;
  teamName: string;
  createdDate: string;
}

// 프로젝트 타입
export interface projectType {
  projectSeq: number;
  projectSrcName: string;
  categoryName: string;
  advInfoMappedYn: string;
  projectName: string;
  startDay: string;
  endDay: string;
  keywordNames: string;
  displayYn: string;
  creatorName: string;
  teamName: string;
  createdDate: string;
  updaterName: string;
  updatedDate: string;
}

export interface projectDetailType {
  projectSeq: number;
  categoryCode: string;
  categoryName: string;
  projectSourceCode: string;
  projectSourceName: string;
  projectName: string;
  content: string;
  startDay: string;
  endDay: string;
  goalCode: string;
  goalName: string;
  benefit: string;
  target: string;
  reference: string;
  displayYn: string;
  advInfoMappedYn: string;
  keywordNames: string;
  advInfoSeqList: number[];
  teamName: string;
  creatorName: string;
  createdDate: string;
  updaterName: string;
  updatedDate: string;
}
