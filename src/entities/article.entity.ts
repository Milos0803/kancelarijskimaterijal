import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entyty";
import { ArticleColor } from "./article.color.entity";
import { ArticlePrice } from "./article.price.entity";
import { ArticleSize } from "./article.size.entity";
import { CartArticle } from "./cart.article.entyty";

import { Photo } from "./photo.entity";
import { ArticleFeature } from "./article.feature.entity";

@Index("uq_article_name_category_id", ["name", "categoryId"], { unique: true })
@Index("fk_article_category_id", ["categoryId"], {})
@Entity("article")
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column( {type:"varchar" , length: 128 })
  name: string;

  @Column( { type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column( {type:"varchar",length: 255 })
  excerpt: string;

  @Column( {type:"text" })
  description: string;


  @Column( {type:"timestamp", name: "created_at" , default: () => 'CURRENT_TIMESTAMP'})
  createdAt: string;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToOne(() => ArticleColor, (articleColor) => articleColor.article)
  articleColor: ArticleColor;

  @OneToMany(() => ArticlePrice, (articlePrice) => articlePrice.article)
  articlePrices: ArticlePrice[];

  @OneToOne(() => ArticleSize, (articleSize) => articleSize.article)
  articleSize: ArticleSize;

  @OneToOne(() => CartArticle, (cartArticle) => cartArticle.article)
  cartArticle: CartArticle;

  @OneToMany(() => ArticleFeature, (feature) => feature.article)
  features: ArticleFeature[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];
}
