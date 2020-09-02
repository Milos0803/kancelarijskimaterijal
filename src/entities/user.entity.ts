import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import * as Validator from 'class-validator';
@Index("uq_user_email", ["email"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column( {type:"varchar", unique: true, length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part:true,
    require_tld: true,
  })
  
  email: string;

  @Column({type:"varchar",  name: "password_hash", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')

  passwordHash: string;

  @Column( {type:"varchar", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,64)
  forename: string;

  @Column( {type:"varchar", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,64)
  surname: string;

  @Column( {type:"tinytext", name: "postal_address" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10,512)
  postalAddress: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
