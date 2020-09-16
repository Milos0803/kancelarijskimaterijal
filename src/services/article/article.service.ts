import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { ArticlePrice } from "src/entities/article.price.entity";
import { ArticleFeature } from "src/entities/article.feature.entity";
import { ArticleSize } from "src/entities/article.size.entity";
import { ArticleColor } from "src/entities/article.color.entity";
import { Photo } from "src/entities/photo.entity";
import { EditArticleDto } from "src/dtos/article/edit.article.dto";
import { ArticleSearchDto } from "src/dtos/article/article.search.dto";


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

        @InjectRepository(Photo)
        private readonly photo: Repository<Photo>,

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
                "articleColor",
                "photos",
            ]
        })



    }
    async editFullArticle(articleId: number, data: EditArticleDto): Promise<Article | ApiResponse> {
        const postojeciArtikal: Article = await this.article.findOne(articleId, {
            relations: ['articlePrices', 'articleSize', 'articleColor']
        });
        if (!postojeciArtikal) {
            return new ApiResponse('error', -5001, 'Article not found');

        }


        postojeciArtikal.name = data.name;
        postojeciArtikal.categoryId = data.categoryId;
        postojeciArtikal.excerpt = data.excerpt;
        postojeciArtikal.description = data.description;


        const savedArticle = await this.article.save(postojeciArtikal);
        if (!savedArticle) {
            return new ApiResponse('error', -5002, 'Article not updated');
        }

        const newPrice: string = Number(data.price).toFixed(2);
        const lastPrice = postojeciArtikal.articlePrices[postojeciArtikal.articlePrices.length - 1].price;
        const lastPriceString: string = Number(lastPrice).toFixed(2);

        if (newPrice !== lastPriceString) {
            const newArticlePrice = new ArticlePrice();
            newArticlePrice.articleId = articleId;
            newArticlePrice.price = data.price;
            const savedArticlePrice = await this.articlePrice.save(newArticlePrice);
            if (!savedArticlePrice) {
                return new ApiResponse('error', -5003, 'Price not updated');
            }
            const newArticleSize = new ArticleSize();
            newArticleSize.articleId = articleId;
            newArticleSize.size = data.size;

            const newArticleSizeSave = await this.ArticleSize.save(newArticleSize);
            if (!newArticleSizeSave) {
                return new ApiResponse('error', -5003, 'Price not updated');
            }

        }

    }

    async search(data: ArticleSearchDto): Promise<Article[] | ApiResponse> {

        const builder = await this.article.createQueryBuilder("article");

        builder.innerJoinAndSelect("article.articlePrices" ,"ap", "ap.article_id = article.article_id");

        builder.where('article.categoryId= :catId', {catId: data.categoryId });

        if(data.keyword && data.keyword.length > 0){
            builder.andWhere('(article.name LIKE :kw OR article.excerpt LIKE :kw OR article.description LIKE :kw)' ,{kw: '%'+ data.keyword.trim() + '%'});
        }

        if(data.priceMin &&  typeof data.priceMin === 'number'){
            //builder.andWhere('ap.price >= :min', {min:data.priceMin});
        }
        if(data.priceMax && typeof data.priceMax === 'number'){
            //builder.andWhere('ap.price <= :max', {max:data.priceMax});
        }

        let orderBy = 'article.name';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';

        if(data.orderBy ) {
            orderBy = data.orderBy;
            if(orderBy === 'price'){
                orderBy = 'ap.price';
            }
            if(orderBy === 'name'){
                orderBy = 'article.name';
            }
        }

        if(data.orderDirection ) {
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection)

        let page = 0 ;
        let perPage: 5 | 10 | 25 | 50 = 25;
        if(data.page && typeof data.page === 'number'){
            page = data.page - 1;
        }

        if(data.itemsPerPage && typeof data.itemsPerPage ==='number'){
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);


        let articleIds = await (await builder.getMany()).map(article => article.articleId);

        if (articleIds.length === 0) {
            return new ApiResponse("ok", 0, "No articles found for these search parameters.");
        }

        return await this.article.find({
            where: { articleId: In(articleIds) },
            relations: [
                "category",
                "articleFeatures",
                "features",
                "articlePrices",
                "photos"
            ]
        });
    }
}
