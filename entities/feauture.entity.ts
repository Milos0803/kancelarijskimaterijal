import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_feauture_name_article_id", ["name", "articleId"], { unique: true })
@Index("fk_feauture_article_id", ["articleId"], {})
@Entity("feauture")
export class Feauture {
  @PrimaryGeneratedColumn({ type: "int", name: "feauture_id", unsigned: true })
  feautureId: number;

  @Column( {type:"varchar", length: 32 })
  name: string;

  @Column( {type:"int", name: "article_id", unsigned: true })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.feautures, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
