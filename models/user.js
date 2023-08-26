import { Timestamp } from '~/models/timestamp'
import { NUTRIENT_BASIS } from '~/constants/nutrientBasis'
export class User extends Timestamp {
  constructor(user = {}) {
    super(user)
    this.uid = user.uid || ''
    this.email = user.email || ''
    this.displayName = user.displayName || user.email
    this.nutrientBasis = user.nutrientBasis || NUTRIENT_BASIS
  }
}
