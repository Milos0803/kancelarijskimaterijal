import { Controller, Post, Body, Param, Put, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entyty";
import { CategoryService } from "src/services/category/category.service";
import { AddCategoryDto } from "src/dtos/category/add.category.dto";
import { EditCategoryDto } from "src/dtos/category/edit.category.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

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
    },
    routes: {
      only: [
          "createOneBase",
          "createManyBase",
          "getManyBase",
          "getOneBase",
          "updateOneBase",
      ],
      createOneBase: {
        decorators: [
            UseGuards(RoleCheckerGuard),
            AllowToRoles('administrator'),
        ],

      },
      createManyBase: {
        decorators: [
            UseGuards(RoleCheckerGuard),
            AllowToRoles('administrator'),
        ],

      },
      getManyBase: {
        decorators:[
        UseGuards(RoleCheckerGuard),
        AllowToRoles('administrator', 'user'),
      ],

      },
      getOneBase: {
        decorators:[
            UseGuards(RoleCheckerGuard),
            AllowToRoles('administrator', 'user'),
          ],
      },
      updateOneBase:{
        decorators: [
            UseGuards(RoleCheckerGuard),
            AllowToRoles('administrator'),
        ],
      },

     

    },
})

export class CategoryController{
constructor(
public service: CategoryService){}

@Post('createCategory')
createFullCategory(@Body()data: AddCategoryDto){
return this.service.createCategory(data);
}

@Post(':id')
@UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator' )
edit(@Param('id') categoryId: number, @Body() data: EditCategoryDto):Promise<EditCategoryDto | ApiResponse>{

        return this.service.editCategory(categoryId, data);


}



}