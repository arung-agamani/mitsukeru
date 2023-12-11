export const ItemType = [
  'Phone',
  'Wallet',
  'CosplayProps',
  'Cash',
  'Documents',
  'Package',
  'Others',
];

export type DepositItemStatus = 'stored' | 'returned';

export interface DepositItemData {
  id?: string;
  name: string;
  type: string;
  description: string;

  counter: string;
  ownerName: string;
  ownerContact: string;

  status: DepositItemStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyItemData: DepositItemData = {
  id: '',
  name: '',
  type: '',
  description: '',
  counter: '1',
  ownerName: '',
  ownerContact: '',
  status: 'stored',
  createdAt: new Date(),
  updatedAt: new Date(),
};
