import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { Article } from "entities/article.entity";
import { ArticleService } from "src/services/article/article.service";

@Controller('api/article')
@Crud({
    model: {
        type:Article
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
            category:{
                eager:true

            },
            articlePrices: {
                eager: true
            },
            articleColor:{
                eager:true
            }
        }
    }
})

export class ArticleController{
constructor(
public service: ArticleService){}


}