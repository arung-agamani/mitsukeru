export const ItemType = [
  'Phone',
  'Wallet',
  'CosplayProps',
  'Cash',
  'Documents',
  'Package',
  'Others',
];

export interface LostItemData {
  id?: string;
  name: string;
  type: string;
  description: string;
  location: string;
  reporterName: string;
  reporterContact: string;
  status: 'reported' | 'claimed';
  createdAt: Date;
  updatedAt: Date;
}

export const emptyItemData: LostItemData = {
  id: '',
  name: '',
  type: '',
  description: '',
  location: '',
  status: 'reported',
  reporterName: '',
  reporterContact: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
