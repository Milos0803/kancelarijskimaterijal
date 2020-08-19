import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_article_price_article_id_price", ["articleId", "price"], {
  unique: true,
})
@Entity("article_price")
export class ArticlePrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "article_price",
    unsigned: true,
  })
  articlePrice: number;

  @Column({type:"int",  name: "article_id", unsigned: true })
  articleId: number;

  @Column( {type: "decimal",  precision: 10, scale: 2 })
  price: number;

  @Column("timestamp", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Article, (article) => article.articlePrices, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
