import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column( {type:"varchar", unique: true, length: 255 })
  email: string;

  @Column({type:"varchar",  name: "password_hash", length: 128 })
  passwordHash: string;

  @Column( {type:"varchar", length: 64 })
  forename: string;

  @Column( {type:"varchar", length: 64 })
  surname: string;

  @Column( {type:"tinytext", name: "postal_address" })
  postalAddress: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
