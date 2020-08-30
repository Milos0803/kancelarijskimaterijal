import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Category } from "entities/category.entyty";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddCategoryDto } from "src/dtos/category/add.category.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditCategoryDto } from "src/dtos/category/edit.category.dto";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category>{
    constructor(

        @InjectRepository(Category)
        private readonly category: Repository<Category>) {
        super(category);
    }


    async createCategory(data: AddCategoryDto): Promise<Category | ApiResponse> {

        let newCategory: Category = new Category();
        newCategory.name = data.name;



        let savedCategory = await this.category.save(newCategory);
        return await this.category.findOne(newCategory);

    }

    async editCategory(Categoryid: number, data: EditCategoryDto): Promise<Category | ApiResponse> {
        let category: Category = await this.category.findOne(Categoryid);
        const categoryName = category.name;
        const newCategoryName = data.name;
        category.name = newCategoryName;
        return this.category.save(category);

    }


}