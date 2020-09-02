import * as Validator from 'class-validator';
export class AddCategoryDto {

    categoryId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 32)

    name: string;


}