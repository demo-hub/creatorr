import Adapters from 'next-auth/adapters'

// Extend the built-in models using class inheritance
export default class User extends Adapters.TypeORM.Models.User.model {
    // You can extend the options in a model but you should not remove the base
    // properties or change the order of the built-in options on the constructor
    constructor(name, email, image, emailVerified, shortDesc, longDesc, monthlyEarnings, ethWallet) {
      super(name, email, image, emailVerified)
      this.shortDesc = shortDesc
      this.longDesc = longDesc
      this.monthlyEarnings = monthlyEarnings
      this.ethWallet = ethWallet

    }
  }

export const UserSchema = {
    name: 'User',
    target: User,
    columns: {
      ...Adapters.TypeORM.Models.User.schema.columns,
      shortDesc: { type: String, nullable: true },
      longDesc: { type: String, nullable: true },
      monthlyEarnings: { type: Number, nullable: true },
      ethWallet: { type: String, nullable: true }
    }
  }