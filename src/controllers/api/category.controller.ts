import { Controller, Post, Body, Param, Put, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "entities/category.entyty";
import { CategoryService } from "src/services/category/category.service";
import { AddCategoryDto } from "src/dtos/category/add.category.dto";
import { EditCategoryDto } from "src/dtos/category/edit.category.dto";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/category')
@Crud({
    model: {
        type:Category
    },
    params: {
        id: {
            field: 'categoryId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            articles: {
                eager: true
            }

        }
    }
})

export class CategoryController{
constructor(
public service: CategoryService){}

@Post('createCategory')
createFullArticle(@Body()data: AddCategoryDto){
return this.service.createCategory(data);
}

@Post(':id')
edit(@Param('id') categoryId: number, @Body() data: EditCategoryDto):Promise<EditCategoryDto | ApiResponse>{

        return this.service.editCategory(categoryId, data);


}



}