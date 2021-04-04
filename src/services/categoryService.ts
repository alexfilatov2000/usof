import { createCategorySchema, updateCategorySchema } from '../lib/joi/joiShemaCategory';
import { Category } from '../entity/category';
import { CustomError } from '../lib/hadleErrors/handleErrror';
import {
    findCategoryModel,
    createCategoryModel,
    findOneCategoryModel,
    findAllPostsModel,
    updateCategoryModel,
    deleteCategoryModel,
} from '../models/categoryModels';

export const getAllCategoryService = async (): Promise<Category[]> => {
    const categories = await findCategoryModel();
    if (!categories.length) throw new CustomError('No category found', 204);
    return categories;
};

export const getOneCategoryService = async (id: number): Promise<Category> => {
    const category = await findOneCategoryModel(id);
    if (!category) throw new CustomError('No category found', 204);
    return category;
};

export const getAllPostsService = async (category_id: number): Promise<Category[]> => {
    const posts = await findAllPostsModel(category_id);
    if (!posts.length) throw new CustomError('No post found', 204);
    return posts;
};

export const createCategoryService = async (bodyData: Category): Promise<void> => {
    const { error } = createCategorySchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);

    await createCategoryModel(bodyData);
};

export const updateCategoryService = async (bodyData: Category, id: number): Promise<void> => {
    const { error } = updateCategorySchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);

    const category = await findOneCategoryModel(id);
    if (!category) throw new CustomError('Wrong id', 400);

    if (!bodyData.title) bodyData.title = category.title;
    if (!bodyData.description) bodyData.description = category.description;

    await updateCategoryModel(bodyData, id);
};

export const deleteCategoryService = async (id: number): Promise<void> => {
    const category = await findOneCategoryModel(id);
    if (!category) throw new CustomError('No category found', 204);

    await deleteCategoryModel(id);
};
