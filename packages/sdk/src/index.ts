import { utils } from './utils';
import { constants } from './constants';
import { types } from './types';

export interface SDKData {
  id: string;
  name: string;
  version: string;
  timestamp: Date;
}

class SDK {
  private data: SDKData = {
    id: 'sdk-001',
    name: 'Webpack Alias Plugin SDK',
    version: '1.0.0',
    timestamp: new Date()
  };

  public getData(): SDKData {
    return this.data;
  }

  public getMessage(): string {
    return `SDK ${this.data.name} v${this.data.version} is ready!`;
  }

  public getUtils() {
    return utils;
  }

  public getConstants() {
    return constants;
  }

  public getTypes() {
    return types;
  }
}

const sdk = new SDK();

export default sdk;
export { utils, constants, types }; 