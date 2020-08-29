import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_feature_name_article_id", ["name", "articleId"], { unique: true })
@Index("fk_feature_article_id", ["articleId"], {})
@Entity("article_feature")
export class ArticleFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
  featureId: number;

  @Column( {type:"varchar", length: 32 })
  name: string;

  @Column( {type:"int", name: "article_id", unsigned: true })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.features, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
