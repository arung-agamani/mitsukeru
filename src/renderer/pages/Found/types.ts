export const ItemType = [
  'Phone',
  'Wallet',
  'CosplayProps',
  'Cash',
  'Documents',
  'Package',
  'Others',
];

export interface FoundItemData {
  id?: string;
  name: string;
  type: string;
  description: string;
  location: string;
  status: 'reported' | 'claimed';
  createdAt: Date;
  updatedAt: Date;
}

export const emptyItemData: FoundItemData = {
  id: '',
  name: '',
  type: '',
  description: '',
  location: '',
  status: 'reported',
  createdAt: new Date(),
  updatedAt: new Date(),
};
