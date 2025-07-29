// SDK 主模块类型定义
export interface SDKData {
  id: number;
  name: string;
  timestamp: string;
}

export interface SDK {
  name: string;
  version: string;
  getMessage(): string;
  getData(): SDKData;
}

declare const sdk: SDK;
export default sdk; 