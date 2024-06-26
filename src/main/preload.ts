// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

export type ItemType = 'lost' | 'found' | 'deposit';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  db: {
    async getItem(type: ItemType, id: string) {
      return ipcRenderer.invoke('db-get', type, id);
    },
    async addItem(type: ItemType, values: any) {
      console.log(values);
      ipcRenderer.send('db', type, values);
    },
    async editItem(type: ItemType, id: string, values: any) {
      return ipcRenderer.invoke('db-edit', type, id, values);
    },
    async listItem(type: ItemType) {
      return ipcRenderer.invoke('db-search', type);
    },
    async getImage(type: ItemType, id: string) {
      return ipcRenderer.invoke('image-get', type, id);
    },
    async export() {
      return ipcRenderer.invoke('export');
    },
    async import() {
      return ipcRenderer.invoke('import');
    },
    async getConfig() {
      return ipcRenderer.invoke('config-get');
    },
    async setConfig(key: string, value: string) {
      return ipcRenderer.invoke('config-set', key, value);
    },
    on(channel: ItemType, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
