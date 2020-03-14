import {Request, Response} from "express";
import Adventure from "../models/adventure";
import Tag from "../models/tag";
import PageData from "./page-data";
import {Op} from "sequelize";

export function list(req: Request, res: Response): void {
    const {meta, staticBasePath, title} = req.locals;

    Adventure.findAll({
        where: {
            startScene: {
                [Op.not]: null
            }
        },
        include: [
            {
                model: Tag,
                attributes: ['name', 'engName']
            }
        ],
    })
        .then(result => {
            const data: PageData = {
                meta,
                staticBasePath,
                title,
                quests: result
            };

            res.render('index', data);
        });
}

export function listByTag(req: Request, res: Response): void {
    const {meta, staticBasePath, title} = req.locals;

    const tag = req.params.tag;

    Adventure.findAll({
        include: [
            {
                model: Tag,
                attributes: ['name', 'engName']
            }
        ],
        where: {
            startScene: {
                [Op.ne]: null
            }
        },
    })
        .then(result => {
            let ruTag: string;

            Tag.findOne({
                attributes: ['name'],
                where: {
                    engName: tag
                }
            })
                .then(tag => ruTag = tag?.name || '')
                .then(() => {
                    const filtered = result
                        .filter(quest => quest.tags
                            .some(tagElem => tagElem.engName === tag));

                    const data: PageData = {
                        meta,
                        staticBasePath,
                        title,
                        tag: ruTag,
                        quests: filtered
                    };

                    res.render('tag', data);
                });
        })
}
