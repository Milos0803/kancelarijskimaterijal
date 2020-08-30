import { Controller, Post, Body, Put } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { Article } from "entities/article.entity";
import { ArticleService } from "src/services/article/article.service";
import { AddArticleDto } from "src/dtos/article/add.article.dto";

@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            field: 'articleId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            pohotos: {
                eager: true
            },
            category: {
                eager: true

            },
            articlePrices: {
                eager: true
            },
            articleColor: {
                eager: true
            }
        }
    }
})

export class ArticleController {
    constructor(
        public service: ArticleService) { }

    @Post('createFull')
    createFullArticle(@Body() data: AddArticleDto) {
        return this.service.createFullArticle(data);
    }



}