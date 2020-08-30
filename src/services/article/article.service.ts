import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ArticlePrice } from "entities/article.price.entity";

import { ArticleFeature } from "entities/article.feature.entity";
import { Feature } from "@nestjsx/crud";
import { features } from "process";
import { ArticleSize } from "entities/article.size.entity";
import { ArticleColor } from "entities/article.color.entity";


@Injectable()
export class ArticleService extends TypeOrmCrudService<Article>{
    constructor(

        @InjectRepository(Article)
        private readonly article: Repository<Article>,

        @InjectRepository(ArticlePrice)
        private readonly articlePrice: Repository<ArticlePrice>,

        @InjectRepository(ArticleFeature)
        private readonly ArticleFeature: Repository<ArticleFeature>,

        @InjectRepository(ArticleSize)
        private readonly ArticleSize: Repository<ArticleSize>,

        @InjectRepository(ArticleColor)
        private readonly ArticleColor: Repository<ArticleColor>

    ) {

        super(article);

    }


    async createFullArticle(data: AddArticleDto): Promise<Article | ApiResponse> {

        let newArticle: Article = new Article();
        newArticle.name = data.name;
        newArticle.categoryId = data.categoryId;
        newArticle.excerpt = data.excerpt;
        newArticle.description = data.description;


        let savedArticle = await this.article.save(newArticle);

        let newArticlePrice: ArticlePrice = new ArticlePrice();

        newArticlePrice.articleId = savedArticle.articleId;
        newArticlePrice.price = data.price;
        await this.articlePrice.save(newArticlePrice);

        let newArticleSize: ArticleSize = new ArticleSize();
        newArticleSize.articleId = savedArticle.articleId;
        newArticleSize.size = data.size;
        await this.ArticleSize.save(newArticleSize);

        let newArticleColor: ArticleColor = new ArticleColor();
        newArticleColor.articleId = savedArticle.articleId;
        newArticleColor.color = data.color;
        await this.ArticleColor.save(newArticleColor);


        return await this.article.findOne(savedArticle.articleId, {

            relations: [
                "articlePrices",
                "articleSize",
                "articleColor"
            ]
        })



    }


}

