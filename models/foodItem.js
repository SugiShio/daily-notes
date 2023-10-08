import { Nutrients } from '~/models/nutrients'

export const TYPES = [
  { value: 'general', label: '一般食品' },
  { value: 'commercial', label: '市販品' },
  { value: 'menu', label: '外食メニュー' },
]

export class FoodItem {
  constructor(id = '', foodItem) {
    this.id = id || ''
    this.name = foodItem ? foodItem.name : ''
    this.description = foodItem ? foodItem.description : ''
    this.keywords = foodItem ? foodItem.keywords || [] : []
    this.images = foodItem ? foodItem.images : []
    this.nutrients = foodItem
      ? new Nutrients(foodItem.nutrients)
      : new Nutrients()
    this.provider = foodItem ? foodItem.provider : ''
    this.type = foodItem ? foodItem.type : ''
    this.url = foodItem ? foodItem.url : ''
    this.unitDefault = foodItem ? foodItem.unitDefault || 'g' : 'g'
    this.units = foodItem ? foodItem.units || [{ unit: 'g', rate: 1 }] : []
  }
}
