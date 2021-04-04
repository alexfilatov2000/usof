import { getManager, Repository } from 'typeorm';
import { Category } from '../entity/category';

export const findCategoryModel = async (): Promise<Category[]> => {
    const categories: Repository<Category> = getManager().getRepository(Category);
    return categories.find();
};

export const findOneCategoryModel = async (id: number): Promise<Category> => {
    const categories: Repository<Category> = getManager().getRepository(Category);
    return categories.findOne(id);
};

export const findAllPostsModel = async (id: number): Promise<Category[]> => {
    const category: Repository<Category> = getManager().getRepository(Category);
    return category.find({ where: { id }, relations: ['posts'] });
};

export const createCategoryModel = async (data: Category): Promise<void> => {
    const categories: Repository<Category> = getManager().getRepository(Category);
    const category: Category = new Category();
    category.title = data.title;
    category.description = data.description;

    await categories.save(category);
};

export const updateCategoryModel = async (data: Category, id: number): Promise<void> => {
    const category: Repository<Category> = getManager().getRepository(Category);
    await category.update(id, {
        title: data.title,
        description: data.description,
    });
};

export const deleteCategoryModel = async (id: number): Promise<void> => {
    const category: Repository<Category> = getManager().getRepository(Category);
    await category.delete(id);
};
