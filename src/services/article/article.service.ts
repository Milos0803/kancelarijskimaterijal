import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm"

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ArticlePrice } from "entities/article.price.entity";

import { ArticleFeature } from "entities/article.feature.entity";
import { Feature } from "@nestjsx/crud";
import { features } from "process";


@Injectable()
export class ArticleService extends TypeOrmCrudService<Article>{
constructor(
    
@InjectRepository(Article)
private readonly article: Repository<Article>,

@InjectRepository(ArticlePrice)
private readonly articlePrice: Repository<ArticlePrice>,

@InjectRepository(ArticleFeature)
private readonly ArticleFeature: Repository<ArticleFeature>



){


    super(article);
    
}



   
   async createFullArticle( data: AddArticleDto): Promise<Article | ApiResponse>{

    let newArticle: Article = new Article();
    newArticle.name= data.name;
    newArticle.categoryId = data.categoryId;
    newArticle.excerpt = data.excerpt;
    newArticle.description = data.description;
    
    
   let savedArticle = await this.article.save(newArticle);

    let newArticlePrice: ArticlePrice = new ArticlePrice();
    
    newArticlePrice.articleId= savedArticle.articleId;
    newArticlePrice.price = data.price; 
    this.articlePrice.save(newArticlePrice);
    

   /* for( let feature of data.features) {
        
        let newArticlePrice: ArticlePrice = new ArticlePrice();
        newArticlePrice.articleId = savedArticle.articleId;
    
        newArticlePrice.price = feature.price;
        this.articlePrice.save(newArticlePrice);
        } */
    

    
    





    



    return await this.article.findOne(savedArticle.articleId,{

        relations: [
            "articlePrices"
        ]
    })





   
    
    

   

    

   }

   




}

