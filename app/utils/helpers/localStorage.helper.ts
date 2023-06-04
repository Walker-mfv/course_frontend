import { ICart } from './../../modules/shared/interfaces/models/user.interface'
const CART = 'cart'
const REGISTER_STEP = 'register_step'

export class LocalStorageHelper {
  static clearCart() {
    localStorage.removeItem(CART)
  }
  static setCart(item: ICart) {
    localStorage.setItem(CART, JSON.stringify(item))
  }
  static getCart() {
    const item = localStorage.getItem(CART)
    if (item) return JSON.parse(item) as ICart
  }
}

export class LocalRegisterHelper {
  static clearRegisterStep() {
    localStorage.removeItem(REGISTER_STEP)
  }

  static setRegisterStep(step: number) {
    localStorage.removeItem(REGISTER_STEP)
    localStorage.setItem(REGISTER_STEP, step.toString())
  }

  static getRegisterStep() {
    const item = localStorage.getItem(REGISTER_STEP)
    if (item) return parseInt(item)
  }
}
