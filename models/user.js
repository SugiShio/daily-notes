import { Timestamp } from '~/models/timestamp'
import { NUTRIENT_BASIS } from '~/constants/nutrientBasis'
export class User extends Timestamp {
  constructor(user = {}) {
    super(user)
    this.uid = user.uid || ''
    this.authority = user.authority
    this.email = user.email || ''
    this.displayName = user.displayName || user.email
    this.birthDate = user.birthDate
    this.nutrientBasis = user.nutrientBasis || NUTRIENT_BASIS
  }

  get authorityText() {
    switch (this.authority) {
      case 'admin':
        return 'admin'
      default:
        return 'general'
    }
  }

  get birthDateText() {
    if (!this.birthDate) return 'Notset'

    const dateObject = new Date(this.birthDate)
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1
    const date = dateObject.getDate()
    return `${year}/${month}/${date}`
  }
}
