import Tag from 'storage/tag/model';

export async function getTagByEngName(engName: string): Promise<Tag | null> {
    return await Tag.findOne({
        attributes: ['name'],
        where: {
            engName
        }
    });
}
